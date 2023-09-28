import express from 'express';
import { router } from './decorators/controller.decorator'
import './controllers/sku.controller'

import cors from 'cors'; 

const app = express();
const port = 3000;
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

app.use(router); // use the router for routes starting with '/app'


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});