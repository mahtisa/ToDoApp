import {useInputContext, useInputContextActions} from "./ToDoApp"

import styles from "./toDoForm.module.css"

const ToDoForm = (props) => {
    const todo = useInputContext();
   const {clickHandler,changeHandler} = useInputContextActions();
    return ( 
                <form className={styles.formContainer}>
                    <input className={styles.input} placeholder="add your todo ..." type="text" onChange={changeHandler} value={todo}/>
                    <button onClick={clickHandler} className={styles.btn}>{props.edit ? "Edit" : "Add To List"}</button>
                </form>
     );
}
export default ToDoForm;