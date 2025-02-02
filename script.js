// SELECTORS
const taskInput = document.querySelector('.form-enter-task')
const taskAddButton = document.querySelector('.form-add-button')
const toDoListItems = document.querySelector('.task-tile-container')

//EVENT LISTENERS
taskAddButton.addEventListener('click', addToDoItem);

//FUNCTIONS
function addToDoItem(event){
    event.preventDefault();

    const addItemDiv = document.createElement('div');
    addItemDiv.classList.add('task-tile-conatiner');
    
    const addItemLi = document.createElement('li');
    addItemLi.innerText = 'New Task';
    addItemLi.classList.add('.task-tile-container')
    addItemDiv.appendChild(addItemLi);
    //Add checkbox
    const completedCheckBox = document.createElement('div');
    completedCheckBox.innerHTML =  '<input type="checkbox"></input>';
    addItemDiv.appendChild(completedCheckBox);
    
    const deleteItemButton = document.createElement('div');
    deleteItemButton.innerText =  'x';
    deleteItemButton.classList.add('task-tile-remove');
    addItemDiv.appendChild(deleteItemButton);

    toDoListItems.appendChild(addItemDiv);
};
