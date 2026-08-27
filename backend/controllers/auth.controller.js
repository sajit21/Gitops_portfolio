// import { createUser, findbyId } from "../models/auth.model.js";
import { createUser } from "../models/auth.model.js";
import bcrypt from "bcrypt";
import redis from "../config/redis.js";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";


//auth controller  here
const prisma = new PrismaClient();

const generateTokens = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(`refresh_token:${userId}`, refreshToken, {
    ex: 7 * 24 * 60 * 60,
  });
};

const setCookies = (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

export const Signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hashedPassword);

    res.status(201).json({ message: "User created", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: "invalid credentails" });
    // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    //   expiresIn: "1h",});

    // jwt.sign({id:user.id},process.env.JWT_SECRET,{expiresIN:"1h"})
    // await redis.setex(
    //   `session:${token}`,
    //   3600,
    //   JSON.stringify({ userId: user.id })
    // );
    // res.json({ message: "login successful", token });

    const { accessToken, refreshToken } = generateTokens(user.id);
    await storeRefreshToken(user.id, refreshToken);
    setCookies(res, accessToken, refreshToken);

    res.json({
      message: "login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// export const logout = async (req, res) => {
//   try {
//     const token = req.headers["authorization"]?.split(" ")[1];
//     if (!token) return res.status(400).json({ message: "Token required" });

//     await redis.del(`session:${token}`);

//     console.log("delete bhayo");
//     res.json({ message: "logged out" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      await redis.del(`refresh_token:${decoded.userId}`);
    }

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    console.log(refreshToken)

    if (!refreshToken) {
      return res
        .status(401)
        .json({ success: false, message: "token not found" });
    }

    //incase of yes token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET); //check the token signature from browser with secret key placed at env.
    const storeRefreshToken = await redis.get(
      `refresh_token:${decoded.userId}`
    ); //is the refresh token saved in the redis is same as the token in the browser?

    //store bhako refresh token sanga match huncha ki nai
    if (storeRefreshToken !== refreshToken) {
      return res.status(401).json({ message: "invalid refresh token" });
    }

    const accessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15min" }
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      // secure: false,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    // res.json({ message: "token refreshed" });
    res.json({
  success: true,
  user: { id: decoded.userId },  // minimal user payload
  message: "token refreshed"
});

  } catch (error) {
    console.log("error in refreshToken controller", error.message);
    res.status(500).json({ message: "server error ", error: error.message });
  }
};
