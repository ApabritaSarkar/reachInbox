import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { startImapConnections } from "./services/imapService";
import { initElasticIndex } from "./services/elasticService";
import emailRoutes from "./routes/emailRoutes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/emails", emailRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await initElasticIndex();
  startImapConnections();
});
