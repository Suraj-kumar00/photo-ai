import express from "express";
import {
  TrainModel,
  GenerateImage,
  GenerateImagesFromPack,
} from "../../packages/common/types.js";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Initialize express app
const app = express();
app.use(express.json());

// Set port
const PORT = process.env.PORT || 8000;

// Check database connection
function checkDatabaseConnection() {
  try {
    prisma.$connect();
    console.log("✅ PostgreSQL connected via supabase");
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
}

// Routes for AI training, generation, and pack generation
app.post("/ai/training", async (req, res) => {
  const parsedBody = TrainModel.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({ errorMessage: parsedBody.error.message });
    return;
  }

  const data = await prisma.model.create({
    data: {
      name: parsedBody.data.name,
      type: parsedBody.data.type,
      age: parsedBody.data.age,
      ethinicity: parsedBody.data.ethinicity,
      eyeColor: parsedBody.data.eyeColor,
      bald: parsedBody.data.bald,
      zipUrl: parsedBody.data.zipUrl,
      userId: "asdf",
      falAiRequestId: "asdf",
    },
  });
  res.json({
    message: "Model trained successfully",
    modelId: data.id,
  });
});

app.post("/ai/generate", (req, res) => {
  
});

app.post("/pack/generate", (req, res) => {});

app.get("/pack/bulk", (req, res) => {});

app.get("/image", (req, res) => {});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  checkDatabaseConnection();
});
