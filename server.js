
import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todos.js";


console.log("DB_PASSWORD:", process.env.DB_PASSWORD);




const PORT = process.env.SERVER_PORT || 5000;
const app = express();


app.use(cors());
app.use(express.json()); // this line is written inorder for the re.body to work if this is not written it will not work  

app.use("/todos", todoRoutes);

app.listen(PORT, ()=>{
    console.log("Server started!!!");
    
})