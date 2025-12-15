import express from 'express';
import { getUserByEmail , createUser} from 'db/users';
import { authentification, random } from 'helpers';

export const register = async (req: express.Request, res: express.Response)=>{
    try{
        const {email, password, username} = req.body;

        if(!email || !password || !username){
            return res.status(400).send({message: 'Missing parameters'});
        }
        
        const existingUser = await getUserByEmail(email);
        existingUser && res.status(400).send({message: 'User already exists'});

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentification: {
                salt,
                password: authentification(salt, password),
            }
        });

        return res.status(200).send(`${user} created successfully`);
    } catch (error) {
        return res.status(400).send({message: 'Error registering user', error});
    }
}