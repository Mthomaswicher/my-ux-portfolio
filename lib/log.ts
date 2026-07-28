export type LogEntry = {
  date: string;
  body: string;
  /**
   * Reading Room wording. Set this on any entry whose `body` leans on the
   * arcade conceit, the sidebar surfaces the latest entry on every page,
   * so arcade copy here leaks into basic mode sitewide.
   */
  basicBody?: string;
};

export const log: LogEntry[] = [
  {
    date: "2026-04-30",
    body: "Booted MTW.ARCADE v0.1. Pixel game-cabinet portfolio is live in dev. Sign the guestbook on your way out.",
    basicBody: "Rebuilt this site. Sign the guestbook on your way out.",
  },
  {
    date: "2026-03-15",
    body: "Finished a research sprint on GitHub Copilot Agent Mode. The synthesis went straight to leadership.",
  },
  {
    date: "2026-02-04",
    body: "DevNav Hub adoption hit 75%, up from 25%. The migration loop is finally closed.",
  },
];
