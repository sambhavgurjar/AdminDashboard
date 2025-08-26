const Controller = require("../controllers/admin.controller.js");
const express = require("express");
const router = express.Router();

//create employee
router.post("/login", Controller.adminLogin);

module.exports = router;
