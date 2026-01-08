import {Router} from "express";

import { createTodo, 
         getAllTodos, 
         updateTodo , 
         deleteTodo,
       } from "../controller/todoController.js"


const router = Router();


//create a new todo
router.post("/",createTodo);


//get all todos
router.get("/", getAllTodos);


//update a todo
router.put("/:id", updateTodo);


//delete a todo
router.delete("/:id", deleteTodo);

export default router;