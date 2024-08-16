import { SearchClient } from "typesense";

const client = new SearchClient({
  nodes: [
    {
      host: "dguhimexws2lfy3qp-1.a1.typesense.net",
      port: 443,
      protocol: "https",
    },
  ],
  apiKey: "6CkArWgvfO9voY7QrgWlLxrJbkghmgo4",
});

export default client;
