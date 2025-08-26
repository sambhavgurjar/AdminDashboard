const Controller = require("../controllers/task.controller.js");
const express = require("express");
const router = express.Router();
const {adminAuth} = require("../middleware/adminAuth.js");

//create task
router.post("/", adminAuth, Controller.createTask);

//fetch all employee
router.get("/", adminAuth, Controller.fetchAllTask);

//fetch task by employee id
router.get("/employee/:empid", Controller.fetchTaskByEmpId);

//fetch task by id
router.get("/:id", Controller.fetchTaskById);

//update task by id
router.put("/:id", Controller.updateTask);

//delete task by id

router.delete("/:id", adminAuth, Controller.deleteTask);

module.exports = router;
