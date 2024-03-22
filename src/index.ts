import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import cors from 'cors'

import "./database";

import bot from "./config";

import Routines from "./services/index"
import { webhookCallback } from "grammy";

if (process.env.NODE_ENV === "production") {
  const app = express();

  app.use(cors())
  app.use(express.json());
  app.use(webhookCallback(bot, "express"));
  
  app.get("/", (req, res) => {
    res.json({
      status: "ok",
      message: "Bot iniciado"
    });
  })

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    Routines()
    console.log(`Bot iniciado na porta ${PORT}`);
  });

} else {
  bot.start({ onStart: () => {
    Routines()
    console.log("Bot iniciado")
  }})
}
