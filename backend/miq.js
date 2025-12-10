import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import User from './models/user.js';
import bcrypt from 'bcrypt';

const app = express(); 

dotenv.config();

const createMyself = async () => {
    try {
        await mongoose.connect(process.env.MONGOOSE_URI);
        const user = await User.findOne({username: 'miq'});
        
        if (!user) {
            const password = 'BLueLion20!';
            const saltRounds = 12;
            const hashedpassword = await bcrypt.hash(password, saltRounds);
            const Miq = new User({
                username: 'Miq',
                password: hashedpassword
            })
            console.log('Creating user Miq...');
            await Miq.save();
            console.log('User Miq created successfully');
        }else {
            console.log('User Miq already exists');
        }
        mongoose.connection.close();
    }catch (err) {
        console.error('Error creating user Miq', err);
    }

}

createMyself();