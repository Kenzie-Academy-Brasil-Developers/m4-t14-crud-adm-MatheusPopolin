import express, { Application } from "express";
import "express-async-errors";
import { errorHandler } from "./errors";
import { usersRoutes } from "./routes/users.routes";
import { loginRoutes } from "./routes/login.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRoutes);

app.use(errorHandler);

export default app;
