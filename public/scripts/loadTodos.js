require('dotenv').config()

const {addUser} = require('../../helpers')
const {categorizeAndInsertNewTodo} = require('../../helpers')
const {sortListOfTodosByCategoryAndId} = require('../../helpers')
const {sortListOfTodosById} = require('../../helpers')


sortListOfTodosByCategoryAndId(2, "To Eat")