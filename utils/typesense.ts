import { SearchClient } from "typesense";

const client = new SearchClient({
  nodes: [
    {
      host: "i1j8o2sgkp3mw49cp-1.a1.typesense.net",
      port: 443,
      protocol: "https",
    },
  ],
  apiKey: "WbxcZcGvZbMkmdRoR2YCSfCz5QDdgSjM",
});

export default client;
