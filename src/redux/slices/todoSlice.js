import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    init(state,action){
      return state=action.payload
    },
    todoAdded(state, action) {
      state.push(action.payload);
    },
    deleteTodo(state, action) {
      return state=action.payload
    },

    editTodo(state,action){
      return state=action.payload
     
    }
  },
});

export const { todoAdded, deleteTodo,editTodo } = todosSlice.actions;
export default todosSlice.reducer;
