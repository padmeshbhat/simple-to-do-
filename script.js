console.log("1. JS file is connected!");
const taskInput=document.getElementById("task-input");
const addButton =document.getElementById("add-button");
const activeList=document.getElementById("active-list");
const saveBtn=document.getElementById("save-button");
const saveList=document.getElementById("saved-list");



addButton.addEventListener("click", function() {
   const taskText=taskInput.value;
   
   if(taskText.trim()==""){
    alert("Please enter the task first");
    return;
   }

    const newListItem=document.createElement("li");
    newListItem.textContent=taskText;
   

    const dltbuttn=document.createElement("button");
    dltbuttn.textContent="Delete";
    dltbuttn.className="dlt-button";

    dltbuttn.addEventListener('click',function(){
        newListItem.remove();
    });
    newListItem.appendChild(dltbuttn);
    activeList.appendChild(newListItem);
    taskInput.value="";

   

});
saveBtn.addEventListener("click",function(){
    if(activeList.children.length==0){
        alert("no tasks to save");
        return;
    }

    const newcrd=document.createElement('div');
    newcrd.className="saved-card";

    while(activeList.firstChild){
        saveList.appendChild(activeList.firstChild);
    }

    saveList.appendChild(newcrd);

});
