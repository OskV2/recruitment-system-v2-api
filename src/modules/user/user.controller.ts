import { Request, Response } from "express";
import * as userService from "./user.service";
import jwt from 'jsonwebtoken';
import bcrpyt from 'bcrypt'

export const getUser = async (req: Request, res: Response) => {
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

    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    const match = await bcrpyt.compare(req.body.password, user.password)
    if (!match) {
      res.status(401).json({ message: 'incorrect username email or password' })
      return
    }

    const data = {
      token: jwt.sign({ email: user.email }, 'recruitment-system'),
      user: user
    }

    res.status(200).json(data)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ message: 'Something went wrong' });
  }
};
