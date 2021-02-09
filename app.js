
import Todo from './todo.js';

let catfood = new Todo(
  'get catfood',
  'run to the store and get some food for the cat', 
  'Friday', 
  'imperative'
);
let myfood = new Todo(
  'get groceries',
  'run to the store and get some food for me', 
  'Friday', 
  'imperative'
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
defaultProject.value = 'default';
defaultProject.innerText = 'default project';
projects.append(defaultProject);
projectSelect.append(projectSelectLabel, projects);
optionsMenu.append(projectSelect);




const myTodos = document.createElement('ol');
const todos = [];
todos.push(catfood);
todos.push(myfood);
updateList(todos);
document.body.append(optionsMenu, myTodos);

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
    console.log(myTodos);    
  }
}
