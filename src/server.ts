import express from "express";
import connectDB from "./config/db";
import taskRoutes from "./routes/task.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());

connectDB();

app.use("/api", taskRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Task Manager API running");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});