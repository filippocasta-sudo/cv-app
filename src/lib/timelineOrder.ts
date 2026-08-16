import type { TimelineEntry } from "@/lib/types";

/** Newest-first order (matches the public timeline). */
export function sortTimelineEntries(entries: TimelineEntry[]): TimelineEntry[] {
  return [...entries].sort((a, b) => b.sortKey - a.sortKey);
}

/** Reassign sortKey values after a visual reorder (top = newest). */
export function applyTimelineVisualOrder(reordered: TimelineEntry[]): TimelineEntry[] {
  if (reordered.length === 0) return reordered;

  const descendingKeys = [...reordered.map((entry) => entry.sortKey)].sort((a, b) => b - a);
  return reordered.map((entry, index) => ({
    ...entry,
    sortKey: descendingKeys[index] ?? reordered.length - index,
  }));
}

/** sortKey for a new entry placed at the top of the timeline. */
export function nextTimelineSortKey(entries: TimelineEntry[]): number {
  if (entries.length === 0) return Number(`${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, "0")}`);
  return Math.max(...entries.map((entry) => entry.sortKey)) + 1;
}
