import express from "express";
import cors from "cors";
import classRouter from "./routes/classes.js";
import availabilityRouter from "./routes/availability.js";
import studentRouter from "./routes/students.js";
import studyGroupRouter from "./routes/studyGroups.js";


const app = express();
const port = 3000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

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