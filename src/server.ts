import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import fileUpload from "express-fileupload";

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(fileUpload());

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello Lions sigthfirst" });
});

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    messagem: "Internal server error.",
  });
});

export { app };
