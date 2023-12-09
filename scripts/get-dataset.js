const fs = require("fs");

function normalizeText(text) {
  //remove special characters
  text = text.replace(
    /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g,
    ""
  );

  //normalize Arabic
  text = text.replace(/(آ|إ|أ)/g, "ا");
  text = text.replace(/(ة)/g, "ه");
  text = text.replace(/(ئ|ؤ)/g, "ء");
  text = text.replace(/(ى)/g, "ي");

  //convert arabic numerals to english counterparts.
  var starter = 0x660;
  for (var i = 0; i < 10; i++) {
    text.replace(String.fromCharCode(starter + i), String.fromCharCode(48 + i));
  }

  return text;
}

async function initTranscripts() {
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
                "https://transliterate.qcri.org/ar2en/nbest/" +
                  normalizeText(chunk)
              );
              const data = await res.json();
              return Object.values(data.results);
            })
          );

          const newResults = [];
          for (let i = 0; i < 10; i++) {
            newResults.push(res.map((results) => results[i]).join(""));
          }

          ayat.transcripts = newResults;
        } else {
          const res = await fetch(
            "https://transliterate.qcri.org/ar2en/nbest/" +
              normalizeText(ayat.ar)
          );
          const data = await res.json();

          ayat.transcripts = Object.values(data.results);
        }
      })
    );
    totalProcessed += batchSize;
  }

  fs.writeFileSync(
    "../dataset/ayat-with-transcripts.json",
    JSON.stringify(ayat, null, 2)
  );
  fs.writeFileSync(
    "../dataset/ayat-with-transcripts.jsonl",
    ayat.map((ayat) => JSON.stringify(ayat)).join("\n")
  );
}

async function initWithoutDiacritics() {
  const ayatJsonl = fs.readFileSync("../dataset/ayat.jsonl", "utf8");

  const ayat = ayatJsonl
    .split("\n")
    .filter((line) => line)
    .map((line) => JSON.parse(line));

  ayat.forEach((a) => {
    const ar = a.ar;

    const arWithoutDiacritics = normalizeText(ar);
    a.arWithoutDiacritics = arWithoutDiacritics;
  });

  fs.writeFileSync(
    "../dataset/ayat-without-diacritics.json",
    JSON.stringify(ayat, null, 2)
  );

  fs.writeFileSync(
    "../dataset/ayat-without-diacritics.jsonl",
    ayat.map((ayat) => JSON.stringify(ayat)).join("\n")
  );
}

// initTranscripts();
initWithoutDiacritics();
