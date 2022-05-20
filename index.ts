import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import InformationRouter from './src/routes/InformationRouter';
import { dynamodb, params } from './src/dbConfig';

const app = express();
const port = 4000;

dynamodb.createTable(params, function (err: any, data: any) {
  if (err) {
    console.error('Error JSON.', err.message);
  } else {
    console.log('Created table.', data);
  }
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/info', InformationRouter);

app.listen(port, () => {
  console.log(`Timezones by location application is running on port ${port}.`);
});
