// SELECTORS
const taskInput = document.querySelector('.form-enter-task')
const taskAddButton = document.querySelector('.form-add-button')
const toDoListItems = document.querySelector('.task-tile-wrapper')

//EVENT LISTENERS
taskAddButton.addEventListener('click', addToDoItem);

//FUNCTIONS
function addToDoItem(event){
    event.preventDefault();

    const addItemDiv = document.createElement('div');
    addItemDiv.classList.add('task-tile-container');

    //Container for task text and category
    const taskAndCategoryContainer = document.createElement('div')
    taskAndCategoryContainer.classList.add('task-tile-text-container')
    addItemDiv.appendChild(taskAndCategoryContainer);
    
    //Add task category
    const addCatgeory = document.createElement('div');
    addCatgeory.innerText = 'Urgent';
    addCatgeory.classList.add('task-tile-category');
    taskAndCategoryContainer.appendChild(addCatgeory);
    
    //Add task text
    const addItem = document.createElement('div');
    addItem.innerText = 'Pay phone bill';
    addItem.classList.add('task-tile-entered-task')
    taskAndCategoryContainer.appendChild(addItem);

    
    
    //Add container for checkbox and delete button
    const doneAndDeleteContainer = document.createElement('div')
    doneAndDeleteContainer.classList.add('task-tile-checkbox-container');
    addItemDiv.appendChild(doneAndDeleteContainer);
    
    //Add checkbox
    const divCompleteCheckBox = document.createElement('div')
    divCompleteCheckBox.classList.add('task-tile-checkbox-done');
    const completedCheckBox = document.createElement('input');
    completedCheckBox.type = 'checkbox';
    divCompleteCheckBox.append(completedCheckBox);
    doneAndDeleteContainer.appendChild(divCompleteCheckBox);
    
    //Add Delete button
    const deleteItemButton = document.createElement('div');
    deleteItemButton.innerText =  'x';
    deleteItemButton.classList.add('task-tile-remove');
    doneAndDeleteContainer.appendChild(deleteItemButton);
    
    toDoListItems.appendChild(addItemDiv);

    
};
