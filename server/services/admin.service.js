const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");

exports.adminLogin = (data) => {
  try {
    const { adminId, password } = data;
    let id = process.env.ADMIN_ID || "admin";
    let pass = process.env.ADMIN_PASS || "admin@123";
    if (
      adminId === id &&
      password === pass
    ) {
      let adminData = { id: adminId, role: "admin" };
      let token = jwt.sign(adminData, process.env.JWT_SECRET || "mysecret", {
        expiresIn: "1h",
      });
      return {
        success: true,
        message: "Admin successfully logged in",
        data: { token: token,role:"admin" },
      };
    }
    throw new AppError("Invalid Admin Credentials", 401);
  } catch (err) {
    throw new AppError(err?.message || "Internal Server Error", 500);
  }
};
