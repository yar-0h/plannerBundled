const express = require("express");
const cors = require('cors');

const app = express();
const port = 8080;

app.use(cors());

const eventsRouter = require("./routes/events");
const goalsRouter = require("./routes/goals");
const tasksRouter = require("./routes/tasks");
const habitsRouter = require("./routes/habits");
const habitRecordsRouter = require("./routes/habitRecords");

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.get("/", (req, res) => {
    res.json({ message: "' _ '"});
});

app.use("/events", eventsRouter);
app.use("/goals", goalsRouter);
app.use("/habits", habitsRouter);
app.use("/habitRecords", habitRecordsRouter);
app.use("/tasks", tasksRouter);


/* error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});


app.listen(port, () => {
    console.log(`server listening at https://localhost:${port}`);
});