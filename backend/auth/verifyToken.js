/* eslint-disable no-undef */
import Jwt from "jsonwebtoken";

export const authenticate = async (req, res, next) => {
  //get token from headers
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer ")) {
    //if we do not use return here. get error Cannot set headers after they are sent
    return res
      .status(401)
      .json({ success: false, message: "Authorization denied" });
  }

  try {
    const token = authToken.split(" ")[1];

    //verify token
    const decoded = Jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.id;
    req.profession = decoded.profession;

    console.log("[[decoded]]", decoded);

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token is expired" });
    }

    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};
