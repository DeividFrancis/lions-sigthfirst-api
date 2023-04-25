import dotenv from "dotenv";
import { app } from "./src/server";

dotenv.config();

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Server is runing at ${PORT}`);
});
