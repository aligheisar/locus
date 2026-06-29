const timeAgo = (date: Date) => {
  const diff = date.getTime() - Date.now();

  const units = [
    ["year", 1000 * 60 * 60 * 24 * 365],
    ["month", 1000 * 60 * 60 * 24 * 30],
    ["week", 1000 * 60 * 60 * 24 * 7],
    ["day", 1000 * 60 * 60 * 24],
    ["hour", 1000 * 60 * 60],
    ["minute", 1000 * 60],
    ["second", 1000],
  ] as const;

  const rtf = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });

  for (const [unit, ms] of units) {
    const value = Math.round(diff / ms);

    if (Math.abs(value) >= 1) {
      return rtf.format(value, unit);
    }
  }

  return "just now";
};

export { timeAgo };
