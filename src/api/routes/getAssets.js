import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../config/db.config.js'


const router = express.Router();

const secretKey = process.env['secretKey']


router.post("/", async (req, res) => {

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    // Token not provided
    return res.status(401).json({ message: 'Missing token' });
  }


  let { assetType, username, amount, overWriteFlag } = req.body;

  jwt.verify(token, secretKey, (err, decoded) => {

    if (err) {
      console.error(err);
      return res.status(401).json({ message: 'Invalid Token' })
      
    }
    
    const decodedUsername = decoded.username;

    if(username.trim() == decodedUsername ){


      db.serialize(async function () {

      
    } else {

      return res.status(401).json({message : 'You are not authorized to view this shit!'})
    }

  })

  try {

    // Check Token

    // Check if overWrite flag is on
    // if on update a record
    // if not create a record
    // return success



  } catch(err) {

    console.err(err)
    return res.status(500).send('Internal Server Error')

  }


})


export default router;