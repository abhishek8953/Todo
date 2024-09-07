import { Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo } from "../redux/slices/todoSlice";

export const EditDialog = ({ cancel, currentTodo }) => {
  const [change, setChangee] = useState("");
  const toast = useToast();

  const dispatch=useDispatch();

  const changeHandler = (e) => {
    setChangee(e.target.value);
  };

  const handleSave = () => {
    if (change.length < 1) {
      return toast({
        position: "top-right",
        title: "Please enter value",
        status: "error",
        isClosable: true,
        duration: 2000,
      });
    }

    let localTodo = localStorage.getItem("TODO");
    localTodo = JSON.parse(localTodo);

    let arr = [];
    localTodo.map((todo) => arr.push(JSON.parse(todo)));


    arr.map((todo)=>{
      if(todo.id===currentTodo.id){
        todo.todo=change;
      }
    })

    let finalArray=[];
    
    
    arr.map((todo)=>{
      finalArray.push(JSON.stringify(todo))
    })

    localStorage.setItem("TODO",JSON.stringify(finalArray))
    dispatch(editTodo(arr))
    cancel(false)
    
  };

  return (
    <div className="absolute bg-green-500">
      <div >
        <h2 className="px-10 ">Enter your Todo</h2>
        <input
        className="mx-2"
          onChange={changeHandler}
          type="text"
          name="todo"
          placeholder="Enter Your Todo"
        />
      </div>

      <Button
      className="ml-3"
        color={"red"}
        variant="outline"
        onClick={() => cancel((pre) => !pre)}
      >
        Cancel
      </Button>
      <Button className="bg-green-500 m-5 " colorScheme="teal" variant="solid" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};
