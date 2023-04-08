import express from 'express';

import loginRouter from './src/api/routes/login.js'
import registerRouter from './src/api/routes/register.js'
import createAssetsRouter from './src/api/routes/createAssets.js'

const app = express();
app.use(express.json());
// app.use(queryToLowerCase());

const port = 3000;



app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/createAsset', createAssetsRouter);




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});