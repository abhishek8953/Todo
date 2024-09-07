import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { GrFormEdit, GrFormView } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteTodo } from "../redux/slices/todoSlice";

import { useState } from "react";
import { EditDialog } from "./EditDialog";
import { ViewDialog } from "./ViewDialog";

export const TableData = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo);
  const [show, setShow] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const [currentTodo, setCurrentTodo] = useState();

  const handleDeleteTodo = (id) => {
    const newData = todos.filter((data) => data.id !== id);
    let arr = [];
    newData.map((t) => arr.push(JSON.stringify(t)));

    localStorage.setItem("TODO", JSON.stringify(arr));
    dispatch(deleteTodo(newData));
  };

  const handleEditTodo = (value) => {
    setShow((pre) => !pre);
    setCurrentTodo(value);
  }; //TODO:

  const handleViewTodo = (e, a) => {
    
    setShowDialog((prev) => !prev);
    setCurrentTodo(a);
  };

  const handleShow = () => {
    setShow((prev) => !prev);
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "4rem",
      }}
    >
      {show ? <EditDialog cancel={handleShow} currentTodo={currentTodo} /> : ""}

      {showDialog && <ViewDialog  current={currentTodo} close={setShowDialog} />}

      <div>
        <TableContainer boxSize={"24rem"} overflowY={"scroll"}>
          <Table colorScheme="teal" size={"sm"} layout={"fixed"}>
            <TableCaption>All Your TODOS</TableCaption>
            <Thead>
              <Tr>
                <Th>Todo Name</Th>
                <Th>Todo Time</Th>
                <Th>Functions</Th>
              </Tr>
            </Thead>
            {todos.map((data, index) => {
              return (
                <Tbody key={data.id}>
                  <Tr>
                    <Td overflowX={"hidden"}>{data.todo}</Td>
                    <Td>{data.date}</Td>
                    <Td>
                      <div className="flex gap-5 ">
                        <GrFormView
                          onClick={(e) => handleViewTodo(e, data.id)}
                          cursor={"pointer"}
                          color="teal"
                          size={"2rem"}
                        />
                        <GrFormEdit
                          onClick={(e) => {
                            handleEditTodo(data);
                          }}
                          cursor={"pointer"}
                          color="teal"
                          size={"2rem"}
                        />
                        <MdDeleteForever
                          onClick={() => handleDeleteTodo(data.id)}
                          cursor={"pointer"}
                          color="red"
                          size={"2rem"}
                        />
                      </div>
                    </Td>
                  </Tr>
                </Tbody>
              );
            })}
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
