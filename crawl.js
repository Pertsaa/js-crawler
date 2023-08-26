const { JSDOM } = require("jsdom");

async function crawlPage(baseURL) {
  try {
    const res = await fetch(baseURL);
    if (!res.headers.get("content-type").includes("text/html")) {
      console.error(
        `Error: invalid Content-Type "${res.headers["content-type"]}"`
      );
      process.exit(1);
    }
    const htmlBody = await res.text();
    console.log(htmlBody);
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
}

function normalizeURL(url) {
  const urlObj = new URL(url);
  if (urlObj.pathname.at(-1) === "/") {
    urlObj.pathname = urlObj.pathname.slice(0, -1);
  }
  const normalized = `${urlObj.hostname}${urlObj.pathname}${urlObj.search}`;
  return normalized;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const dom = new JSDOM(htmlBody);
  const anchors = dom.window.document.querySelectorAll("a");
  const hrefs = [];
  for (const a of anchors) {
    if (a.href[0] === "/") {
      hrefs.push(`${baseURL}${a.href}`);
    } else {
      hrefs.push(a.href);
    }
  }
  return hrefs;
}

module.exports = {
  crawlPage,
  normalizeURL,
  getURLsFromHTML,
};
