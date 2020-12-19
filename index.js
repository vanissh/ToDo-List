'use strict';

class Todo {
    constructor (form, input, todoList, todoCompleted) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoList = document.querySelector(todoList);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
        this.todoContainer = document.querySelector('.todo-container');

    }

    addToStorage(){
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    generateKey(){
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    render(){
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem.bind(this));
        this.addToStorage();
    }

    createItem(todo){
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.insertAdjacentHTML('beforeend', 
                `<span class="text-todo">${todo.value}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
                    <button class="todo-complete"></button>
                </div>`);
        li.id =`${todo.key}`;

        if(todo.completed){
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(e){
        e.preventDefault();

        if(this.input.value.trim()=== ''){
            this.input.placeholder = 'Нельзя добавить пустое дело!';
            this.input.classList.remove('header-input');
            this.input.classList.add('header-input-error');

            const changeClass = () => {
                this.input.classList.add('header-input');
                this.input.classList.remove('header-input-error');  
            };

            setTimeout(changeClass, 400);
        } else {

            this.input.placeholder = 'Какие планы?';
            const newTodo = {
                value: this.input.value,
                completed: false, 
                key: this.generateKey(),
            };

            this.todoData.set(newTodo.key, newTodo);
            this.render();
            this.input.value = '';
        }
        
    }

    deleteItem(item){
        this.todoData.forEach((value, key)=> {
            if(item.id === key){
                this.todoData.delete(key);
            }
            this.render();
        });
    }

    completedItem(item){
        this.todoData.forEach((value, key)=> {
            if(item.id === key){
                value.completed = !value.completed;
            }
            this.render();
        });
    }
    
    handler(){
        this.todoContainer.addEventListener('click', (event) => {
            let target = event.target;

            if(target.matches('.todo-remove')){
                let item = target.closest('.todo-item');
                this.deleteItem(item);
            }

            if(target.matches('.todo-complete')){
                let item = target.closest('.todo-item');
                this.completedItem(item);
            }
        });
    }

    init(){
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.handler();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');

todo.init();
