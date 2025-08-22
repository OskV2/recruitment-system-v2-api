import { Request, Response } from "express";
import * as userService from "./user.service";


export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.userId
    const user = await userService.getUser(+id)
    res.status(200).json(user)
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// export const getUsers = async (req: Request, res: Response) => {
//   try {
//     const users = await userService.listUsers();
//     res.json(users);
//   } catch (err: any) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, name, roleId } = req.body;
    const user = await userService.createUser(email, name);
    res.status(201).json(user);
  } catch (err: any) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async () => {
  try {
    
  } catch (error) {
    
  }
}

export const loginUser = async (req: Request, res: Response) => {

  console.log()

  try {
    const user = await userService.getUser(req.body.email)
    if (!user) {
      res.status(404).json({ message: 'User not found' })
      return
    }

    //  compare password with bcrypt lib
    //  if passwords match then generae token somehow
    //  send token to frontend like res.status(200).json(data)

    //  pretty easy huh?

    console.log(user) 
    res.status(200).json(user)
  } catch (err: any) {
    console.error(err)
    res.status(400).json({ error: err.message });
  }


};
