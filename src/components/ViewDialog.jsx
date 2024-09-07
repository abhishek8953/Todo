import { Button } from "@chakra-ui/react";
import { calcLength } from "framer-motion";

export const ViewDialog = ({ current, close }) => {
  let arr = [];
  let currentTodo = "";
  const todoData = JSON.parse(localStorage.getItem("TODO"));

  todoData.map((todo) => arr.push(JSON.parse(todo)));

  arr.map((todo) => {
    if (todo.id === current) currentTodo = todo.todo;
  });

  console.log(currentTodo);

  return (
    <div className="absolute">
      <div className="h-8 bg-green-500 ">
        <Button
          className="ml-[17.9rem]"
          size={"sm"}
          variant={"solid"}
          colorScheme="teal"
          onClick={() => close((prev) => !prev)}
        >
          X
        </Button>
      </div>
      <div className=" bg-green-400 w-80 h-40 overflow-y-scroll">
        <div>
          <h1>{currentTodo}</h1>
        </div>
      </div>
    </div>
  );
};
