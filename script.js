// SELECTORS
const taskInput = document.querySelector('.form-enter-task')
const taskAddButton = document.querySelector('.form-add-button')
const toDoListItems = document.querySelector('.task-tile-wrapper')

//EVENT LISTENERS
taskAddButton.addEventListener('click', addToDoItem);
toDoListItems.addEventListener('click', deleteToDoItem);

//FUNCTIONS

//Add item task
function addToDoItem(event){
    event.preventDefault();

    if (taskInput.value.trim() === "") {
        return;
    }

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
    addItem.innerText = taskInput.value;
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
    deleteItemButton.addEventListener('click', deleteToDoItem);
    
    toDoListItems.appendChild(addItemDiv);

    taskInput.value="";
};

//Modal
const deleteModal = document.querySelector('.modal-confirm-delete-task');
const confirmDeleteButton = document.querySelector('.modal-button.yes');
const cancelDeleteButton = document.querySelector('.modal-button.no');
//let taskToDelete = "";

//delete item function
function deleteToDoItem (event) {
    const deleteButton = event.target;
    if (deleteButton.classList.contains('task-tile-remove')) {
        taskToDelete = deleteButton.closest('.task-tile-container');
        deleteModal.style.display = 'flex';
    }
};

confirmDeleteButton.addEventListener('click', function ()
{
    if (taskToDelete) {
        taskToDelete.remove();   
    }
    deleteModal.style.display = 'none';
});

cancelDeleteButton.addEventListener('click', function () 
{
    deleteModal.style.display = 'none';

});

toDoListItems.addEventListener('change', function(event) {
    if (event.target.type === 'checkbox') {
        const taskContainer = event.target.closest('.task-tile-container');
        const inputText = taskContainer.querySelector('.task-tile-entered-task');
        if (event.target.checked) {
            taskContainer.style.opacity = "0.5";
            inputText.style.textDecoration = "line-through";
        }
        else {
            taskContainer.style.opacity = "1";
            inputText.style.textDecoration = "none";
        }
    }
})