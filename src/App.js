import ToDoApp from "./components/ToDoApp";
import styles from "./app.module.css"
function App() {
  return (
    <div className={styles.app}>
      <h1 className={styles.title}>My ToDo App</h1>
      <ToDoApp/>
    </div>
  );
}

export default App;
