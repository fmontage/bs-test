'use strict';

(function () {

    let todoData = [];
    const storage = window.localStorage;

    function saveData() {
        storage.setItem('todo', JSON.stringify(todoData));
    }

    function restoreData() {
        const data = storage.getItem('todo');
        return JSON.parse(data || '[]');
    }

    function changeLineThrough(target, flg) {
        if (flg) {
            target.style.textDecoration = 'line-through';
            target.className = 'check-color';
        } else {
            target.style.textDecoration = 'none';
            target.className = 'nocheck-color';
        }
    }

    function addList(data) {
        const textNode = document.createTextNode(data.value + "\t" + data.ymd);
        const checkboxNode = document.createElement('input');
        const li = document.createElement('li');
        const label = document.createElement('label');
        const div = document.createElement('div');
        const span = document.createElement('span');
        const deleteNode = document.createElement('div')



        label.className = 'label_style';
        div.className = 'div_style';
        checkboxNode.className = 'checkboxNode_style';
        deleteNode.className = 'deleteNode_style';


        checkboxNode.type = 'checkbox';
        checkboxNode.checked = data.done;
        changeLineThrough(li, data.done);
        checkboxNode.addEventListener('change', function () {
            changeLineThrough(li, this.checked);

            const selfData = todoData.find(function (elm) {
                return elm.timestamp === data.timestamp;
            });

            selfData.done = this.checked;

            saveData();
        });

        li.appendChild(label);
        label.appendChild(span);
        span.appendChild(textNode);
        label.appendChild(checkboxNode);
        label.appendChild(div);
        // li.appendChild(deleteNode);

        document.querySelector('.js-todoList').appendChild(li);



        const liTodo = document.querySelectorAll('.nocheck-color');


        setTimeout(addClass, 5000);
        setTimeout(addClassRed, 8000);


        function addClass() {
            liTodo.forEach((listTodo) => {
                listTodo.classList.add('orange');
            });
        }

        function addClassRed() {
            liTodo.forEach((listTodo) => {
                listTodo.classList.add('red');
            });
        }
    }


    todoData = restoreData();
    todoData.forEach(function (data) {
        addList(data);
    });

    document.querySelector('.js-addButton').addEventListener('click', function () {
        const value = document.querySelector('.js-inputText').value;
        const now = new Date();
        const timestamp = now.getTime();
        const month = now.getMonth() + 1;
        const hiniti = now.getDate();
        const ymd = "(" + month + "/" + hiniti + ")";


        const data = {
            value: value,
            done: false,
            timestamp: timestamp,
            ymd: ymd
        };



        addList(data);

        todoData.push(data);

        saveData();
    });

    // document.querySelectorAll('.deleteNode_style').forEach(function (delt) {
        
    // delt.addEventListener('click', function() {
    //   this.parentNode.remove();
    // });
    // });

})();
