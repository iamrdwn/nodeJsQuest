import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../../config/db.config.js'
import validateToken from '../../utils/validateToken.js';


const router = express.Router();
const secretKey = process.env['secretKey']


router.post("/", async (req, res) => {
  
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) {
        // Token not provided
        return res.status(401).json({
            message: 'Missing token'
        });
    }
  
    let {
        assetType,
        username,
        amount,
        overWriteFlag
    } = req.body;
  
    let validatedToken = validateToken(token, username);
  
    if (validatedToken) {
        db.serialize(async function() {
            db.all('SELECT * from assets where username = ? and assetType = ?', [username, assetType], async (err, asset) => {
                if (asset.length == 0) {
                    db.run('INSERT INTO assets(username, assetType, amount) VALUES (?, ?, ?)', [username, assetType, amount], (err) => {
                        if (err) {
                            console.error(err)
                            return res.status(500).send("Couldn't create records!")
                        } else {
                            return res.status(200).json({
                                "message": "Sucessfully added record"
                            })
                        }
                    })
                } else {
                    if (overWriteFlag) {
                        db.run('UPDATE assets SET amount = ? WHERE username = ? AND assetType = ?', [amount, username, assetType], err => {
                            if (err) {
                                console.error(err.message);
                            }
                            console.log(`Row(s) updated`);
                            return res.status(200).json({
                                message: 'Records updated!'
                            })
                        })
                    } else {
                        return res.status(500).json({
                            message: "Already exists. Please set overWriteFlag to True or use /updateAsset"
                        })
                    }
                }
            })
        })
    } else {
        return res.status(401).json({
            message: 'You are not authorized to view this shit!'
        })
    }
})
export default router;