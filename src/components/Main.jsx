import { Button, useToast } from "@chakra-ui/react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { IoIosList } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { todoAdded } from "../redux/slices/todoSlice";
import { TableData } from "./TableData";

export const Main = () => {
  const [data, setData] = useState({
    todoData: "",
  });

  const toast = useToast();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.todo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const createTodo = (e) => {
    if (data.todoData.length < 1) {
      return toast({
        position: "top-right",
        title: "Please Enter Name",
        status: "error",
        isClosable: true,
        duration: 2000,
      });
    }

    let flag = 0;
    name?.map((value) => {
      if (value.todo.toLowerCase() === data.todoData.toLowerCase()) {
        flag = 1;
        toast({
          position: "top-right",
          status: "warning",
          title: "Already Todo Exist",
          isClosable: true,
          duration: 2000,
        });
      }
    });

    if (flag == 1) return;

    const createdDate = new Date().toDateString();
    let finalTodo = {
      id: nanoid(),
      todo: data.todoData,
      date: createdDate,
    };
    console.log("create function");
    let prevTodos = localStorage.getItem("TODO");
    prevTodos = JSON.parse(prevTodos);

    let arr = [];

    prevTodos ? prevTodos.map((e) => arr.push(e)) : "";
    let newArrayData = JSON.stringify(finalTodo);
    arr.push(newArrayData);
    

    localStorage.setItem("TODO", JSON.stringify(arr));

    dispatch(todoAdded(finalTodo));
    setData({ todoData: "" });
  };

  return (
    <div>
      <div className="flex justify-center items-center pt-5 flex-wrap ">
        <div
          className="rounded-lg"
          style={{ border: "1px solid black", display: "flex", width: "14rem" }}
        >
          <IoIosList style={{ fontSize: "2rem" }} />
          <input
            onChange={handleChange}
            type="text"
            value={data.todoData}
            name="todoData"
            style={{ outline: "none" }}
          />
        </div>
        <div className="pl-6">
          <Button onClick={createTodo} colorScheme="teal">
            Add TODO
          </Button>
        </div>
      </div>

      <div>
        <TableData />
      </div>
    </div>
  );
};
