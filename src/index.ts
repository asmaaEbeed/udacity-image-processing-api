// export default myFunc;
import express, { Response } from 'express';
// import { promises as fsPromises } from 'fs';
import fs from 'fs';
import path from 'path';
import routes from './routes/index';

const app = express();
const port = 3000;

app.use('/api', routes);

//Provided endpoint should open in the browser with status 200
app.get('/', (_, res: Response): void => {
  res.status(200).send('Server is working!');
});

app.listen(port, (): void => {
  console.log(`server started at http://localhost:${port}`);
  // make sure thumb folder exists
  const thumbPath = path.resolve(__dirname, '../assets/thumb');
  // If not exist create thumb directory
  if (!fs.existsSync(thumbPath)) {
    fs.mkdirSync(thumbPath);
  }
});

export default app;
