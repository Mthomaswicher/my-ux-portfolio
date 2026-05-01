"use client";

import { useEffect, useState } from "react";

export default function LiveClock({ tz = "UTC" }: { tz?: string }) {
  const [time, setTime] = useState<string>("--:--:--");

  useEffect(() => {
    function tick() {
      const now = new Date();
      const fmt = new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: tz === "UTC" ? "UTC" : undefined,
      });
      setTime(fmt.format(now));
    }
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [tz]);

  return (
    <span className="font-mono tabular-nums" aria-live="off">
      <span aria-label={`Current time, ${time} ${tz}`}>
        {time} <span className="text-ink-mute" aria-hidden="true">{tz}</span>
      </span>
    </span>
  );
}
