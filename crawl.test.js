const { describe, test, expect } = require("@jest/globals");
const { normalizeURL } = require("./crawl");

describe("normalizeURL", () => {
  test("https ok", () => {
    expect(normalizeURL("https://boot.dev/path")).toBe("boot.dev/path");
  });

  test("http ok", () => {
    expect(normalizeURL("https://boot.dev/path")).toBe("boot.dev/path");
  });

  test("https ending slash ok", () => {
    expect(normalizeURL("https://boot.dev/path/")).toBe("boot.dev/path");
  });

  test("http ending slash ok", () => {
    expect(normalizeURL("http://boot.dev/path/")).toBe("boot.dev/path");
  });

  test("query params are persisted", () => {
    expect(normalizeURL("http://boot.dev/path/?limit=10&filter=name")).toBe(
      "boot.dev/path?limit=10&filter=name"
    );
  });

  test("invalid url throws error", () => {
    expect(() => normalizeURL("")).toThrow();
  });
});
