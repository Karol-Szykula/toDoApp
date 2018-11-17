'use strict'

class Task {
    constructor(taskGoal) {
        this.taskGoal = taskGoal
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

    }

    render() {

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

console.log(toDoApp.whereToRender)