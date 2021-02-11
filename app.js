
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

const hideBtn = document.createElement('button');
hideBtn.innerText = 'Show completed todos';
hideBtn.classList.add('split-left');
let hideCompleted = false;

const newProjectBtn = document.createElement('button');
newProjectBtn.innerText = 'Create new project';

const optionsMenu = document.createElement('div');
optionsMenu.classList.add('top-center');
const projectSelect = document.createElement('div');
const projectSelectLabel = document.createElement('label');
projectSelectLabel.for = 'project-select';
projectSelectLabel.innerText = 'Select a project: ';
const projects = document.createElement('select');
projects.id = 'project-select';
const defaultProject = document.createElement('option');
// defaultProject.value = '0'; this value not needed?
defaultProject.innerText = 'default project';
projects.append(defaultProject);
projectSelect.append(projectSelectLabel, projects);
optionsMenu.append(newProjectBtn, projectSelect);


const myTodos = document.createElement('ol');
myTodos.classList.add('split-left');
let allProjects = [[]];
const todos = allProjects[projects.selectedIndex];
todos.push(catfood);
todos.push(myfood);
updateList(todos);
document.body.append(optionsMenu, myTodos, hideBtn);

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
  for(let i = 0; i < list.length; i++){
    let item = document.createElement('li');    
    item.append(createTodoCard(list[i]));
    myTodos.append(item);        
  }
}

hideBtn.addEventListener('click', e =>{
  e.preventDefault();  
  if(e.target.innerText == 'Hide completed todos'){
    hideCompleted = true;
    hideBtn.innerText = 'Show completed todos';
  }else if(e.target.innerText = 'Show completed todos'){
    hideCompleted = false;
    hideBtn.innerText = 'Hide completed todos';
  }
  // updateList(listFromProject)
});
newProjectBtn.addEventListener('click', e => {
  e.preventDefault();
  let option = document.createElement("option");  
  let projectName = prompt('enter a project name');  
  if(projectName){
    option.innerText = projectName;
    projects.append(option);
    let optionArr = [];
    allProjects.push(optionArr);
    console.log(allProjects);
  }  
});