const Controller = require("../controllers/emp.controller.js");
const express = require("express");
const router = express.Router();
const {adminAuth} =require("../middleware/adminAuth.js")

//create employee
router.post("/",adminAuth, Controller.createEmp);

//fetch all employee
router.get("/", adminAuth, Controller.fetchAllEmp);

//fetch employee by id
router.get("/:id", adminAuth, Controller.fetchEmpById);

//update employee by id
router.put("/:id", adminAuth, Controller.updateEmp);

//delete employee by id

router.delete("/:id", adminAuth, Controller.deleteEmp);

module.exports = router;
