import { getUserBySessionToken } from '../db/users';
import express from 'express';
import {get, identity, merge} from 'lodash';

export const isOwner = async (req:express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const {id} = req.params;
        const identityUser = get(req, 'identity._id') as string;

        if(!identityUser){
            return res.status(401).send({message: 'Unauthorized - no identity user'});
        }

        if(identityUser.toString() !== id){
            return res.status(403).send({message: 'Forbidden - not the owner'});
        }
        
        return next();

    }catch (error) {
        console.log(error);
        return res.status(400).send({message: 'Error authorizing user', error});
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{
        const sessionToken = req.cookies?.sessionToken;

        //sessionToken || res.status(401).send({message: 'Unauthorized - no session token'});
        if (!sessionToken) {
            return res.status(401).send({ message: 'Unauthorized - no session token' });
        }

        const existingUser = await getUserBySessionToken(sessionToken);
        //existingUser || res.status(401).send({message: 'Unauthorized - User not found'});

        if (!existingUser) {
            return res.status(401).send({ message: 'Unauthorized - User not found' });
        }
        
        // Attach user identity to request object
        merge(req, {identity: existingUser});

        return next();
    }catch (error) {
        console.log(error);
        return res.status(400).send({message: 'Error authenticating user', error});
    }
};