import { useToDoActions, useToDoContext } from './ToDoApp';

import ToDo from "./ToDo";
import styles from "./toDoList.module.css"

const ToDoList = (props) => {
    const todos = useToDoContext();
    const dispatch = useToDoActions();
    const deleteHandler = (id)=>{
        dispatch({type:"delete", id})
    }
    const doTaskHandler =(id)=>{
        dispatch({type:"doTask",id})
    }
    return ( 
        <div className={styles.container}>
            {
                todos.map((todo)=>{
                    return(
                        <ToDo 
                            todo={todo}
                            onDelete={()=>deleteHandler(todo.id)}
                            doTask = {()=>doTaskHandler(todo.id)}
                            key={todo.id}
                            setEdit={props.setEdit}/>
                    )
                })
            }
        </div>
     );
}
 
export default ToDoList;