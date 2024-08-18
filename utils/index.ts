import { SearchResponseHit } from "typesense/lib/Typesense/Documents";

export const generateHTML = (
  item: SearchResponseHit<TypesenseAyat>,
  prop: keyof TypesenseAyat,
  slice?: boolean
) => {
  const snippet = item.highlight[prop]?.snippet;
  const document = item.document[prop];

  const pureStringSnippet = snippet
    ?.replace(/<mark>/g, "")
    .replace(/<\/mark>/g, "");
  const pureStringDocument = String(document)
    .replace(/<mark>/g, "")
    .replace(/<\/mark>/g, "");

  return {
    html: `<p>${
      snippet
        ? pureStringSnippet?.length !== pureStringDocument.length
          ? `...${snippet}...`
          : snippet
        : slice
        ? String(document).length > 100
          ? `${String(document).slice(0, 100)}...`
          : document
        : document
    }</p>`,
  };
};

export const generateHTMLMatch = (
  item: SearchResponseHit<TypesenseAyat>,
  prop: keyof TypesenseAyat
) => {
  return {
    html: `<p>...<mark>${item.highlight[prop]?.matched_tokens?.join(
      "</mark>...<mark>"
    )}</mark>...</p>`,
  };
};

export const sliceText = (text: string, length?: number) => {
  if (!length) return text.length > 30 ? `${text.slice(0, 30)}...` : text;
  return text.length > length ? `${text.slice(0, length)}...` : text;
};

export const convertProgress = (progress: string) => {
  const converter = {
    Queued: "Menunggu Antrian",
    Started: "Memulai",
    "Transcription Started": "Sedang Diproses",
    "Transcription Completed": "Selesai Diproses",
    Completed: "Selesai",
    Failed: "Gagal",
  };

  return converter[progress as keyof typeof converter] ?? progress;
};

export const removeDiactritics = (text: string) => {
  return text.normalize("NFD").replace(/\p{Diacritic}/gu, "");
};
