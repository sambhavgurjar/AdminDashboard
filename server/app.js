const express = require("express");
const app = express();
const cors = require("cors");

const empRoutes = require("./routes/emp.route.js");;
const taskRoutes = require("./routes/task.route.js");;
const adminRoutes = require("./routes/admin.route.js");;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log(req.url);
    console.log("check");
    next()
    
})
app.use("/api/v1/employees", empRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use((err, req, res,next) => {
    console.error(err);
    
    res.status(err?.statusCode || 500).json({
        success: false,
        message: err?.message || "Internal Server Error",
        data:null
    })
})

module.exports = app;