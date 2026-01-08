import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { MdOutlineDone, MdModeEditOutline , MdOutlineDoneOutline, MdClose} from "react-icons/md";
import { FaTrash } from "react-icons/fa6";


function App() {  
 const [description, setDescription]  = useState(" ");
 const [todos, setTodos] = useState([]);
 const [editingTodo, setEditingTodo] = useState(null);
 const [editedText, setEditedText] = useState("");
 const inputRef = useRef(null);

//  const [taskCompletd, setTaskCompleted] = useState(false);
//  const [] = useState(" ");
 
  // showing all the todos
   const getTodos = async(e)=>{
    try{
      const res = await axios.get("http://localhost:5000/todos");
      setTodos(res.data);
      // console.log(res.data);
    }catch(err){
      console.error(err.message);
    }
      
  };


  // editing a todo
  const updateText = async(id, editedDesc, completed)=>{
    try{
     const res =  await axios.put(`http://localhost:5000/todos/${id}`, {
      description: editedDesc, 
      completed: completed,
    });
     getTodos();
     setEditingTodo(null);
     setEditedText(" ");

    }catch(err){
      console.error(err.message);
    }
  }

  // deleting a todo
  const deleteText = async(id)=>{
    try{
     const res = await axios.delete(`http://localhost:5000/todos/${id}`);
     getTodos();
    }catch(err){
      console.error(err.message);
      
    }
  }
  
  //creating a todo
  const onSubmitForm = async(e)=>{
    e.preventDefault();
    try{
      await axios.post("http://localhost:5000/todos",{
        description,
        completed: false,
      });
      setDescription(""); 
      getTodos();

    }catch(err){
      console.error(err.message);
    }
  }


//for doing the completed check mark
  const handleCompleted = async(id, description, completed) =>{
    try{
      await axios.put(`http://localhost:5000/todos/${id}`, {
        description: description,
        completed: !completed,
      });
      getTodos();
    }catch(err){
      console.error(err.message);
    }
  }


  //this is for dislaying all the todos after the first rendering
  useEffect(()=>{
    getTodos();
   },[]);

  //this is for making the edit input text focus when edit button is vlicked
  useEffect(()=>{
    editingTodo !== null && inputRef.current && 
       inputRef.current.focus();
    
  },[editingTodo]);

   
  
  return (
    <>
      <div className="min-h-screen bg-gray-800 flex justify-center
       items-center p-4"
       >
        <div className="bg-gray-50 rounded-2xl shadow-xl w-full max-w-lg p-8 ">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">PERN TO DO APP</h1>
          <form
            onSubmit={onSubmitForm}
            className="flex items-center gap-2 border 
                rounded-xl shadow-sm p-2 mb-6
          ">
              <input 
                className="flex-1 px-4 py-2 focus:outline-none "
                type="text"
                value={description} 
                onChange={(e)=>setDescription(e.target.value)}
                placeholder="Enter your todo"
                required
              />


              <button type="submit" className="bg-blue-500 hover:bg-blue-600 border rounded-md text-white px-4 py-2 cursor-pointer font-medium">
                Add task
              </button>
          </form>

          <div>
          
              {todos.length===0?(
                <p className="text-gray-600">No tasks available, add a new task</p>
                ):(
                <div className="flex flex-col gap-y-4">
                  {
                    todos.map((todo)=>(
                      editingTodo === todo.todo_id ? (

                        // editing mode displaying logic

                          <div className="flex gap-x-4 justify-between" key={todo.todo_id}>
                          
                              <input 
                                ref = {inputRef}
                                className="w-screen border-2"
                                type="text" 
                                value={editedText} 
                                onChange={(e)=>setEditedText(e.target.value)}/>
                              <div className="flex gap-x-4">
                                <button className="border-2 bg-green-500 text-white border-green-500 
                                    hover:bg-green-700 hover:border-green-700 rounded-sm">
                                  <MdOutlineDoneOutline size={20}
                                    onClick={()=>updateText(todo.todo_id, editedText, todo.completed)}
                                />
                                </button>
                                <button className="border-2 bg-red-500 text-white border-red-500 
                                    hover:bg-red-900 hover:border-red-900 rounded-sm">
                                  <MdClose size={20}
                                    onClick={()=>setEditingTodo(null)}
                                />
                                </button>
                              </div>
                          </div>
                      ):(

                      // todos displaying logic

                      <div key={todo.todo_id} className="flex item-center gap-x-4 justify-between">
                        <div className="flex item-center gap-x-4">
                          {/*button for showing the completed check mark*/}
                         <button
                           className={`h-6 w-6 border-2 rounded-full felx items-center 
                           justify-center ${
                             todo.completed?"bg-green-500 border-green-500 text-white":"border-gray-300 hover:border-blue-500"
                           }`
                          }
                          onClick={()=>handleCompleted(todo.todo_id, todo.description, todo.completed)}
                         >
                          {todo.completed && <MdOutlineDone size={20}/>}
                          </button>

                          {/* display the description/todo */}  
                          <span >{todo.description}</span> 
                        </div>

                        <div className="flex gap-x-2">
                            {/* button for editing */} 
                            <button onClick={()=>{
                              setEditingTodo(todo.todo_id);
                              setEditedText(todo.description);  
                             
                              }}
                              className="text-blue-500 hover:text-blue-700
                                rounded-lg hover:bg-blue-100"
                            >
                                <MdModeEditOutline/>
                            </button>

                            {/* button for deleting */} 
                            <button
                              className="text-red-500 hover:text-red-700
                                rounded-lg hover:bg-red-100"

                                onClick={()=>deleteText(todo.todo_id)}
                            >
                                <FaTrash/>
                            </button>
                        </div>

                      </div>)
                     
                    ))
                  }
                </div>
                )}
         
          </div>
         
        </div>
      </div>
    </>
  )
}

export default App
