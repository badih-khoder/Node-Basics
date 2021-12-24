/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
 function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  var text = text.trim()
  if (text === 'quit' || text === 'exit') {
    quit();
  }else if(text === 'help'){
    help();
  }else if(text.split(" ")[0] === 'hello'){
    if(text.split(" ")[1] !== undefined){
      hello(text)
    }else{
      hello(text)
    }
  }else if(text === 'ls'){
    list()
  }else if(text.split(" ")[0] === 'add'){
    if(text.split(" ")[1] !== undefined){
      add(text.substring(4))
    }
    else{
      console.log('error: Please add task')
    }
  }else if(text.split(" ")[0] === 'edit'){
    editTask(text)
  }else if(text.split(" ")[0] === 'check'){
    check(text)
  }else if(text.split(" ")[0] === 'uncheck'){
    uncheck(text)
  }else if(text.split(" ")[0] === 'remove'){
      removeItemOnce(text.substring(7))
  }else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}
// This function show the list command
function help(){
  console.log(`
                -help: show the command
                -hello: to greet username
                -ls: show you the list of task
                -add: add task to the list
                -remove: remove last task from the list or remove (num) to remove what do you want
                -edit: edit your task
                -check: check a task in the list
                -uncheck: uncheck a task in the list
                -quit: exit from application
                -exit: exit from application
                `)
}

/**
 * Says hello with the name of the user
 *
 * @returns {void}
 */
function hello(str){
  console.log(str + "!")
}
// list array
// var taskList = ['First Task', 'Second Task', 'Third Task']
var taskList = [
  {
    taskDone: false,
    task: 'First Task'
  },
  {
    taskDone: true,
    task: 'Second Task'
  },
  {
    taskDone: true,
    task: 'Third Task'
  },
  {
    taskDone: false,
    task: 'fourth Task'
  }

]
// function list(){
//   for (let i = 0; i < taskList.length; i++) {
//     console.log(`${i+1}: ${taskList[i]}`);
//   }
// }
function list(){
  taskList.map((item,index) => {
    if(item.taskDone === true){
      console.log(`${index+1} - [✔] ${item.task}`);
    }else{
      console.log(`${index+1} - [ ] ${item.task}`);
    }
  })
}
// add task to array
function add(thisTask){
  let taskItem = {
    taskDone: false,
    task: thisTask
  }
  taskList.push(taskItem)
  console.log(`Successfully added`)
}
// edit task from array
function editTask(edit){
  var editT = Number(edit.trim().split(" ")[1]);
  if(edit.trim().split(" ")[1] === undefined){
    console.log('error: Please enter a number or edit the text')
  }else if(isNaN(editT)){
      taskList[taskList.length -1].task = edit.trim().substring(5);
    console.log("the task edited")
  }else if(editT > taskList.length){
    console.log('That number does not exist')
  }else{
    if(edit.trim().split(" ")[2] === undefined){
      console.log("No text")
    }else{
    taskList[editT -1].task = edit.trim().substring(7);
    console.log("the task edited")
    }
  }
}
// remove task from array
function removeItemOnce(value) {
  var index = Number(value);
  if (isNaN(index)) {
    taskList.splice(taskList.length -1, 1);
    console.log("the task deleted")
  }else if(index > taskList.length){
    console.log('That number does not exist')
  }else{
    taskList.splice(index -1, 1);
    console.log("the task deleted")
  }
}
// check list item
function check(thisText){
    if(thisText.trim().split(" ")[1] === undefined || thisText.trim().split(" ")[1] > taskList.length){
      console.log(`This task ${thisText.trim().split(" ")[1]} enter a number include your list`)
    }else{
      for (let i = 0; i < taskList.length; i++) {
        if(i == thisText.trim().split(" ")[1] -1){
          taskList[i].taskDone = true;
      }
    }
  }
}
//  uncheck list item
function uncheck(thisText){
    if(thisText.trim().split(" ")[1] === undefined || thisText.trim().split(" ")[1] > taskList.length){
      console.log(`This task ${thisText.trim().split(" ")[1]} enter a number include your list`)
    }else{
      for (let i = 0; i < taskList.length; i++) {
        if(i == thisText.trim().split(" ")[1] -1){
          taskList[i].taskDone = false;
      }
    }
  }
}
/**
 * Exits the application
 *
 * @returns {void}
 */
 var fs = require("fs"); 
 var fileName = 'database.json';
 function quit() {
  console.log("Quitting now, goodbye!");
  try {
    const ObjectJson = Object.assign({}, taskList);
    fs.writeFile(fileName, JSON.stringify(ObjectJson), function writeJSON(err) {
      if (err) console.log(err);
      console.log(`Data have been saved and replaced in ${fileName}`);
      process.exit();
    });
  } catch (error) {
    console.error('Error! Data not saved!');
  }
}

const { argv } = require("process");
let file = process.argv[2];
if(file === undefined){
  fileName = 'database.json'
}else{
  fileName = file;
  console.log(fileName)
}


let getData = JSON.parse(fs.readFileSync(fileName));
console.log(getData)
let info = Object.values(getData);
info.forEach((value) => {
  taskList = Object.values(info);
});
// The following line starts the application
startApp("badih khoder")
