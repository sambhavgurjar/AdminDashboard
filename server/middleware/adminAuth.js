const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");

exports.adminAuth = (req, res, next) => {
  try {
    let authorization = req.headers.authorization;
    if (!authorization) throw new AppError("Token not found", 403);
    //accepted token format <Bearer Token>
    let token = authorization.split(" ")[1];
    if (!token) throw new AppError("Invalid Token Format", 403);
    let decodedToken = jwt.verify(token, process.env.JWT_SECRET || "mysecret");
    if (!decodedToken) throw new AppError("Invalid or expired Token ", 403);
    if (!decodedToken.role === "admin")
      throw new AppError(" Only Admin Can Access", 403);
    req.user = decodedToken;
    next();
  } catch (err) {
    next(err);
  }
};
