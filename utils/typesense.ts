import { SearchClient } from "typesense";

const client = new SearchClient({
  nodes: [
    {
      host: "l4kbshr1jayo6tg7p-1.a1.typesense.net",
      port: 443,
      protocol: "https",
    },
  ],
  apiKey: "ezVUWYla2m137GP0Pvw7rsp85zz0lxDV",
});

export default client;
