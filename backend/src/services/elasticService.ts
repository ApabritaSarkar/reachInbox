import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({ node: process.env.ELASTIC_URL! });
const INDEX = "emails";

export const getAllEmails = async () => {
  const result = await client.search({
    index: INDEX,
    query: { match_all: {} },
    size: 100, // fetch last 100 emails
    sort: [{ date: { order: "desc" } }]
  });
  return result.hits.hits.map((hit: any) => hit._source);
};

export const initElasticIndex = async () => {
  const exists = await client.indices.exists({ index: INDEX });
  if (!exists) {
    await client.indices.create({
      index: INDEX,
      mappings: {
        properties: {
          subject: { type: "text" },
          from: { type: "keyword" },
          to: { type: "keyword" },
          date: { type: "date" },
          text: { type: "text" },
          folder: { type: "keyword" },
          account: { type: "keyword" },
          category: { type: "keyword" },
        }
      }
    });
    console.log("✅ Elasticsearch index created");
  }
};


export const saveEmail = async (email: any) => {
  await client.index({
    index: INDEX,
    document: email,
  });
  await client.indices.refresh({ index: INDEX });
};

export const searchEmails = async (query: string) => {
  const result = await client.search({
    index: INDEX,
    query: {
      multi_match: {
        query,
        fields: ["subject", "text"],
      }
    }
  });
  return result.hits.hits.map((hit: any) => hit._source);
};
