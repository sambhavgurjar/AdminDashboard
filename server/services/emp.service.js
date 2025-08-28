const EMP = require("../model/emp.model.js");
const AppError = require("../utils/AppError.js");

//create a employee
exports.createEmp = async (data) => {
  try {
    let existingEmail = await EMP.findOne({ email: data.email });
    if (existingEmail)
      throw new AppError("Employee with this email already exists", 400);

    let emp = new EMP(data);
    await emp.save();
    return {
      success: true,
      message: "employee created successfully",
      data: null,
    };
  } catch (err) {
    throw new AppError(err?.message || "Internal Server Error", 500);
  }
};

//fetch  employee by id

exports.fetchEmpById = async (id) => {
  try {
    let emp = await EMP.findById(id);
    if (!emp) throw new AppError("Employee Not Found", 404);
    return {
      success: true,
      message: "Employee data fetched successfully",
      data: emp,
    };
  } catch (err) {
    throw new AppError(err?.message || "Internal Server Error", 500);
  }
};

//fetch all employee data

exports.fetchAllEmp = async () => {
  try {
    let emps = await EMP.find();
    return {
      success: true,
      message: "Employee data fetched successfully",
      data: emps,
    };
  } catch (err) {
    throw new AppError(err?.message || "Internal Server Error", 500);
  }
};

//update employee data by id

exports.updateEmp = async (id, data) => {
  try {
    let emp = await EMP.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!emp) throw new AppError("Employee data not found", 404);
    return {
      success: true,
      message: "Employee data updated successfully",
      data: emp,
    };
  } catch (err) {
    throw new AppError(err?.message || "Internal Server Error", 500);
  }
};

//delete a employee by id

exports.deleteEmp = async (id) => {
  try {
    let emp = await EMP.findByIdAndDelete(id);
    if (!emp) throw new AppError("Employee data not found", 404);
    return {
      success: true,
      message: "Employee data deleted successfully",
      data: emp,
    };
  } catch (err) {
    throw new AppError(err?.message || "Internal Server Error", 500);
  }
};
