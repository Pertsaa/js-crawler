function normalizeURL(url) {
  const urlObj = new URL(url);
  if (urlObj.pathname.at(-1) === "/") {
    urlObj.pathname = urlObj.pathname.slice(0, -1);
  }
  const normalized = `${urlObj.hostname}${urlObj.pathname}${urlObj.search}`;
  return normalized;
}

module.exports = {
  normalizeURL,
};
