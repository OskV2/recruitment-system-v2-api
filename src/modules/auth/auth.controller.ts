import { Request, Response, NextFunction } from "express";
import * as userService from "../user/user.service";
import jwt from 'jsonwebtoken';
import bcrpyt from 'bcrypt'

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUser(req.body.email)
    if (!user) return res.status(404).json({ message: 'User not found' })

    const match = await bcrpyt.compare(req.body.password, user.password)
    if (!match) return res.status(401).json({ message: 'incorrect username email or password' })

    const token = jwt.sign({ id: user.id, email: user.email }, 'recruitment-system')
    
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
        path: "/",
      })
      .json(user)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      })
      .json({ message: "Logged out" })
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' });
  }
} 

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token; // read from cookie
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, 'recruitment-system', (err: any, decoded: any) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    (req as any).userId = decoded;
    next();
  });
}