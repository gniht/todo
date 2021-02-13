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
const hideBtn = document.createElement('button');
hideBtn.id = 'hideBtn';
hideBtn.style.backgroundColor = 'white';
hideBtn.innerText = 'Show completed todos';
hideBtn.classList.add('split-left');
let hideCompleted = true;

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

let projectList;
if(localStorage.getItem('projectList') == null){   
  localStorage.setItem('projectList', JSON.stringify({"default project": []}));    
}
projectList = JSON.parse(localStorage.getItem('projectList'));
console.log(projectList);  

const optionsMenu = document.createElement('div');
optionsMenu.classList.add('top-center');
const projectSelect = document.createElement('div');
const projectSelectLabel = document.createElement('label');
projectSelectLabel.for = 'project-select';
projectSelectLabel.innerText = 'Select a project: ';
const projects = document.createElement('select');
projects.id = 'project-select';
updateProjectList();
//const defaultProject = document.createElement('option');
// defaultProject.value = '0'; is this value needed?
//efaultProject.innerText = 'default project';

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
//localStorage.setItem('user', JSON.stringify(user));
let todos, allProjects;
if(localStorage.getItem('allProjects') == null){ 
  localStorage.setItem('allProjects', JSON.stringify([[]]));
  todos = allProjects[projects.selectedIndex];
  todos.push(catfood);
  todos.push(myfood); 
}
allProjects = JSON.parse(localStorage.getItem('allProjects'));

console.log(allProjects);
todos = allProjects[projects.selectedIndex];



document.body.append(optionsMenu, myTodos, newTodoForm);

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
  localStorage.setItem('allProjects', JSON.stringify(allProjects));  
  updateList(todos);  
});

projects.addEventListener('click', e => {
  e.preventDefault();
  if(e.target.id == 'project-select'){
  todos = allProjects[projects.selectedIndex];
  updateList(todos);
  }
  e.stopPropagation();  
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
  let projectName = projectNameField.value;

  if(projectName){
    createProject(projectName);
    projectNameField.value = '';    
  }  
});

function createProject(name){
  projects.append(mkOption(name));
  //let optionArr = [];
  projectList[`${name}`] = [];
  //allProjects.push(optionArr);  
  localStorage.setItem('projectList', JSON.stringify(projectList));
  //console.log(localStorage.getItem(JSON.parse('projectList')));
  localStorage.setItem('allProjects', JSON.stringify(allProjects));
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
  console.log(typeof(index));
  if(index != null && typeof(index) == 'number'){
    completed.id = `${index}`;    
  }
  
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
  for(let i = 0; i < list.length; i++){
    let item = document.createElement('li');
        
    item.append(createTodoCard(list[i], i));
    if(list[i].checked == 'false' || hideCompleted == false){
        myTodos.append(item);                
      }      
    }
    myTodos.append(hideBtn);        
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
  // localStorage.setItem('user', JSON.stringify(user));

  // Then to retrieve it from the store and convert to an object again:
  
  // var user = JSON.parse(localStorage.getItem('user'));
  
  // If we need to delete all entries of the store we can simply do:
  
  //localStorage.clear();
