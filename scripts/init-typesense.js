const { Client } = require("typesense");
const fs = require("fs");

const client = new Client({
  nodes: [
    {
      host: "3i804klytcmgrfe5p-1.a1.typesense.net",
      port: "443",
      protocol: "https",
    },
  ],
  apiKey: "jIg2SwNd8EOE6oxx2LtAr5FfQIYY5qnO",
});

const log = console.log;

async function initialize() {
  log("create collection");
  const schema = {
    name: "ayat",
    fields: [{ name: ".*", type: "auto" }],
  };

  await client.collections().create(schema);
}

async function importAyat() {
  const ayatJsonl = fs.readFileSync(
    "../dataset/ayat-without-diacritics.jsonl",
    "utf8"
  );

  await client
    .collections("ayat")
    .documents()
    .import(ayatJsonl, { action: "create", batch_size: 500 });

  log("done");
}

async function destroy() {
  log("delete collection");
  await client.collections("ayat").delete();
}

// getAyat();
// destroy();
// initialize();
importAyat();
