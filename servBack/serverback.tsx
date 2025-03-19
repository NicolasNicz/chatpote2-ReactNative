import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 7453;

app.use(express.json());
app.use(cors());

app.post("/chatbot", async (req, res) => {
  try {
    const { input, temperature = 0.2, top_p = 0.9 } = req.body;
    const response = await axios.post( //google/gemma-2-2b-it
      "https://api-inference.huggingface.co/models/google/gemma-2-2b-it",
      { 
        inputs: input,
        parameters: { 
          temperature,   // Ajout de temperature
          top_p          // Ajout de top_p
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
      }
    );
    console.log("Réponse API Hugging Face :", response.data);  // Ajoutez ce log pour inspecter la réponse
    res.json(response.data);
  } catch (error) {
    console.error("Erreur API Hugging Face :", error);
    res.status(500).json({ error: "Erreur avec le modèle IA" });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});