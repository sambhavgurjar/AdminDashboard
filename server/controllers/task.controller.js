const Service = require("../services/task.service.js");


//create task
exports.createTask = async (req, res, next) => {
    try {
        let response = await Service.createTask(req.body);
        res.status(201).json(response);
    } catch (err) {
        next(err)
    }
}

//fetch  task by id

exports.fetchTaskById = async (req, res, next) => {
    try {
        const { id } = req.params;
        let response = await Service.fetchTaskById(id);
        res.status(200).json(response);
    } catch (err) {
        next(err)
    }
}

//fetch  task by employee id

exports.fetchTaskByEmpId = async (req, res, next) => {
    try {
        const { empid } = req.params;
        let response = await Service.fetchTaskByEmpId(empid);
        res.status(200).json(response);
    } catch (err) {
        next(err)
    }
}

//fetch all task data

exports.fetchAllTask = async (req, res, next) => {
    try {
        let response = await Service.fetchAllTask();
        res.status(200).json(response);
    } catch (err) {
        next(err)
    }
}

//update task data by id

exports.updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        let response = await Service.updateTask(id,req.body);
        res.status(200).json(response);
    } catch (err) {
        next(err)
    }
}

//delete task data by id

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    let response = await Service.deleteTask(id);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
