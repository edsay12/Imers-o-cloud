import express, { Express } from "express";
import routes from "./routes/Routes";
import * as dotenv from "dotenv";

dotenv.config();

const app: Express = express();
// cores
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);




app.listen(process.env.NODE_PORT, () => {
  console.log(`Server is running at port ${process.env.NODE_PORT} `);
});

export default app;
