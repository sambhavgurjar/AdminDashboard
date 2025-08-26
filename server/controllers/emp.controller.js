const Service = require("../services/emp.service.js");


//create employee
exports.createEmp = async (req, res, next) => {
    try {
        let response = await Service.createEmp(req.body);
        res.status(201).json(response);
    } catch (err) {
        next(err)
    }
}

//fetch  employee by id

exports.fetchEmpById = async (req, res, next) => {
    try {
        const { id } = req.params;
        let response = await Service.fetchEmpById(id);
        res.status(200).json(response);
    } catch (err) {
        next(err)
    }
}

//fetch all employee data

exports.fetchAllEmp = async (req, res, next) => {
    try {
        let response = await Service.fetchAllEmp();
        res.status(200).json(response);
    } catch (err) {
        next(err)
    }
}

//update employee data by id

exports.updateEmp = async (req, res, next) => {
    try {
        const { id } = req.params;
        let response = await Service.updateEmp(id,req.body);
        res.status(200).json(response);
    } catch (err) {
        next(err)
    }
}

//delete employee data by id

exports.deleteEmp = async (req, res, next) => {
  try {
    const { id } = req.params;
    let response = await Service.deleteEmp(id);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
