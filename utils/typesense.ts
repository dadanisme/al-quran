import { SearchClient } from "typesense";

const client = new SearchClient({
  nodes: [
    {
      host: "uf8sow6h4btkal2rp-1.a1.typesense.net",
      port: 443,
      protocol: "https",
    },
  ],
  apiKey: "3KTKsNnjZZZ6Gl2aByYNkETASKrPerDq",
});

export default client;
