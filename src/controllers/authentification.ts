import express from 'express';
import { getUserByEmail , createUser} from '../db/users';
import { authentification, random } from '../helpers';

export const login = async (req: express.Request, res: express.Response)=>{
    // To be implemented
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).send({message: 'Missing parameters'});
        }

        const user = await getUserByEmail(email).select('+authentification.password +authentification.salt');
        user || res.status(400).send({message: 'User does not exist'});

        const expectedHash = authentification(user.authentification.salt, password);
        if(user.authentification.password !== expectedHash){
            return res.status(403).send({message: 'Invalid password'});
        }

        const salt = random();
        user.authentification.sessionToken = authentification(salt, user._id.toString());
        await user.save();
        
        res.cookie('sessionToken', user.authentification.sessionToken, { domain: 'localhost', path: '/' });

        return res.status(200).json(user).end();
    }catch (error) {
        console.log(error);
        return res.status(400).send({message: 'Error logging in user', error});
    }
}

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

        return res.status(200).json(user).end();
    } catch (error) {
        return res.status(400).send({message: 'Error registering user', error});
    }
}