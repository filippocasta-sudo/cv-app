import { promises as fs } from "node:fs";
import path from "node:path";
import type { CvData } from "@/lib/types";

export type StorageKind = "blob" | "file";

export interface StorageInfo {
  kind: StorageKind;
  label: string;
  writable: boolean;
  /** Explains what the operator must do when writes cannot persist. */
  hint?: string;
}

interface StorageDriver extends StorageInfo {
  read(): Promise<unknown | null>;
  write(data: CvData): Promise<void>;
}

const BLOB_PATHNAME = "cv/content.json";

/**
 * Vercel Blob driver. Reads pass `useCache: false` so a save from the admin
 * panel is visible on the next render: overwriting a pathname otherwise serves
 * the CDN copy for up to a minute.
 */
function blobDriver(): StorageDriver {
  return {
    kind: "blob",
    label: "Vercel Blob",
    writable: true,
    async read() {
      const { get, BlobNotFoundError } = await import("@vercel/blob");
      try {
        const result = await get(BLOB_PATHNAME, { access: "private", useCache: false });
        if (!result || result.statusCode !== 200) return null;
        return JSON.parse(await new Response(result.stream).text()) as unknown;
      } catch (error) {
        if (error instanceof BlobNotFoundError) return null;
        throw error;
      }
    },
    async write(data) {
      const { put } = await import("@vercel/blob");
      await put(BLOB_PATHNAME, `${JSON.stringify(data, null, 2)}\n`, {
        access: "private",
        contentType: "application/json",
        addRandomSuffix: false,
        allowOverwrite: true,
        cacheControlMaxAge: 60,
      });
    },
  };
}

function fileDriver(): StorageDriver {
  const dataFile =
    process.env.CV_DATA_FILE ?? path.join(process.cwd(), "data", "cv-content.json");
  // Vercel functions only expose a writable /tmp, which is per-instance and
  // ephemeral, so file storage there cannot back the admin panel.
  const readOnlyHost = process.env.VERCEL === "1";

  return {
    kind: "file",
    label: `File JSON (${dataFile})`,
    writable: !readOnlyHost,
    hint: readOnlyHost
      ? "Su Vercel il filesystem è in sola lettura: collega un Blob store al progetto per abilitare il salvataggio."
      : undefined,
    async read() {
      try {
        // The path is runtime state, not a bundled asset: opting out keeps the
        // build tracer from pulling the whole project into the server output.
        const raw = await fs.readFile(/* turbopackIgnore: true */ dataFile, "utf8");
        return JSON.parse(raw) as unknown;
      } catch {
        return null;
      }
    },
    async write(data) {
      await fs.mkdir(/* turbopackIgnore: true */ path.dirname(dataFile), { recursive: true });
      await fs.writeFile(
        /* turbopackIgnore: true */ dataFile,
        `${JSON.stringify(data, null, 2)}\n`,
        "utf8",
      );
    },
  };
}

/**
 * A Blob store connected to the project injects `BLOB_READ_WRITE_TOKEN`, so the
 * driver follows the deployment without any extra configuration.
 */
export function getStorage(): StorageDriver {
  return process.env.BLOB_READ_WRITE_TOKEN ? blobDriver() : fileDriver();
}

export function describeStorage(): StorageInfo {
  const { kind, label, writable, hint } = getStorage();
  return { kind, label, writable, hint };
}
