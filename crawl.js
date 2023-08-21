const { JSDOM } = require("jsdom");

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
    console.log(a.href, a.href[0] === "/");
    if (a.href[0] === "/") {
      hrefs.push(`${baseURL}${a.href}`);
    } else {
      hrefs.push(a.href);
    }
  }
  return hrefs;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
};
