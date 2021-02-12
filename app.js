
import Todo from './todo.js';

let catfood = new Todo(
  'get catfood',
  'run to the store and get some food for the cat', 
  'Friday', 
  'imperative',
  'true'
);
let myfood = new Todo(
  'get groceries',
  'run to the store and get some food for me', 
  'Friday', 
  'imperative',
  'false'
);

const controlBtns = document.createElement('div'); 
let newTodoBtn = document.createElement('button');
newTodoBtn.id = 'newTodoBtn';
newTodoBtn.textContent = 'Create new todo';
const hideBtn = document.createElement('button');
hideBtn.innerText = 'Show completed todos';
controlBtns.classList.add('split-left');
controlBtns.style = "background-color: var(--main-background-color)";
let hideCompleted = true;
controlBtns.append(hideBtn);

const newProjectBtn = document.createElement('button');
newProjectBtn.innerText = 'Create new project';

//new todo form
const newTodoForm = document.createElement('form');
newTodoForm.classList.add('split-right');
const titleLabel = document.createElement('label');
titleLabel.innerText = 'Todo title: ';
titleLabel.for = 'titleInput';
const titleInput = document.createElement('input');
titleInput.id = 'titleInput';
titleInput.placeholder = 'Enter todo title...';
const descriptionLabel = document.createElement('label');
descriptionLabel.for = 'todoDescription';
descriptionLabel.innerText = 'Description: ';
const todoDescription = document.createElement('input');
todoDescription.id = 'todoDescription';
todoDescription.type = 'textarea';
todoDescription.placeholder = 'Todo description...';
const newTodoDueDateLabel = document.createElement('label');
newTodoDueDateLabel.innerText = 'Date due: '
newTodoDueDateLabel.for = 'newTodoDueDate';
const newTodoDueDate = document.createElement('input');
newTodoDueDate.type = 'text';
newTodoDueDate.id = 'newTodoDueDate';
newTodoDueDate.placeholder = 'Enter date due...';
const newTodoPriorityLabel = document.createElement('label');
newTodoPriorityLabel.for = 'newTodoPriority';
newTodoPriorityLabel.innerText = 'Priority:';
const newTodoPriority = document.createElement('input');
newTodoPriority.type = 'text';
newTodoPriority.id = 'newTodoPriority';
newTodoPriority.placeholder = 'Assign urgency...';
newTodoForm.append(titleLabel, 
  titleInput, 
  descriptionLabel, 
  todoDescription,
  newTodoDueDateLabel,
  newTodoDueDate,
  newTodoPriorityLabel,
  newTodoPriority,
  newTodoBtn
  );


const optionsMenu = document.createElement('div');
optionsMenu.classList.add('top-center');
const projectSelect = document.createElement('div');
const projectSelectLabel = document.createElement('label');
projectSelectLabel.for = 'project-select';
projectSelectLabel.innerText = 'Select a project: ';
const projects = document.createElement('select');
projects.id = 'project-select';
const defaultProject = document.createElement('option');
// defaultProject.value = '0'; is this value needed?
defaultProject.innerText = 'default project';
const newProjectNameField = document.createElement('div');
const newProjectNameLabel = document.createElement('label');
newProjectNameLabel.innerText = 'New Project name: ';
const projectNameField = document.createElement('input');
projectNameField.type = 'text';
projectNameField.placeholder = 'Enter project name...';
newProjectNameField.append(
  newProjectNameLabel, 
  projectNameField, 
  newProjectBtn);
projects.append(defaultProject);
projectSelect.append(projectSelectLabel, projects);
optionsMenu.append(projectSelect, newProjectNameField);



let myTodos = document.createElement('ol');
myTodos.classList.add('split-left');
let allProjects = [[]];
let todos = allProjects[projects.selectedIndex];

todos.push(catfood);
todos.push(myfood);
updateList(todos);
document.body.append(optionsMenu, myTodos, newTodoForm, controlBtns);


newTodoBtn.addEventListener('click', e => {
  //todo: add todo to current project

});

projects.addEventListener('click', e => {
  e.preventDefault();
  if(e.target.id == 'project-select'){
  todos = allProjects[projects.selectedIndex];
  updateList(todos);
  }  
});

hideBtn.addEventListener('click', e =>{
  e.preventDefault();  
  if(e.target.innerText == 'Hide completed todos'){
    hideCompleted = true;
    hideBtn.innerText = 'Show completed todos';    
    updateList(todos);    
  }else if(e.target.innerText = 'Show completed todos'){
    hideCompleted = false;
    hideBtn.innerText = 'Hide completed todos';    
    updateList(todos);
  }  
});

newProjectBtn.addEventListener('click', e => {
  e.preventDefault();
  let option = document.createElement("option");  
  let projectName = projectNameField.value;  
  if(projectName){
    option.innerText = projectName;
    projects.append(option);
    let optionArr = [];
    allProjects.push(optionArr);
    projectNameField.value = '';
    //console.log(allProjects);
  }  
});

function createTodoCard(todo){
  const card = document.createElement('div');
  card.classList.add('card');
  const title = document.createElement('h3');
  title.innerText = `Todo: ${todo.title}`;
  const description = document.createElement('p');
  description.innerText = `Description: ${todo.description}`;
  const dueDate = document.createElement('div');
  dueDate.innerText = `Due by: ${todo.dueDate}`;
  const priority = document.createElement('div');
  priority.innerText = `Priority: ${todo.priority}`;
  const completedLabel = document.createElement('label');
  completedLabel.for = `${todo.title}-completed`;
  completedLabel.innerText = 'Completed ';
  const completed = document.createElement('input');
  completed.type = 'checkbox';
  //completed.id = `${todo.title}-checked`;
  if(todo.checked == 'true'){
    completed.checked = true;
  }
  completed.id = `${todo.title}-completed`;    
  card.append(title, 
    description, 
    dueDate, 
    priority, 
    completedLabel, 
    completed);  
  return card;  
}

function updateList(list){
  //remove existing display of Todos
  while(myTodos.firstChild){
    myTodos.removeChild(myTodos.firstChild);
  }
  
  console.log(myTodos)//
  for(let i = 0; i < list.length; i++){
    let item = document.createElement('li');    
    item.append(createTodoCard(list[i]));
    if(list[i].checked == 'false' || hideCompleted == false){
        myTodos.append(item);
      }      
    }    
  }           

