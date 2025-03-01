import express from "express";
import * as dotevnv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import { userRouter } from "./users/users.routes";

dotevnv.config();

if (!process.env.PORT) {
  console.log(`No port value specified...`);
}
const PORT = parseInt(process.env.PORT as string, 10);

const app = express();

// Use Middlewares
app.use(express.json()); // Middleware for parsing JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.use("/", userRouter);

// START APP
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
