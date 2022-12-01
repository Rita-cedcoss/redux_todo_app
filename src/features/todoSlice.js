import { createSlice } from "@reduxjs/toolkit";
import { act } from "@testing-library/react";
const initialState = {
  todoArr: [],
  completeArr: [],
};
const todoSlice = createSlice({
  name: "todolist",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.todoArr = [...state.todoArr, action.payload];
    },
    updateItem: (state, action) => {
      console.log(action.payload.inpIndex, action.payload.content);
      state.todoArr[action.payload.inpIndex].content = action.payload.content;
    },
    deleteItem: (state, action) => {
      state.todoArr.splice(action.payload.index, 1);
    },
    completedTodo: (state, action) => {
      console.log("todoCompleted", action.payload.index);
      state.completeArr.push(state.todoArr[action.payload.index]);
      state.todoArr.splice(action.payload.index, 1);
      console.log(state.completeArr);
    },
    updatecompleteItem: (state, action) => {
      console.log("compled update");
      state.completeArr[action.payload.inpIndex].content =
        action.payload.content;
    },
    deleteCompletedItem: (state, action) => {
      state.completeArr.splice(action.payload.index, 1);
    },
  },
});
export const {
  addItem,
  updateItem,
  deleteItem,
  completedTodo,
  updatecompleteItem,
  deleteCompletedItem,
} = todoSlice.actions;
export default todoSlice.reducer;
