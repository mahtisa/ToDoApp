import { FaRegCheckSquare, FaRegEdit, FaRegTrashAlt } from 'react-icons/fa';
import { useInputContextActions, useToDoActions } from './ToDoApp';

import styles from "./toDoList.module.css"

const ToDo = ({todo,onDelete,doTask,setEdit}) => {
    const {clickHandler,changeHandler,setInput} = useInputContextActions();
    const dispatch = useToDoActions();
    const editHandler = (title,id)=>{
        setInput(title);
        setEdit(true);
        dispatch({type:"edit",id})
    }
    return ( 
        <div className={`${styles.toDoList} ${todo.status && styles.toDoLine}`}>
            <span>{todo.title}</span>
           <div className={styles.btnHolder}>
                <FaRegEdit className={styles.blue} onClick={()=>editHandler(todo.title,todo.id)}/>
                <FaRegCheckSquare className={styles.blue} onClick={doTask}/>
                <FaRegTrashAlt className={styles.red} onClick={onDelete}/>
            </div> 
        </div>
     );
}
 
export default ToDo;