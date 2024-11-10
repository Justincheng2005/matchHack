import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import classRouter from "./routes/classes.js";
import availabilityRouter from "./routes/availability.js";
import studentRouter from "./routes/students.js";
import studyGroupRouter from "./routes/studyGroups.js";

const app = express();
const port = 8800;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(cookieParser());

app.use("/classes", classRouter);
app.use("/availability", availabilityRouter);
app.use("/students", studentRouter);
app.use("/studyGroups", studyGroupRouter);



app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});