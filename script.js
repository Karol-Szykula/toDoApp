'use strict'

class Task {
    constructor(taskGoal) {
        this.taskGoal = taskGoal || ''
        this.isCompleted = false
    }
}

class ToDoApp {
    constructor(whereToRender) {
        this.whereToRender = whereToRender || document.body
        this.tasks = []


        this.init()
    }

    init() {

        this.render()
    }

    render() {
        //render UI
        const appDiv = document.createElement('div')

        const addTaskInputField = document.createElement("INPUT");
        addTaskInputField.setAttribute("type", "text");

        const inputTaskButton = document.createElement('button')
        inputTaskButton.innerHTML = 'Dodaj'

        const inputTaskDiv = document.createElement('div')
        inputTaskDiv.appendChild(addTaskInputField)
        inputTaskDiv.appendChild(inputTaskButton)
        appDiv.appendChild(inputTaskDiv)

        // fill UI with data




        this.whereToRender.appendChild(appDiv)
    }

    addTask() {

    }

    removeTask() {

    }

    markTaskCompleted() {

    }

    findTask() {

    }

    saveDataToLocalStorage() {

    }

    loadDataToLocalStorage() {

    }

    showAllTasks() {

    }

    showCompletedTasks() {

    }

    showNotCompletedTasks() {

    }

}




const toDoApp = new ToDoApp()
