const Service = require("../services/admin.service.js");

exports.adminLogin = (req, res, next) => {
  try {
    let response = Service.adminLogin(req.body);
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
