// SELECTORS
const taskInput = document.querySelector('.form-enter-task')
const taskAddButton = document.querySelector('.form-add-button')
const toDoListItems = document.querySelector('.task-tile-wrapper')
const categoryInput = document.querySelector('.form-enter-category')
const categorySelect = document.querySelector('.form-select-category')
const categoryButtons = document.querySelector('.task-management-category-buttons');

//EVENT LISTENERS
taskAddButton.addEventListener('click', addToDoItem);
toDoListItems.addEventListener('click', deleteToDoItem);
categorySelect.addEventListener('change', hideDropDown)
categoryInput.addEventListener('blur', showDropDown)

//FUNCTIONS
function hideDropDown(event) {
    if (categorySelect.value === "new"){
        categorySelect.classList.add("hide");
        categoryInput.classList.remove("hide");
        categoryInput.value = "";
        categoryInput.focus();
    }
};
function showDropDown(event) {
    const categoryName = categoryInput.value.trim();

    if (categoryName === "") {
        categoryInput.classList.add("hide");
        categorySelect.classList.remove("hide");
        categorySelect.value = "";
    } else {
        addCategorytoDropDown(categoryName);
        categoryInput.classList.add("hide");
        categorySelect.classList.remove("hide");
        categorySelect.value = "";
        categoryInput.value = "";

    } 
};
function addCategorytoDropDown(categoryName) {
    const existingCategories = Array.from(categorySelect.options);
    const categoryExists = existingCategories.some(option => option.value === categoryName);

    if (!categoryExists) {
        const newCategory = document.createElement("option");
        newCategory.value = categoryName;
        newCategory.textContent = categoryName;
        categorySelect.appendChild(newCategory);
        
        categoryInput.value = "";
        categorySelect.value = "";
        categoryInput.classList.add("hide");
        categorySelect.classList.remove("hide");

        addCategoryButton(categoryName);
    } 
};

//Add category button
function addCategoryButton(categoryName) {
    const existingButtons = Array.from(categoryButtons.children);
    const categoryButtonExists = existingButtons.some(button => button.innerText === categoryName);

    if (!categoryButtonExists) {
        const newCategoryButton = document.createElement("li");
        newCategoryButton.classList.add("category-button");
        newCategoryButton.innerText = categoryName;
        categoryButtons.appendChild(newCategoryButton);

        newCategoryButton.addEventListener('click', () => filterTasks(categoryName));
    }
}


//Add task item function
function addToDoItem(event){
    event.preventDefault();

    if (taskInput.value.trim() === "") {
        return;
    }
    let selectedCategory = categorySelect.value;

    if (categorySelect.value === "new" && categoryInput.value.trim() !== "") {
        selectedCategory = categoryInput.value.trim();
        addCategorytoDropDown(selectedCategory);
    }

    //Add div task tile container
    const addItemDiv = document.createElement('div');
    addItemDiv.classList.add('task-tile-container');

    //Container for task text and category
    const taskAndCategoryContainer = document.createElement('div');
    taskAndCategoryContainer.classList.add('task-tile-text-container');
    addItemDiv.appendChild(taskAndCategoryContainer);
    
    //Add task category
    const addCatgeory = document.createElement('div');
    addCatgeory.innerText = selectedCategory || "Uncategorized";
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
    categoryInput.value = "";
    categorySelect.value = "";
    categoryInput.classList.add("hide");
    categorySelect.classList.remove("hide");
};

//MODAL AND DELETE TASK FUNCTION

//Modal variables
const deleteModal = document.querySelector('.modal-confirm-delete-task');
const confirmDeleteButton = document.querySelector('.modal-button.yes');
const cancelDeleteButton = document.querySelector('.modal-button.no');

//delete item function
function deleteToDoItem (event) {
    const deleteButton = event.target;
    if (deleteButton.classList.contains('task-tile-remove')) {
        taskToDelete = deleteButton.closest('.task-tile-container');
        deleteModal.style.display = 'flex';
    }
};

confirmDeleteButton.addEventListener('click', function (){
    if (taskToDelete) {
        taskToDelete.remove();   
    }
    deleteModal.style.display = 'none';
});

cancelDeleteButton.addEventListener('click', function () {
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

function filterTasks(categoryName){

    let allTasks = document.querySelectorAll('.task-tile-container');
    
    allTasks.forEach(task => {
        let tileCategory = task.querySelector('.task-tile-category');
     
    let showAllButton = document.querySelector('.category-button.all');
    showAllButton.addEventListener('click', function () {
        task.style.display = "flex";
    })
 
        if (tileCategory && tileCategory.innerHTML === categoryName) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    })
}


//Get Dates
const weekday = ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
getDate = new Date();
let day = weekday[getDate.getDay()];

let date = String(getDate.getDate()).padStart(2, '0');
let month = String(getDate.getMonth() + 1).padStart(2, '0');
let year = String(getDate.getFullYear());

let formattedDate = `${day} | ${date}.${month}.${year}`;

document.getElementById('currentDate').innerHTML = formattedDate;

