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
  // log("create collection");
  // const schema = {
  //   name: "ayat",
  //   fields: [{ name: ".*", type: "auto" }],
  // };

  // await client.collections().create(schema);

  log("import data from dataset");
  const data = JSON.parse(fs.readFileSync("dataset/suratWithTafsir.json"));

  const ayat = data.reduce((acc, cur) => {
    return acc.concat(
      cur.ayat.map((a) => ({ ...a, nama_surah: cur.nama_latin }))
    );
  }, []);

  log("importing data to typesense");
  const jsonl = ayat
    .map((a) => {
      a.itemId = a.id;
      delete a.id;

      return a;
    })
    .map((a) => JSON.stringify(a))
    .join("\n");
  fs.writeFileSync("dataset/ayat.jsonl", jsonl);
  8;
  await client
    .collections("ayat")
    .documents()
    .import(jsonl, { action: "create", batch_size: 500 });

  log("done");
}

async function destroy() {
  log("delete collection");
  await client.collections("ayat").delete();
}

// getAyat();
// destroy();
initialize();
