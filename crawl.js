const { JSDOM } = require("jsdom");

async function crawlPage(baseURL, currentURL, pages) {
  if (new URL(baseURL).hostname !== new URL(currentURL).hostname) {
    return pages;
  }
  const normalizedURL = normalizeURL(currentURL);
  if (pages[normalizedURL]) {
    pages[normalizedURL]++;
    return pages;
  } else if (normalizedURL !== baseURL) {
    pages[normalizedURL] = 1;
  } else {
    pages[normalizedURL] = 0;
  }
  try {
    console.log(`Crawling: ${currentURL}`);
    const res = await fetch(currentURL);
    if (!res.headers.get("content-type").includes("text/html")) {
      console.error(
        `Error: invalid Content-Type "${res.headers["content-type"]}"`
      );
      return pages;
    }
    const htmlBody = await res.text();
    const urls = getURLsFromHTML(htmlBody, baseURL);
    for (const url of urls) {
      await crawlPage(baseURL, url, pages);
    }
    return pages;
  } catch (error) {
    console.error(`Error: ${error}`);
    return pages;
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
