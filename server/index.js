import Express from "express";
import cors from "cors";
import router from "./routes/Posts.js";
import {studentCollection} from "./db/ConnectToDB.js";

import {connectToDatabase} from "./db/ConnectToDB.js";
const app=Express();
app.use(Express.json());


app.use(Express.urlencoded({ extended: true }));
const port=5000;
app.use(cors());
app.use("/",router);
app.use("/auth",router);
app.use("/userValidate",router);

app.listen(port,()=>
{
    connectToDatabase();
    console.log(`server stated at port ${port}`);
});