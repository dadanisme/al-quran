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
          ? `${snippet}...`
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
