
import "./App.css";
import { Main } from "./components/Main";
import { useDispatch } from "react-redux";
import { editTodo } from "./redux/slices/todoSlice";

function App() {
  const dispatch=useDispatch()

  const initialise = () => {
    let localTodo = localStorage.getItem("TODO");
    if(!localTodo) return
    localTodo = JSON.parse(localTodo);

    let arr = [];
    localTodo.map((todo) => arr.push(JSON.parse(todo)));

    let finalArray = [];

    arr.map((todo) => {
      finalArray.push(JSON.stringify(todo));
    });

    
    dispatch(editTodo(arr));
  };

  initialise()

  return (
    <>
      <div className="bg-green-500 h-[2rem]"></div>

      <div className="h-[calc(100vh-4rem)] ">
        <Main />
      </div>

      <div className="h-[2rem] bg-green-500">Made with <span style={{color:"purple"}}> &#9829; </span></div>
    </>
  );
}

export default App;
