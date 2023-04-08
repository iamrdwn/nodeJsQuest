import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../config/db.config.js'


const router = express.Router();

const secretKey = process.env['secretKey']


router.post("/", async (req, res) => {
  const {username,password} = req.body;
  
  try {
    let user = db.get('SELECT username, password from users where username = ?', [username], async (err, user) => {
      if (err) {
        console.error(err)
      } else if (!user) {
        return res.status(409).send('Invalid Credentials')
      } else {
        let passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
          return res.status(401).send('Invalid Credentials');
        }
        const token = jwt.sign({username}, secretKey, {expiresIn: '3h'});

        res.status(201).send({ token })
      }
      db.finalize;
    })
  } catch (err) {
    console.error("Error Authenticating User", err);
    res.status(500).send('Internal Server Error');
  }
})


export default router;