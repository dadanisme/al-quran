import { SearchResponseHit } from "typesense/lib/Typesense/Documents";

export const generateHTML = (
  item: SearchResponseHit<TypesenseAyat>,
  prop: keyof TypesenseAyat
) => {
  return {
    html: `<p>${item.highlight[prop]?.snippet ?? item.document[prop]}</p>`,
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
