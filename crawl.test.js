const { describe, test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl");

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

describe("getURLsFromHTML", () => {
  test("absolute urls ok", () => {
    const html = `
        <!DOCTYPE html>
        <a href="https://buggyduck.dev">Home</a>
        <a href="https://buggyduck.dev/about">about</a>
    `;
    const urls = getURLsFromHTML(html, "buggyduck.dev");
    expect(urls.length).toBe(2);
    expect(urls[0]).toBe("https://buggyduck.dev/");
    expect(urls[1]).toBe("https://buggyduck.dev/about");
  });

  test("relative urls ok", () => {
    const html = `
        <!DOCTYPE html>
        <a href="/">Home</a>
        <a href="/about">about</a>
    `;
    const urls = getURLsFromHTML(html, "buggyduck.dev");
    expect(urls.length).toBe(2);
    expect(urls[0]).toBe("https://buggyduck.dev/");
    expect(urls[1]).toBe("https://buggyduck.dev/about");
  });

  test("returns all urls", () => {
    const html = `
        <!DOCTYPE html>
        <body>
            <main>
            <nav>
                <!-- ABSOLUTE URLS -->
                <ul>
                    <li><a href="https://buggyduck.dev">Home</a></li>
                    <li><a href="https://buggyduck.dev/about">About</a></li>
                </ul>
                <!-- RELATIVE URLS -->
                <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
                </ul>
            </nav>
            </main>
        </body>
        </html>
    `;

    const output = [
      "https://buggyduck.dev/",
      "https://buggyduck.dev/about",
      "https://buggyduck.dev/",
      "https://buggyduck.dev/about",
    ];
    const urls = getURLsFromHTML(html, "buggyduck.dev");
    expect(urls.length).toBe(4);
    for (let i = 0; i < output.length; i++) {
      expect(output[i]).toBe(urls[i]);
    }
  });
});
