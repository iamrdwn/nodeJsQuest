import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../config/db.config.js'

import validateToken from '../../utils/validateToken.js'


const router = express.Router();

const secretKey = process.env['secretKey']


router.get("/", async (req, res) => {

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Token not provided
    return res.status(401).json({ message: 'Missing token' });
  }

  let username = req.query.username;
  let validatedToken = validateToken(token, username)


  try {

    if (validatedToken){

      db.all('SELECT * FROM assets WHERE username = ?', [username], (err, rows)=> {

        if(err){
          console.error(err)
          return res.status(500).json({message:'something broke'})
        }

        if(rows.length === 0){
          return res.status(404).json({message: 'No Assets found for the user'})
        } else {
          return res.status(200).send(rows);
        }
        
      })
    } else {

        return res.status(401).json({
            message: 'You are not authorized to view this shit!'
        })
    }


  } catch(err) {

    console.err(err)
    return res.status(500).send('Internal Server Error')

  }


})


export default router;