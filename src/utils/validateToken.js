import jwt from 'jsonwebtoken';
const secretKey = process.env['secretKey']


export default function(token, username) {
  
    let isTokenVerified = jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.error(err);
            return false
        }
        const decodedUsername = decoded.username;
        if (username.trim() == decodedUsername) {
            return true
        } else {
            return false;
        }
    })
  
    return isTokenVerified;
}