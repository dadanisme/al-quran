const { Client } = require("typesense");
const fs = require("fs");

const client = new Client({
  nodes: [
    {
      host: "dguhimexws2lfy3qp-1.a1.typesense.net",
      port: "443",
      protocol: "https",
    },
  ],
  apiKey: "ebHSd9m9wkGdBa5wLVokPhpcHaQdnyhC",
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
