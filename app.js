import Todo from './todo.js';


//examples for default project
let catfood = new Todo(
  'get catfood',
  'run to the store and get some food for the cat', 
  'Friday', 
  'imperative',
  'false'
);
let myfood = new Todo(
  'get groceries',
  'run to the store and get some food for me', 
  'Friday', 
  'imperative',
  'true'
);

//localStorage.clear();

let newTodoBtn = document.createElement('button');
newTodoBtn.id = 'newTodoBtn';
newTodoBtn.textContent = 'Create new todo';
const controlBtns = document.createElement('div');
controlBtns.classList.add('split-left');
controlBtns.id = 'controlBtns';
const deleteCompletedTodos = document.createElement('button');
deleteCompletedTodos.textContent = 'Delete completed todos';
deleteCompletedTodos.classList.add('split-left');
deleteCompletedTodos.style.backgroundColor = 'pink';
const hideBtn = document.createElement('button');
hideBtn.id = 'hideBtn';
hideBtn.style.backgroundColor = 'lightblue';
hideBtn.innerText = 'Show completed todos';
hideBtn.classList.add('split-left');
let hideCompleted = true;
controlBtns.append(hideBtn, deleteCompletedTodos);

const newProjectBtn = document.createElement('button');
newProjectBtn.innerText = 'Create new project';

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

let projectList;
if(localStorage.getItem('projectList') == null){   
  localStorage.setItem('projectList', JSON.stringify({"default project": []}));    
}
projectList = JSON.parse(localStorage.getItem('projectList')); 

const optionsMenu = document.createElement('div');
optionsMenu.classList.add('top-center');
const projectSelect = document.createElement('div');
const projectSelectLabel = document.createElement('label');
projectSelectLabel.for = 'project-select';
projectSelectLabel.innerText = 'Select a project: ';
const projects = document.createElement('select');
projects.id = 'project-select';
updateProjectList();

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
projects.append();
projectSelect.append(projectSelectLabel, projects);
optionsMenu.append(projectSelect, newProjectNameField);

let myTodos = document.createElement('ol');
myTodos.classList.add('split-left');

document.body.append(optionsMenu, myTodos, newTodoForm);

let todos;

newTodoBtn.addEventListener('click', e => {
  e.preventDefault();
  e.stopPropagation();
  //todo: add todo to current project
  if(titleInput.value &&
    todoDescription.value &&
    newTodoDueDate.value &&
    newTodoPriority.value){
      todos.push(new Todo(
        titleInput.value,
        todoDescription.value,
        newTodoDueDate.value,
        newTodoPriority.value      
      ));
    newTodoForm.reset();        
  }else{
    alert("you must complete all fields to create a new todo!");
  }
  localStorage.setItem('projectList', JSON.stringify(projectList));  
  updateList(todos);  
});

projects.addEventListener('click', e => {
  e.preventDefault();
  if(e.target.id == 'project-select'){
  todos = projectList[e.target.children[projects.selectedIndex].textContent];  
  updateList(todos);
  }
  e.stopPropagation();  
});

hideBtn.addEventListener('click', e =>{
  e.preventDefault();
  e.stopPropagation();  
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

myTodos.addEventListener('click', e => {
  if(e.target.type == 'checkbox'){
    let chkIndex = '';  
    chkIndex = parseInt(e.target.id);
    
  if(typeof(chkIndex) == 'number' && todos[chkIndex].checked === 'true'){
    todos[chkIndex].checked = 'false';
  }else{
    todos[chkIndex].checked = 'true';
  }
  localStorage.setItem('projectList', JSON.stringify(projectList));
  updateProjectList();
  updateList(todos);
  }
});

newProjectBtn.addEventListener('click', e => {
  e.preventDefault();    
  let projectName = projectNameField.value;

  if(projectName){
    createProject(projectName);
    projectNameField.value = '';    
  }  
});

deleteCompletedTodos.addEventListener('click', e => {
  e.preventDefault();  
  
  let verify = prompt("Enter 'Y' or 'Yes' to delete all completed todos");
  if(verify == 'yes' || 'Yes' || 'YES' || 'Y' || 'y'){
    for(let i = todos.length-1; i >= 0; i--){
      if(todos[i].checked == 'true'){        
        todos.splice( i, 1);                
      }
      updateList(todos);
      localStorage.setItem('projectList', JSON.stringify(projectList));
    }      
  }
});

function createProject(name){
  projects.append(mkOption(name));  
  projectList[`${name}`] = [];   
  localStorage.setItem('projectList', JSON.stringify(projectList));
}

function createTodoCard(todo, index = null){
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
  if(index != null){
    completed.id = `${index}`;    
  }  
  if(todo.checked == 'true'){
    completed.checked = 'true';
  }      
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
  for(let i = 0; i < list.length; i++){
    let item = document.createElement('li');
        
    item.append(createTodoCard(list[i], i));
    if(list[i].checked == 'false' || hideCompleted == false){
        myTodos.append(item);                
      }      
    }

    myTodos.append(controlBtns);        
  }
  
  function mkOption(content){
    if(content){
      let opt = document.createElement('option');
      opt.textContent = content;
      return opt; 
    }  
    return -1;
  }
  function updateProjectList(){
    while(projects.firstChild){
      projects.removeChild(projects.firstChild);
    } 
    for(let proj in projectList){
      projects.append(mkOption(`${proj}`));
    }
  }