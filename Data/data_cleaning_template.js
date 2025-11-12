const fs = require("fs-extra");
const csv = require ("csvtojson");
const { Parser } = require ("json2csv");
const dayjs = require ("dayjs");


// --- Step 1: Read raw CSV ---
const rawPath = ;


async function  {
  console.log("Reading raw CSV...");
  let data = await csv().fromFile(rawPath);


  console.log("Preview of raw data:");
  console.table(data.slice(0, 3));


  // --- Step 2: Clean and standardize ---
  data = data.map((row) => {
    // Normalize keys
    return {
      : row.CustomerID?.trim(),
      : row.product?.trim().toLowerCase(),
      : cleanPrice(row.Price),
      : cleanDate(row.Date),
      : row.City?.trim(),
    };
  });


  // --- Step 3: Export cleaned data ---
  await exportCleanData();


  // --- Step 4: Log changes ---
 await fs(
  "./cleaning_log.txt",
  `Cleaned ${data.length} records on ${new Date()}\n`
);
}


function cleanPrice(price) {
  if (!price || price.toLowerCase() === "n/a") return null;
  return Number(price);
}


function cleanDate(date) {
  const parsed = dayjs(date);
  return parsed.isValid() ? parsed.format("YYYY-MM-DD") : null;
}


async function exportCleanData(data) {
  // Export JSON
  await fs.writeJson(, data, { spaces: 2 });


  // Export CSV
  const parser = new Parser();
  const csvData = parser.parse(data);
  await fs.writeFile(, csvData);
}


cleanData();