const { crawlPage } = require("./crawl");

function main() {
  if (process.argv.length < 3) {
    console.error("Error: missing arg BASE_URL");
    console.error("Usage: npm run start <BASE_URL>");
    process.exit(1);
  } else if (process.argv.length > 3) {
    console.log("Error: too many args");
    console.error("Usage: npm run start <BASE_URL>");
    process.exit(1);
  }
  const baseURL = process.argv[2];
  console.log(`Crawling: ${baseURL}`);
  crawlPage(baseURL);
}

main();
