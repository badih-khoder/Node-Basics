
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
  if (text === 'quit\n' ||text === 'exit\n') {
    quit();
  }else if(text === 'help\n'){
    help();
  }else if(text.trim().split(" ")[0] === 'hello'){
    if(text.trim().split(" ")[1] !== undefined){
      hello(text.trim())
    }else{
      hello()
    }
  }else if(text.trim() === 'ls'){
    list()
  }else if(text.trim().split(" ")[0] === 'add'){
    if(text.trim().split(" ")[1] !== undefined){
      add(text.trim().substring(4))
    }
    else{
      console.log('error: Please add task')
    }
  }else if(text.trim().split(" ")[0] === 'edit'){
    editTask(text)
  }else if(text.trim().split(" ")[0] === 'remove'){
      removeItemOnce(text.trim().substring(7))
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
var taskList = ['First Task', 'Second Task', 'Third Task']
function list(){
  for (let i = 0; i < taskList.length; i++) {
    console.log(`${i+1}: ${taskList[i]}`);
  }
}
// add task to array
function add(task){
  taskList.push(task)
  for (let i = 0; i < taskList.length; i++) {
  console.log(taskList[i])
  }
}
// edit task from array
function editTask(edit){
  var editT = Number(edit.trim().split(" ")[1]);
  if(edit.trim().split(" ")[1] === undefined){
    console.log('error: Please enter a number or edit the text')
  }else if(isNaN(editT)){
      taskList.splice(taskList.length -1, 1,edit.trim().substring(5));
    console.log("the task edited")
  }else if(editT > taskList.length){
    console.log('That number does not exist')
  }else{
    if(edit.trim().split(" ")[2] === undefined){
      console.log("No text")
    }else{
    taskList.splice(editT -1, 1,edit.trim().substring(7));
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
/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("badih khoder")
