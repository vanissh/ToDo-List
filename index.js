'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

    let todoData = [];

    todoData = localStorage.getItem('items')? JSON.parse(localStorage.getItem('items')):[];
    localStorage.setItem('items', JSON.stringify(todoData));
    todoData = JSON.parse(localStorage.getItem('items'));

    const render = function(){
        todoList.textContent = '';
        todoCompleted.textContent = '';
        
        todoData.forEach(function(item){
            const li = document.createElement('li');
            li.classList.add('todo-item');
            
            li.innerHTML = '<span class="text-todo">'+ item.value +'</span>' +
            '<div class="todo-buttons">' +
                '<button class="todo-remove"></button>' +
                '<button class="todo-complete"></button>' +
            '</div>';

            if(item.completed){
                todoCompleted.prepend(li);
            } else {
                todoList.prepend(li);
            }
            
            const btnTodoComplete = li.querySelector('.todo-complete');
            btnTodoComplete.addEventListener('click', function(){
                item.completed = !item.completed;
                localStorage.setItem('items', JSON.stringify(todoData));
                render();
            });

            const btnTodoRemove = li.querySelector('.todo-remove');
            btnTodoRemove.addEventListener('click', function(){
                let index = todoData.indexOf(item);
                todoData.splice(index, 1);
                localStorage.setItem('items', JSON.stringify(todoData));
                render();

            });
        });
    };

    todoControl.addEventListener('submit', function(event){
        event.preventDefault();

        const newTodo = {
            value: headerInput.value,
            completed: false,
        };
        if(newTodo.value !== ''){
            todoData.push(newTodo);
        }
        localStorage.setItem('items', JSON.stringify(todoData));
        headerInput.value = '';
        
        render();
    });

    render();