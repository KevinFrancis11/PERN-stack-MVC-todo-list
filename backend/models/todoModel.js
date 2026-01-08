import pool from "../db.js";

//create a todo
export const createTodoModel = async(description, completed)=>{
   const result = await pool.query(
     "INSERT INTO todo (description, completed) VALUES ($1, $2) RETURNING *",
     [description, completed]
   );

   return result.rows[0];
};

//get all todos
export const getAllTodoModel = async ()=>{
    const result = await pool.query(
        "SELECT * FROM todo ORDER BY todo_id ASC",
    );

    return result.rows;
}

//update a todo
export const updateTodoModel = async(description, completed, id)=>{
    const result = await pool.query(
        "UPDATE todo SET description = $1, completed = $2 WHERE todo_id = $3 RETURNING *",
        [description, completed, id]
    );

    return result.rows[0];
};

//delete todo
export const deleteTodoModel = async(id)=>{
      await pool.query(
        "DELETE FROM todo WHERE todo_id = $1",
        [id]
    );
};
