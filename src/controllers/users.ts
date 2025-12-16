import { getUserById } from './../db/users';
import express from 'express';

import { getUsers, deleteUserById } from '../db/users';

export const getAllUsers = async (req: express.Request, res:express.Response) => {
    try {
        const users = await getUsers();

        return res.status(200).json(users).end();
    } catch (error) {
        console.log(error);
        return res.status(400).send({message: 'Error fetching users', error});
    }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
   try{
        const {id} = req.params;

        if(!id){
            return res.status(400).send({message: 'Missing parameters'});
        }

        const deletedUser = await deleteUserById(id);
        if(!deletedUser){
            return res.status(404).send({message: 'User not found'});
        }
        
        return res.status(200).json({message: `User deleted successfully: ${deletedUser.username}`}).end();
   } catch(error) {
       console.log(error);
       return res.status(400).send({message: 'Error deleting user', error});
   }
}

export const updateUser = async (req: express.Request, res: express.Response) => {
    try{
        const {id} = req.params;
        const {username} = req.body;

        if(!id || !username){
            return res.status(400).send({message: 'Missing parameters - id or username'});
        }

        const user = await getUserById(id);
        const oldUsername = user?.username;
        user.username = username;
        await user.save();

        return  res.status(200).json(`updated User ${oldUsername} to ${user.username}`).end();
    }catch(error){
        console.log(error);
        return res.status(400).send({message: 'Error updating user', error});
    }
}