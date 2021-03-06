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
    }

    class ToDoApp {
        constructor(whereToRender) {
            this.whereToRender = whereToRender || document.body
            this.tasks = []

            this.init()
        }

        init() {
            this.loadDataFromLocalStorage()

            // this.tasks.push(new Task('kupić mlEko'))
            // this.tasks.push(new Task('wypić mleko'))
            // this.tasks.push(new Task('ugotować Mleko'))
            // this.tasks.push(new Task('posprzątać dom'))
            // this.tasks.push(new Task('posprZątać gAraż'))
            // this.tasks.push(new Task('pozamiatać'))
            // this.tasks.push(new Task('PozamiAtać sChody'))
            // this.tasks.push(new Task('pouczyć się'))
            // this.tasks.push(new Task('pouczyć się js'))
            // this.tasks.push(new Task('naprawić radio'))
            // this.tasks.push(new Task('odpocząć'))

            this.render()
        }

        renderUI() {
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

            this.listOfTaksBodyDiv = document.createElement('div')
            listOfTaksDiv.appendChild(this.listOfTaksBodyDiv)
            appDiv.appendChild(listOfTaksDiv)

            findTaskButton.addEventListener('click', this.findTask.bind(this, findTaskInputField))
            showAllTasksButton.addEventListener('click', this.showAllTasks.bind(this))
            showCompletedTasksButton.addEventListener('click', this.showCompletedTasks.bind(this))
            showNotCompletedTasksButton.addEventListener('click', this.showNotCompletedTasks.bind(this))

            this.whereToRender.innerHTML = ''
            this.whereToRender.appendChild(appDiv)
        }

        render(tasksToRender) {
            this.renderUI()

            const tasks = tasksToRender || this.tasks

            this.listOfTaksBodyDiv.innerHTML = ''

            const orderedList = document.createElement('ol')
            tasks.forEach((element, taskIndex) => {

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
            this.listOfTaksBodyDiv.appendChild(orderedList)
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

        saveDataToLocalStorage() {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
        }

        loadDataFromLocalStorage() {
            const dummyTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
            this.tasks = dummyTasks.map(task => Object.assign(Object.create(Task.prototype), task))
        }

        findTask(findTaskInputField) {

            let regToFind = new RegExp(findTaskInputField.value.toLowerCase().replace(/ /g, ''))

            const completedTasksArray = this.tasks.filter((element) => {
                let taskGoal = element.taskGoal.toLowerCase().replace(/ /g, '')
                if (taskGoal.search(regToFind) > -1) return element
            })
            this.render(completedTasksArray)
        }

        showAllTasks() {
            this.render()
        }

        showCompletedTasks() {
            const completedTasksArray = this.tasks.filter((element) => {
                if (element.isCompleted) return element
            })
            this.render(completedTasksArray)
        }

        showNotCompletedTasks() {
            const notCompletedTasksArray = this.tasks.filter((element) => {
                if (!element.isCompleted) return element
            })
            this.render(notCompletedTasksArray)
        }

    }

    window.ToDoApp = ToDoApp
}())
const toDoApp = new ToDoApp()
