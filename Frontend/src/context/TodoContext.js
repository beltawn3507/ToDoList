import { useContext,createContext } from "react";

export const TodoContext=createContext(
    {
        todos:[
            {
                id:1,
                todo:"hey this is just a message",
                completed:false,
            }
        ],
         addTodo : (todo)=>{},
         editTodo:(todo,id)=>{},
         deleteTodo:(id)=>{},
         toggleComplete:(todo)=>{}

    }
);

export const TodoProvider=TodoContext.Provider;

export const useTodo = ()=>{
    return useContext(TodoContext); 
}