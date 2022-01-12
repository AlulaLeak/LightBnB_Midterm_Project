// Client facing scripts here

import {
  addUser,
  categorizeAndInsertNewTodo,
  sortListOfTodosByCategoryAndId,
  sortListOfTodosById,
} from "../../helpers.js";


$(document).ready(function () {

  $("#todo-list").empty().append(sortListOfTodosById(2));

    

});
