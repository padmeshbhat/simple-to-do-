console.log("1. JS file is connected!");
const taskInput=document.getElementById("task-input");
const addButton =document.getElementById("add-button");
const activeList=document.getElementById("active-list");
const saveBtn=document.getElementById("save-button");
const saveList=document.getElementById("saved-list");

console.log("2. The Add Button is:", addButton);
console.log("3. Button was clicked!");

addButton.addEventListener("click", function() {
   const taskText=taskInput.value;
   
   if(taskText.trim()==""){
    alert("Please enter the task first");
    return;
   }

    const newListItem=document.createElement("li");
    newListItem.textContent=taskText;
    activeList.appendChild(newListItem);
    taskInput.value="";
   

});
saveBtn.addEventListener("click",function(){
    if(activeList.children.length==0){
        alert("no tasks to save");
        return;
    }
    while(activeList.firstChild){
        SavedList.appendChild(activeList.firstChild);
    }

});