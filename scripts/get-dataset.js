const fs = require("fs");

async function main() {
  const ayatJsonl = fs.readFileSync("../dataset/ayat.jsonl", "utf8");

  const ayat = ayatJsonl
    .split("\n")
    .filter((line) => line)
    .map((line) => JSON.parse(line));

  const batchSize = 10;
  let totalProcessed = 0;

  for (let i = 0; i < ayat.length; i += batchSize) {
    console.log(
      `Progress: ${((totalProcessed / ayat.length) * 100).toFixed(2)}%`
    );
    await Promise.all(
      ayat.slice(i, i + batchSize).map(async (ayat) => {
        if (ayat.ar.length > 500) {
          console.log("entering chunked mode");
          const chunks = ayat.ar.match(/.{1,500}/g);

          const res = await Promise.all(
            chunks.map(async (chunk) => {
              const res = await fetch(
                "https://transliterate.qcri.org/ar2en/nbest/" + chunk
              );
              const data = await res.json();
              return data.results;
            })
          );

          const newResults = [];
          for (let i = 0; i < 10; i++) {
            newResults.push(res.map((results) => results[i]).join(""));
          }

          ayat.transcripts = newResults;
        } else {
          const res = await fetch(
            "https://transliterate.qcri.org/ar2en/nbest/" + ayat.ar
          );
          const data = await res.json();

          ayat.transcripts = Object.values(data.results);
        }
      })
    );
    totalProcessed += batchSize;
  }

  fs.writeFileSync(
    "../dataset/ayat-with-transcripts.jsonl",
    ayat.map((ayat) => JSON.stringify(ayat)).join("\n")
  );
}

main();
