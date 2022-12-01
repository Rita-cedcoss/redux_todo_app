import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, completedTodo, deleteItem, updateItem,updatecompleteItem, deleteCompletedItem } from "../todoSlice";
let index;let indexComp;

const TodoList = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // function for add and update data
  const addTodolist = (e) => {
    let btnText = e.target.innerHTML;
    let inpData = document.getElementById("inpTodo").value;
    let obj = {content: inpData };
    if (btnText === "Submit") {
      if (document.getElementById("inpTodo").value === "") {
        alert("please enter value");
      } else {
        dispatch(addItem(obj));
        document.getElementById("inpTodo").value = "";
      }
    } else if (btnText === "Update") {
     
      dispatch(
        updateItem({
          inpIndex: index,
          content: document.getElementById("inpTodo").value,
        })
      );
      e.target.innerHTML = "Submit";
      document.getElementById("inpTodo").value = "";
    }
    else if(btnText=="Updated")
    {
      dispatch(updatecompleteItem(
        {inpIndex: indexComp,
        content: document.getElementById("inpTodo").value,}
      ));
      e.target.innerHTML = "Submit";
      document.getElementById("inpTodo").value = "";
    }
  };
  //for Edit incompleted Data
  const editData = (e) => {
    index = e.target.getAttribute("ind");
    document.getElementById("inpTodo").value =
      state.todoReducer.todoArr[index].content;
    document.getElementById("btnSubmit").innerHTML = "Update";
  };
  //for Delete incompleted data
  const deleteData = (e) => {
    let index = e.target.getAttribute("ind");
    dispatch(deleteItem({ index: index }));
  };
  //For send completed Array
  const checked=(e)=>{
    let index=e.target.getAttribute("ind");
    dispatch(completedTodo({index:index}));
  }
  //For edit Completed Data
  const editCompleteData=(e)=>{
    indexComp = e.target.getAttribute("ind");
    document.getElementById("inpTodo").value =
      state.todoReducer.completeArr[indexComp].content;
    document.getElementById("btnSubmit").innerHTML = "Updated";
  }
  // For delete Completed Data
  const deleteCompletedData=(e)=>{
   let ind=e.target.getAttribute("ind");
    dispatch(deleteCompletedItem({index:ind}));
  }
  return (
    <div id="outer">
      <div id="todo_box">
        <input placeholder="Add Items...." id="inpTodo" type="text" autofocus />
        <button id="btnSubmit" onClick={addTodolist}>
          Submit
        </button>
      </div>
      {state.todoReducer.todoArr.map((item, i) => {
        return (
          <div id="todo_list">
            <input className="checkbox" type="checkbox" onClick={checked} ind={i} />
            <p>{item.content}</p>
            <button className="btnDelete" ind={i} onClick={editData}>
              Edit
            </button>
            <button className="btnDelete" ind={i} onClick={deleteData}>
              Delete
            </button>
          </div>
        );
      })}
     {state.todoReducer.completeArr.length==0?<p></p>:<h1>completed Array</h1>} 
      {state.todoReducer.completeArr.map((item, i) => {
        return (
          <div id="todo_list">
            <input className="checkbox" type="checkbox"  ind={i} checked/>
            <p>{item.content}</p>
            <button className="btnDelete" ind={i} onClick={editCompleteData}>
              Edit
            </button>
            <button className="btnDelete" ind={i} onClick={deleteCompletedData}>
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
