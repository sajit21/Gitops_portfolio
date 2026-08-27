// import jwt from "jsonwebtoken";
// import redis from "../config/redis.js";

// export const verifySession = async (req, res, next) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];

//   if (!token) return res.status(401).json({ message: "Token required" });

//   try {
//     const session = await redis.get(`session:${token}`);
//     if (!session) return res.status(403).json({ message: "Invalid or expired session" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(403).json({ message: "Invalid or expired token" });
//   }
// };

import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const protectRoute = async (req, res, next) => {
  //check whether user is authencated by accessing access token

  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized- no access Token provided" });
    }
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      // const user =await User.findById(decoded.userId).select("-password");
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        // Select: {
        //   id: true,
        //   name: true,
        //   email: true,
        // },
      });

      if (!user) {
        return res.status(401).json({ message: "user not found" });
      }
      req.user = user;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(401)
          .json({ message: "unauthized - access token expired" });
      }
      throw error;
    }
  } catch (error) {
    console.log("error in protectRoute middleware", error.message);
    return res
      .status(401)
      .json({ message: "unauthorized -invalid access Token" });
  }
};
