import { createContext, useContext, useEffect, useReducer, useState } from "react";

import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";
import styles from "./toDoApp.module.css"

const initialState = [];
const reducer = (state,action)=>{
    switch(action.type){
        case "addToDo":
            if(action.btn === "Add To List"){
                const todo = {
                    id: Math.floor(Math.random()*100),
                    title: action.input,
                    status: false,
                    edit: false
                };
                state = [...state,todo]
                 return state;

            }else{
                console.log("edit...............")
                const index2 = state.findIndex((todo)=>todo.edit);
                const selectedTodo2 = {...state[index2]};
                console.log(selectedTodo2)

                selectedTodo2.title = action.input;
                selectedTodo2.edit = false;
                const updatedTodos2 = [...state];
                updatedTodos2[index2] = selectedTodo2;
                return updatedTodos2;
            }
        case "delete":
            const filteredTodos = state.filter((todo)=>todo.id !== action.id);
            return filteredTodos;
        case "doTask":
            const index = state.findIndex((todo)=>todo.id === action.id);
            const selectedTodo = {...state[index]};
            selectedTodo.status = true;
            const updatedTodos = [...state];
            updatedTodos[index] = selectedTodo;
            return updatedTodos;
        case "edit":
            console.log("set true..............")
            const index2 = state.findIndex((todo)=>todo.id === action.id);
            const selectedTodo2 = {...state[index2]};
            selectedTodo2.edit = true;
            const updatedTodos2 = [...state];
            updatedTodos2[index2] = selectedTodo2;
             console.log(updatedTodos2)
            return updatedTodos2;
        default:
            return state;
    }
}
const toDoContext = createContext();
const toDoContextDispatch = createContext();
const inputContext = createContext();
const inputContextDispatcher = createContext();
const ToDoApp = () => {
    const [input,setInput] = useState("");
    const [todos,setTodos] = useReducer(reducer,initialState);
    const [editStatus,setEditStatus] = useState(false);
   
    return ( 
        <inputContext.Provider value={input}>
            <inputContextDispatcher.Provider value={setInput}>
                <toDoContext.Provider value={todos}>
                    <toDoContextDispatch.Provider value={setTodos}>
                        <div className={styles.appContainer}>
                            <ToDoForm edit={editStatus} setEdit={setEditStatus}/>
                            <ToDoList setEdit={setEditStatus}/>
                        </div>
                    </toDoContextDispatch.Provider>
                </toDoContext.Provider>
            </inputContextDispatcher.Provider>
        </inputContext.Provider>
     );
}

export const useToDoContext = ()=> useContext(toDoContext);
export const useToDoActions = ()=> useContext(toDoContextDispatch);

export const useInputContext = ()=>useContext(inputContext);
export const useInputContextActions = ()=>{
    const input = useInputContext();
    const dispatch = useToDoActions();
    const setInput = useContext(inputContextDispatcher);
    const changeHandler = (e)=>{
        setInput(e.target.value);
    }
    const clickHandler=(e)=>{
        e.preventDefault();
        dispatch({type:"addToDo",input,btn:e.target.innerText})
        setInput("");
    }

    return {changeHandler,clickHandler,setInput}

}
 
export default ToDoApp;