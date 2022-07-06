(function() {
    //Создаем и возвращаем заголовок приложения
    function createAppTitle(title) {
        let appTitle = document.createElement('h2');
        appTitle.textContent = title;
        return appTitle;
    }

    //Создаем и возвращаем форму для создания дела
    function createTodoItemForm () {
        let form = document.createElement('form');
        let input = document.createElement('input');
        let buttonWrapper = document.createElement('div');
        let button = document.createElement('button');

        form.classList.add('input-group', 'mb-3');
        input.classList.add('form-control');
        input.placeholder = 'Введите название нового дела';
        buttonWrapper.classList.add('input-group-append');
        button.classList.add('btn', 'btn-primary');
        button.textContent = 'Добавить дело';

        buttonWrapper.append(button);
        form.append(input);
        form.append(buttonWrapper);

        return {
            form,
            input,
            button,
        };
    }

    //Создаем и возвращаем список элементов
    function createTodoList () {
        let list = document.createElement('ul');
        list.classList.add('list-group');
        return list;
    };

    let todoItemForm = createTodoItemForm();


    function createTodoItem(name, key)  {
        let item = document.createElement('li');
        let buttonGroup = document.createElement('div');
        let doneButton = document.createElement('button');
        let deleteButton = document.createElement('button');
        let todoItems = JSON.parse(localStorage.getItem(key));
        let todoItem = {    name: todoItemForm.input.value,
                            done: true,
                        };
        todoItems.push(todoItem);
        localStorage.setItem(key, JSON.stringify(todoItems));
        item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'alighn-items-center');
        item.textContent = name;


        buttonGroup.classList.add('btn-group', 'btn-group-sm');
        doneButton.classList.add('btn', 'btn-success');
        doneButton.textContent = 'Готово';
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Удалить';

        buttonGroup.append(doneButton);
        buttonGroup.append(deleteButton);
        item.append(buttonGroup);

        return {
            item,
            doneButton,
            deleteButton,
        };
    };

    function createTodoApp(container, title = 'Список дел', key, todoObjects) {
        let todoAppTitle = createAppTitle(title);
        let todoList = createTodoList();

        container.append(todoAppTitle);
        container.append(todoItemForm.form);
        container.append(todoList);

        todoItemForm.form.addEventListener('submit', function(e) {
            //эта строчка необходима, чтобы предотвратить стандартное действие браузера
            // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
            e.preventDefault();
             // игнорируем создание элемента, если пользователь ничего не ввел в поле
            if (!todoItemForm.input.value) {
                return;
            }

            let todoItem  = createTodoItem(todoItemForm.input.value, key);

            // создаем и добавляем в список новое дело с названием из поля для ввода
            todoList.append(todoItem.item);

            //обнуляем значение в поле, чтоб не пришлось стирать его вручную
            todoItemForm.input.value = '';
        });

        if(localStorage.getItem(key) !== null) {
            todoObjects = JSON.parse(localStorage.getItem(key));
            console.log(todoObjects);
            for (let i = 0; i < todoObjects.length; i++) {
              let values = Object.values(todoObjects[i]);
              let todoItem  = createTodoItem(todoObjects[i].name, key);
              if(todoObjects[i].done == false) {
                todoItem.item.classList.add('list-group-item-success');
            }
              todoList.append(todoItem.item);

              //Добавляем обработчики на кнопки
              todoItem.deleteButton.addEventListener('click', function() {
                if (confirm('Вы уверены?')) {
                  for (let value of values) {
                    if(typeof(value) === 'string') {
                      let find = todoObjects.findIndex(item => item.name == value);
                      todoObjects.splice(find, 1);
                      localStorage.setItem(key, JSON.stringify(todoObjects))
                    }
                  }
                  todoItem.item.remove();
                }
              });
              todoItem.doneButton.addEventListener('click', function() {
                todoItem.item.classList.toggle('list-group-item-success');
                for (let value of values) {
                    let find = todoObjects.find(item => item.name == value);
                    switch(find.done !== false) {
                        case(true):
                        find.done = false;
                        break
                        default: find.done = true
                    }
                    localStorage.setItem(key, JSON.stringify(todoObjects))
                    console.log(find);
                }
                console.log(todoObjects);

            });
            }
          }

          localStorage.setItem(key, JSON.stringify(todoObjects))

         //браузер создает событие submit на форме по нажатию Enter или на кнопку создания дела
         todoItemForm.form.addEventListener('submit', function(e) {
            //эта строчка необходима, чтобы предотвратить стандартное действие браузера
            // в данном случае мы не хотим, чтобы страница перезагружалась при отправке формы
            e.preventDefault();
             // игнорируем создание элемента, если пользователь ничего не ввел в поле
            if (!todoItemForm.input.value) {
                return;
            }

            let todoItem  = createTodoItem(todoItemForm.input.value, key);

            // создаем и добавляем в список новое дело с названием из поля для ввода
            todoList.append(todoItem.item);

            //обнуляем значение в поле, чтоб не пришлось стирать его вручную
            todoItemForm.input.value = '';
        });

        if (!todoItemForm.input.value) {
            todoItemForm.button.value = 'disabled';
        }
    }
    window.createTodoApp = createTodoApp;
})();
