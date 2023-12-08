import { SearchClient } from "typesense";

const client = new SearchClient({
  nodes: [
    {
      host: "3i804klytcmgrfe5p-1.a1.typesense.net",
      port: 443,
      protocol: "https",
    },
  ],
  apiKey: "9GuNO6Gj0cxd5XZVMqWx4bSJm1PRWZiw",
});

export default client;
