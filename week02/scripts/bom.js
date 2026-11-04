const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('#chapterList');

button.addEventListener('click', () => {
    const chapter = input.value.trim();

    if (!chapter) {
        input.focus();
        return;
    }

    const item = document.createElement('li');
    item.textContent = chapter;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '❌';
    deleteButton.className = 'delete-btn';
    deleteButton.addEventListener('click', () => {
        item.remove();
    });

    item.appendChild(deleteButton);
    list.appendChild(item);
    input.value = '';
    input.focus();
});
