'use strict';

/* your code goes here! */

class Task {

  constructor(newDescription, newIsComplete){
    this.description = newDescription;
    this.complete = newIsComplete; 
  }

  render(){
    let elem = document.createElement('li');
    elem.textContent = this.description;
    if(this.complete){
      elem.classList.add('font-strike');
    }

    console.log("before callback is defined,", this);
    elem.addEventListener('click', () => {
      console.log("you clicked me");

      console.log("inside the callback", this);
      this.toggleFinished();
      elem.classList.toggle('font-strike');
    })

    return elem;
  }

  toggleFinished(){
    this.complete = !this.complete;
  }

}


class TaskList {

  constructor(taskArray){
    this.tasks = taskArray;
  }

  addTask(descrString) {
    let newTask = new Task(descrString, false);
    this.tasks.push(newTask);
  }

  render(){
    let olElem = document.createElement('ol');
    this.tasks.forEach((asTask) => {
      let liElem = asTask.render();
      olElem.appendChild(liElem);
    })
    return olElem;
  }

}


class NewTaskForm {

  constructor(whatFunctionToCallWhenSubmitted){
    this.submitCallback = whatFunctionToCallWhenSubmitted;
  }
  
  render(){
    let formElem = document.createElement('form');

    let inputElem = document.createElement('input');
    inputElem.classList.add('form-control', 'mb-3');
    inputElem.placeholder = "What else do you have to do?";
    let buttonElem = document.createElement('button');
    buttonElem.classList.add('btn', 'btn-primary');
    buttonElem.textContent = "Add task to list";
    formElem.appendChild(buttonElem);

    buttonElem.addEventListener('click', (event) => {
      event.preventDefault();

      let inputValue = inputElem.value;

      let whatToDo = this.submitCallback;
      whatToDo(inputValue);
    })

    return formElem;
  }
}


class App {
  constructor(newParentElement, newTaskList){
    this.parentElement = newParentElement;
    this.taskList = newTaskList;
  }

  render(){
    let listElem = this.taskList.render();
    this.parentElement.appendChild(listElem);

    let whoYouGonnaCall = (arg) => this.addTaskToList(arg); 
    let formObj = new NewTaskForm(whoYouGonnaCall);
    this.parentElement.appendChild(formObj.render());
  }

  addTaskToList(descrString){
    this.taskList.addTask(descrString);

    this.parentElement.innerHTML = '';
    this.render();
  }
}




//Make functions and variables available to tester. DO NOT MODIFY THIS.
if(typeof module !== 'undefined' && module.exports){
  /* eslint-disable */
  if(typeof Task !== 'undefined') 
    module.exports.Task = Task;
  if(typeof TaskList !== 'undefined') 
    module.exports.TaskList = TaskList;
  if(typeof NewTaskForm !== 'undefined') 
    module.exports.NewTaskForm = NewTaskForm;
  if(typeof App !== 'undefined') 
    module.exports.App = App;
}
