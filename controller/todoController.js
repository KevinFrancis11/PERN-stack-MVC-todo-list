import { createTodoModel,
          getAllTodoModel, 
          updateTodoModel, 
          deleteTodoModel  
        } from "../models/todoModel.js";
 
export const createTodo = async(req,res)=>{
    try{
       const {description, completed} = req.body;

       const newTodo = await createTodoModel(description, completed||false);

       res.json(newTodo);

    }catch(err){
        console.log(err.message);
        res.status(500).send("server error");

    }
}


export const getAllTodos =  async(req, res)=>{
   
    try{
        const allTodos = await getAllTodoModel();

        res.json(allTodos);
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

 
export const updateTodo =  async(req, res)=>{
    const {description, completed} = req.body;
    const {id} = req.params;
    try{
        const updatedTodo = await updateTodoModel(description, completed, id);

        res.json({
            message: "The todo was updated",
            todo : updatedTodo
        });
    }catch(err){
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

export const deleteTodo = async(req, res)=>{
    const {id} = req.params;

    try{
        await deleteTodoModel(id);
        
        res.json("Todo was deleted");
    }catch(err){
        console.error(err.message);
        res.status(500).json("Server error");
    }
};


