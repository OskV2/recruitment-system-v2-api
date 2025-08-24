import { Request, Response, NextFunction } from "express";
import * as userService from "./user.service";
import jwt from 'jsonwebtoken';
import bcrpyt from 'bcrypt'

export const getUser = async (req: Request, res: Response) => {
  console.log(req.headers)

  const id = req.params.userId

  if (!id) {
    res.status(400).json({ message: `No ID was provided in request` });
    return
  }

  try {
    const user = await userService.getUser(+id)

    if (!user) {
      res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json(user)
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ message: `Something went wrong. Could not retrieve data about user with id ${id}` });
  }
}

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ message: 'Something went wrong. Could not retrieve all users data' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;
    const user = await userService.createUser(name, email);
    res.status(201).json(user);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const editUser = async (req: Request, res: Response) => {
  const id = req.params.userId

  if (!id) {
    res.status(400).json({ message: `No ID was provided in request` });
    return
  }

  try {
    const { email, name, roleId } = req.body;
    const user = await userService.editUser(+id, email, name, roleId);
    res.status(200).json(user);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ message: `Something went wrong. Could not edit user with id ${id}` });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.userId

  if (!id) {
    res.status(400).json({ message: `No ID was provided in request` });
    return
  }
  
  try {
    const user = await userService.deleteUser(+id)
    res.status(200).json(user);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ message: `Something went wrong. Could not delete user with id ${id}` });
  }
}

export const loginUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUser(req.body.email)
    if (!user) return res.status(404).json({ message: 'User not found' })

    const match = await bcrpyt.compare(req.body.password, user.password)
    if (!match) return res.status(401).json({ message: 'incorrect username email or password' })

    const data = {
      token: jwt.sign({ id: user.id, email: user.email }, 'recruitment-system'),
      user: user
    }

    res.status(200).json(data)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' });
  }
};

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, 'recruitment-system', (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });

    // attach user info to request for downstream use
    (req as any).user = decoded;
    next();
  });

}