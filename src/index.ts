import express from "express";
import type { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";

const app: Express = express();
const PORT = 8080;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());

app.get("/todos", async (req: Request, res: Response) => {
  const todos = await prisma.todo.findMany();

  return res.json(todos);
});

app.post("/todos", async (req: Request, res: Response) => {
  try {
    const { title, isCompleted } = req.body;
    const todo = await prisma.todo.create({
      data: {
        title,
        isCompleted,
      },
    });
    return res.json(todo);
  } catch (e) {
    return res.status(400).json;
  }
});

app.put("/todos/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, isCompleted } = req.body;
    const todo = await prisma.todo.update({
      where: { id },
      data: {
        title,
        isCompleted,
      },
    });
    return res.json(todo);
  } catch (e) {
    return res.status(400).json;
  }
});

app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const todo = await prisma.todo.delete({
      where: { id },
    });
    return res.json(todo);
  } catch (e) {
    return res.status(400).json;
  }
});

app.listen(PORT, () => console.log("server is running"));
