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
            target.className = 'check-color';
        } else {
            target.style.textDecoration = 'none';
            target.className = 'nocheck-color';
        }
    }

    function addList(data) {
        const textNode = document.createTextNode(data.value + "\t" + data.ymd);
        const checkboxNode = document.createElement('input');
        const label = document.createElement('label');

        checkboxNode.type = 'checkbox';
        checkboxNode.checked = data.done;
        changeLineThrough(label, data.done);
        checkboxNode.addEventListener('change', function () {
            changeLineThrough(label, this.checked);

            const selfData = todoData.find(function (elm) {
                return elm.timestamp === data.timestamp;
            });

            selfData.done = this.checked;

            saveData();
        });

        label.appendChild(checkboxNode);
        label.appendChild(textNode);

        document.querySelector('.js-todoList').appendChild(label);
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
