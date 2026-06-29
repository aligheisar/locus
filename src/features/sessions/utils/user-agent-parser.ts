import { type IResult, UAParser } from "ua-parser-js";

type Category = "desktop" | "mobile" | "tablet" | "bot" | "unknown";

type ParsedClient = {
  name: string;
  browser?: string;
  os?: string;
  device?: string;
  architecture?: string;
};

const getDeviceCategory = (userAgent: string | null) => {
  if (!userAgent) return "Unknown Device";

  const result = UAParser(userAgent);

  const browser = result.browser.name;

  const category =
    result.device.type === "mobile"
      ? "mobile"
      : result.device.type === "tablet"
        ? "tablet"
        : browser === "Googlebot"
          ? "bot"
          : browser
            ? "desktop"
            : "unknown";

  return category;
};

const parseClient = (result: IResult): ParsedClient => {
  const browser = result.browser.name;
  const browserVersion = result.browser.version;

  const os = [result.os.name, result.os.version].filter(Boolean).join(" ");

  const device = [result.device.vendor, result.device.model]
    .filter(Boolean)
    .join(" ");

  const architecture = result.cpu.architecture;

  const name = device
    ? device
    : browser
      ? [browser, browserVersion].filter(Boolean).join(" ")
      : os || "Unknown Device";

  return {
    name,
    browser: browser
      ? [browser, browserVersion].filter(Boolean).join(" ")
      : undefined,
    device: device || undefined,
    os: os || undefined,
    architecture,
  };
};

const getDeviceLabel = (userAgent: string | null): string => {
  if (!userAgent) return "Unknown Device";

  const result = UAParser(userAgent);

  const device = [result.device.vendor, result.device.model]
    .filter(Boolean)
    .join(" ");

  const browser = [result.browser.name].filter(Boolean).join(" ");

  const os = [result.os.name, result.os.version].filter(Boolean).join(" ");

  if (device) {
    if (browser) {
      return `${device} • ${browser}`;
    }

    return device;
  }

  if (browser && os) {
    return `${browser} on ${os}`;
  }

  if (browser) {
    return browser;
  }

  if (os) {
    return os;
  }

  return "Unknown Device";
};

export { type Category, getDeviceCategory, getDeviceLabel, parseClient };
