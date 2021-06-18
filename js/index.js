const form = document.querySelector('form');
const inputTask = document.querySelector('.inputTask');
const allTasks = document.querySelector('.task-collection');
const clrAllTask = document.querySelector('.clrTask');
const filterTaskInput = document.querySelector('.filterTask');
//load all event listeners


loadAllEventListeners()
function loadAllEventListeners(){
    document.addEventListener('DOMContentLoaded',getTasks)
    form.addEventListener('submit',addTask)
    allTasks.addEventListener('click',removeTask)
    clrAllTask.addEventListener('click',removeAllTask)
    filterTaskInput.addEventListener('keyup',filterTasks)
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        li = document.createElement('li');
    li.className = 'task';
    li.appendChild(document.createTextNode(task))
    i = document.createElement('i');
    i.className = 'fas fa-minus-circle';
    li.appendChild(i)
    allTasks.appendChild(li)
    })
}


//add task

function addTask(e){
    if(inputTask.value===''){
        alert("enter your task")
    }
    li = document.createElement('li');
    li.className = 'task';
    li.appendChild(document.createTextNode(inputTask.value))
    i = document.createElement('i');
    i.className = 'fas fa-minus-circle';
    li.appendChild(i)
    allTasks.appendChild(li)
    storeTaskLS(inputTask.value)
    inputTask.value ='';
    e.preventDefault()
}
//store in local storage
function storeTaskLS(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
//removeTask
function removeTask(e){
    if(e.target.classList.contains('fas')){
        e.target.parentElement.remove()
        removeTaskFromLocalStorage(e.target.parentElement);
    }
    
}
function removeTaskFromLocalStorage(taskItem){
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent===task){
            tasks.splice(index,1);
        }
    })
    localStorage.setItem('tasks',JSON.stringify(tasks))

}
//remove all task
function removeAllTask(e){
    while(allTasks.firstElementChild){
        allTasks.removeChild(allTasks.firstElementChild)
    }
    clearTasksFromLocalStorage()
}
function clearTasksFromLocalStorage(){
    localStorage.clear()
}

//filter tasks
 function filterTasks(e){
     const text = e.target.value.toLowerCase();
     document.querySelectorAll('.task').forEach(function(task){
         const item = task.firstChild.textContent;
         if(item.toLocaleLowerCase().indexOf(text)!=-1){
            task.style.display ='block';
         }
         else{
            task.style.display ='none';
         }
     })
 }