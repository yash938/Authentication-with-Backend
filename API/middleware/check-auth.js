const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.group(token);
    const verify = jwt.verify(token, "RANDOM TOKEN");
    console.log(verify);
    if (verify.usertype == "admin") {
      next();
    } else {
      res.status(401).json({
        msg: "not admin",
      });
    }
  } catch (error) {
    res.status(401).json({
      msg: "invalid token",
    });
  }
};
