const todoArray = JSON.parse(localStorage.getItem('localTodo')) || []

        displayTodoList()

        document.querySelector('.js-add-button').addEventListener('click', () => {
            addTodoItem();
        })

        function addTodoItem(){
            const inputElementItem = document.querySelector('.js-todo')
            const inputElementDate = document.querySelector('.js-todo-date')
            const inputValueItem = inputElementItem.value
            const inputValueDate = inputElementDate.value

            let item = {
                itemName: inputValueItem, 
                dueDate: inputValueDate
            };

            todoArray.push(item)

            inputElementItem.value = ""
            inputElementDate.value = ""

            updateStorage()
            displayTodoList()
        }

        function delTodoItem(index) {
            todoArray.splice(index, 1)
        }

        function updateStorage() {
            localStorage.setItem('localTodo', JSON.stringify(todoArray))
        }

        function displayTodoList() {
            const sectionElement = document.querySelector('.js-todo-display')

            let todoHTML = ``;

            todoArray.forEach((element, index) => {
                const { itemName, dueDate } = element
                const p = `
                <div>${index+1}</div>
                <div>${itemName}</div>
                <div>${dueDate}</div>
                <button class="js-del-button">Delete</button>
                `
                todoHTML += p
            });

            sectionElement.innerHTML = todoHTML

            document.querySelectorAll('.js-del-button').forEach((button, index) => {
                button.addEventListener('click', () => {
                    delTodoItem(index); 
                    displayTodoList(); 
                    updateStorage();
                })
            })
        }