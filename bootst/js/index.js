'use strict';

(function () {

    var todoData = [];
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
        } else {
            target.style.textDecoration = 'none';
        }
    }

    function addList(data) {
        const textNode = document.createTextNode(data.value + data.ymd);
        const checkboxNode = document.createElement('input');
        const li = document.createElement('li');

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

        li.appendChild(checkboxNode);
        li.appendChild(textNode);

        document.querySelector('.js-todoList').appendChild(li);
    }


    todoData = restoreData();
    todoData.forEach(function (data) {
        addList(data);
    });

    document.querySelector('.js-addButton').addEventListener('click', function () {
        const value = document.querySelector('.js-inputText').value;
        const now = new Date();
        const timestamp = now.getTime();
        const month = now.getMonth()+1;
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

})();
