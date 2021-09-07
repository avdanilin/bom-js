/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузерe и таблиц добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если да бавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */

document.addEventListener('DOMContentLoaded', function () {
    let homeworkContainer = document.querySelector('#homework-container');
    let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
    let addNameInput = homeworkContainer.querySelector('#add-name-input');
    let addValueInput = homeworkContainer.querySelector('#add-value-input');
    let addButton = homeworkContainer.querySelector('#add-button');
    let listTable = homeworkContainer.querySelector('#list-table tbody');

    const removeButtonCookie = document.querySelector('.cookie_remove');

    filterNameInput.addEventListener('keyup', function () {
    });

    document.addEventListener('click', removeCookie);
    addButton.addEventListener('click', addCookie);


    function addCookie() {
        const getCookieName = addNameInput.value;
        const getCookieValue = addValueInput.value;

        const tr = document.createElement('tr');
        const removeButton = document.createElement('button');

        removeButton.classList.add('cookie_remove');
        removeButton.textContent = 'Удалить куку';

        document.cookie = `${getCookieName}=${getCookieValue};`;

        const exist = existCookie();

        if (!exist) {
            tr.insertAdjacentHTML("afterbegin", `<td class="name">${getCookieName}</td><td>${getCookieValue}</td><td>${removeButton.outerHTML}</td>`);

            listTable.append(tr);
        }
    }


    function removeCookie(e) {
        if (e.target.classList.contains('cookie_remove')) {
            const targetParent = e.target.parentElement.parentElement;

            for (let i = 0; i < targetParent.children.length; i++) {
                const cookieName = targetParent.children[i];

                if (cookieName.classList.contains('name')) {

                    const removedCookie = cookieName.textContent;
                    document.cookie = `${removedCookie}=;expires=${new Date(0)}`;
                }
            }

            targetParent.remove();
        }
    }

    function existCookie() {
        let flag = false;
        const currentCookies = listTable.querySelectorAll('.name');

        currentCookies.forEach(currentCookie => {
            if (currentCookie.textContent === addNameInput.value) {
                flag = true;
            }
        });

        return flag;
    }
})

