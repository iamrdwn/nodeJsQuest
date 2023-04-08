import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../config/db.config.js';



const router = express.Router();
const secretKey = process.env['secretKey']


router.post('/', async (req, res) => {

  const {username,password, email} = req.body;

  try {

    const hashedPassword = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users(username, password, email) VALUES (?, ?, ?)', [username, hashedPassword, email.trim()], err => {
      if (err) {
        return res.status(409).send('User Already Exists!')
      } else {
        
        const token = jwt.sign({username}, secretKey, {expiresIn: '3h'});
        res.status(201).send({ token });

      }


    })

  } catch (err) {

    console.error(err)
    return res.status(500).send('Internal Server Error');

  }




});


export default router;
