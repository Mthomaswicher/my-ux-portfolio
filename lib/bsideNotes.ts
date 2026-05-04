/**
 * B-side notes for cartridges. Long-pressing a cartridge in Easy mode
 * pops a tooltip with the matching string here. Designed as a
 * "developer's commentary" track — the offhand line that didn't make
 * the case study itself. Keep them under ~140 characters so the
 * tooltip doesn't blow past the viewport.
 *
 * Keyed by the project number (matches Project.no in lib/projects.ts).
 */

export const BSIDE_NOTES: Record<string, string> = {
  "01":
    "32 weeks of design reviews and 11 stakeholder demos. Shipped right before parental leave kicked in.",
  "02":
    "Auto-pay setup lifted 37% the moment we killed the 'are you sure?' modal nobody asked for.",
  "03":
    "Themed in Demex's actual brand palette. The token spreadsheet still lives on a desktop somewhere.",
  "04":
    "Hardest part wasn't the wallet flow — it was explaining stablecoins to first-time remittance senders.",
};
