(function () {
    class Task {
        constructor(taskGoal) {
            this.taskGoal = taskGoal || ''
            this.isCompleted = false
            this.isVisible = true
        }

        toggleCompleted() {
            this.isCompleted = !this.isCompleted
        }

        toggleVisible() {
            this.isVisible = !this.isVisible
        }
    }

    class ToDoApp {
        constructor(whereToRender) {
            this.whereToRender = whereToRender || document.body
            this.tasks = []

            this.init()
        }

        init() {
            this.loadDataFromLocalStorage()

            this.tasks.push(new Task('kupić mleko'))
            this.tasks.push(new Task('wypić mleko'))
            this.tasks.push(new Task('ugotować mleko'))
            this.tasks.push(new Task('posprzątać dom'))
            this.tasks.push(new Task('posprzątać garaż'))
            this.tasks.push(new Task('pozamiatać'))
            this.tasks.push(new Task('pozamiatać schody'))
            this.tasks.push(new Task('pouczyć się'))
            this.tasks.push(new Task('pouczyć się js'))
            this.tasks.push(new Task('naprawić radio'))
            this.tasks.push(new Task('odpocząć'))

            this.render()
        }

        render() {
            //prepare UI elements
            const appDiv = document.createElement('div')

            const addTaskInputField = document.createElement("input");
            addTaskInputField.setAttribute("type", "text");
            // addTaskInputField.style.width = '100%'
            const inputTaskButton = document.createElement('button')
            inputTaskButton.innerHTML = 'Dodaj'

            inputTaskButton.addEventListener('click', this.addTask.bind(this, addTaskInputField))

            const inputTaskDiv = document.createElement('div')
            inputTaskDiv.appendChild(addTaskInputField)
            inputTaskDiv.appendChild(inputTaskButton)
            appDiv.appendChild(inputTaskDiv)

            const findTaskInputField = document.createElement("input");
            findTaskInputField.setAttribute("type", "text");
            const findTaskButton = document.createElement('button')
            findTaskButton.innerHTML = 'Znajdź'

            const findTaskDiv = document.createElement('div')
            findTaskDiv.appendChild(findTaskInputField)
            findTaskDiv.appendChild(findTaskButton)
            appDiv.appendChild(findTaskDiv)

            const viewOptionsDiv = document.createElement('div')

            const showAllTasksButton = document.createElement('button')
            showAllTasksButton.innerHTML = 'Wszystkie'

            const showCompletedTasksButton = document.createElement('button')
            showCompletedTasksButton.innerHTML = 'Zakończone'

            const showNotCompletedTasksButton = document.createElement('button')
            showNotCompletedTasksButton.innerHTML = 'Nie zakończone'

            viewOptionsDiv.appendChild(showAllTasksButton)
            viewOptionsDiv.appendChild(showCompletedTasksButton)
            viewOptionsDiv.appendChild(showNotCompletedTasksButton)
            appDiv.appendChild(viewOptionsDiv)

            const listOfTaksDiv = document.createElement('div')
            const listOfTaksHeaderDiv = document.createElement('div')
            const listOfTaksHeader = document.createElement('h3')
            const listOfTaksHeaderTextNode = document.createTextNode('Zadania do zrobienia:')

            listOfTaksHeader.appendChild(listOfTaksHeaderTextNode)
            listOfTaksHeaderDiv.appendChild(listOfTaksHeader)
            listOfTaksDiv.appendChild(listOfTaksHeaderDiv)
            listOfTaksDiv.appendChild(listOfTaksHeaderDiv)

            const listOfTaksBodyDiv = document.createElement('div')
            listOfTaksDiv.appendChild(listOfTaksBodyDiv)
            appDiv.appendChild(listOfTaksDiv)

            // findTaskButton.addEventListener('click', this.findTask.bind(this, findTaskInputField.value, listOfTaksBodyDiv))
            showAllTasksButton.addEventListener('click', this.showAllTasks.bind(this, listOfTaksBodyDiv))
            showCompletedTasksButton.addEventListener('click', this.showCompletedTasks.bind(this, listOfTaksBodyDiv))
            showNotCompletedTasksButton.addEventListener('click', this.showNotCompletedTasks.bind(this, listOfTaksBodyDiv))
            this.showAllTasks(listOfTaksBodyDiv)

            this.whereToRender.innerHTML = ''
            this.whereToRender.appendChild(appDiv)
        }

        addTask(addTaskInputField) {
            this.tasks.push(new Task(addTaskInputField.value))

            this.saveDataToLocalStorage()
            this.render()
        }

        removeTask(taskIndex) {
            this.tasks.splice(taskIndex, 1);
            this.saveDataToLocalStorage()

            this.render()
        }

        findTask(task) {

        }

        saveDataToLocalStorage() {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }

        loadDataFromLocalStorage() {
            this.tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
        }

        showAllTasks(listOfTaksBodyDiv) {
            listOfTaksBodyDiv.innerHTML = ''
            // console.log('showall')
            const orderedList = document.createElement('ol')
            this.tasks.forEach((element, taskIndex) => {

                if (element.isVisible === true) {
                    const listElement = document.createElement('li')
                    listElement.innerText = `${element.taskGoal}  `

                    if (element.isCompleted === true) {
                        listElement.style.textDecoration = 'line-through'
                    }
                    else {
                        listElement.style.textDecoration = 'none'
                    }

                    listElement.addEventListener('click', (event) => {
                        event.stopPropagation()

                        element.toggleCompleted()
                        this.saveDataToLocalStorage()

                        this.render()
                    })

                    const deleteTaskButton = document.createElement('button')
                    deleteTaskButton.innerHTML = 'Usuń'
                    deleteTaskButton.addEventListener('click', this.removeTask.bind(this, taskIndex))
                    listElement.appendChild(deleteTaskButton)
                    orderedList.appendChild(listElement)
                }
            })
            listOfTaksBodyDiv.appendChild(orderedList)
        }

        showCompletedTasks(listOfTaksBodyDiv) {
            listOfTaksBodyDiv.innerHTML = ''

            const orderedList = document.createElement('ol')
            this.tasks.forEach((element, taskIndex) => {

                if (element.isCompleted === true) {
                    const listElement = document.createElement('li')
                    listElement.innerText = `${element.taskGoal}  `

                    if (element.isCompleted === true) {
                        listElement.style.textDecoration = 'line-through'
                    }
                    else {
                        listElement.style.textDecoration = 'none'
                    }

                    listElement.addEventListener('click', (event) => {
                        event.stopPropagation()

                        element.toggleCompleted()

                        this.render()
                    })

                    const deleteTaskButton = document.createElement('button')
                    deleteTaskButton.innerHTML = 'Usuń'
                    deleteTaskButton.addEventListener('click', this.removeTask.bind(this, taskIndex))
                    listElement.appendChild(deleteTaskButton)
                    orderedList.appendChild(listElement)
                }
            })
            listOfTaksBodyDiv.appendChild(orderedList)
        }

        showNotCompletedTasks(listOfTaksBodyDiv) {
            listOfTaksBodyDiv.innerHTML = ''

            const orderedList = document.createElement('ol')
            this.tasks.forEach((element, taskIndex) => {

                if (element.isCompleted === false) {
                    const listElement = document.createElement('li')
                    listElement.innerText = `${element.taskGoal}  `

                    if (element.isCompleted === true) {
                        listElement.style.textDecoration = 'line-through'
                    }
                    else {
                        listElement.style.textDecoration = 'none'
                    }

                    listElement.addEventListener('click', (event) => {
                        event.stopPropagation()

                        element.toggleCompleted()

                        this.render()
                    })

                    const deleteTaskButton = document.createElement('button')
                    deleteTaskButton.innerHTML = 'Usuń'
                    deleteTaskButton.addEventListener('click', this.removeTask.bind(this, taskIndex))
                    listElement.appendChild(deleteTaskButton)
                    orderedList.appendChild(listElement)
                }
            })
            listOfTaksBodyDiv.appendChild(orderedList)
        }

    }

    window.ToDoApp = ToDoApp
}())
const toDoApp = new ToDoApp()
