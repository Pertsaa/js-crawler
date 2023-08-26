function printReport(pages) {
  console.log("\nGenerating report...");
  const sorted = sortPages(pages);
  for (const page of sorted) {
    console.log(`Found ${page.count} internal links to ${page.page}`);
  }
  console.log("\n");
}

function sortPages(pages) {
  return Object.keys(pages)
    .sort((k1, k2) => pages[k1] > pages[k2])
    .map((k) => ({ page: k, count: pages[k] }));
}

module.exports = {
  printReport,
};
