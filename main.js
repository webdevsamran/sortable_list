const draggableList = document.getElementById('draggable-list');
const check = document.getElementById('check');

const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffet',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

// Store listItems
const listItems = [];

let dragStartIndex;

createList();

const numbers = [1, 3, 110, 40, 302];


// Insert list items into DOM
function createList() {
    [...richestPeople]
    .map(a => ({
            value: a,
            sort: Math.random()
        }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', index);
            listItem.innerHTML = `
            <span class="number">${index+1}</span>
            <div class="draggable" draggable="true">
                <p class="person-name">${person}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
        `;

            listItems.push(listItem);
            draggableList.appendChild(listItem);
        });

    addEventListeners();
}

function dragStart() {
    // console.log('Event: ', 'dragStart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
    // console.log('DragStart: ', dragStartIndex);
}

function dragEnter() {
    // console.log('Event: ', 'dragEnter');
    this.classList.add('over');
}

function dragLeave() {
    // console.log('Event: ', 'dragLeave');
    this.classList.remove('over');
}

function dragOver(e) {
    // console.log('Event: ', 'dragOver');
    e.preventDefault();
}

function dragDrop() {
    // console.log('Event: ', 'dragDrop');
    const dragEndIndex = +this.getAttribute('data-index');
    // console.log('DragEndIndex: ', dragEndIndex);
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove('over');

}

function swapItems(fromIndex, toIndex) {
    // console.log(fromIndex, toIndex)
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
    // console.log(itemOne, itemTwo);
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();
        if (personName !== richestPeople[index]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });
    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}
check.addEventListener('click', checkOrder);