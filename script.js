console.log("1. JS file is connected!");
const taskInput=document.getElementById("task-input");
const addButton =document.getElementById("add-button");
const activeList=document.getElementById("active-list");
const saveBtn=document.getElementById("save-button");
const saveList=document.getElementById("saved-list");
let listCounter=1;



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
    const taskarr=[];
    for(i=0;i<activeList.children.length;i++){
        taskarr.push(activeList.children[i].firstChild.textContent);
    }
    listCounter++;
    const listData={
        
        title:"saved list"+listCounter,
        tasks:taskarr
    };
    fetch("http://localhost:3000/api/lists", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(listData)
})
    .then(response => response.json())
    .then(data => console.log("Success from Backend:", data));

    while(activeList.firstChild){
        saveList.appendChild(activeList.firstChild);
    }

    saveList.appendChild(newcrd);

});

function loadSavedLists() {
    
    fetch("http://localhost:3000/api/lists")
        .then(response => response.json())
        .then(data => {
            saveList.innerHTML = "";

            
            for (let i = 0; i < data.length; i++) {
                const currentList = data[i];

                
                const newCard = document.createElement("div");
                newCard.className = "saved-card"; 
                
            
                newCard.textContent = currentList.title; 

              
                for (let j = 0; j < currentList.tasks.length; j++) {
                    const taskItem = document.createElement("li");
                    taskItem.textContent = currentList.tasks[j];
                    newCard.appendChild(taskItem);
                }

               
                saveList.appendChild(newCard);
            }
           
            console.log("Data loaded from MySQL:", data);
        })
        .catch(error => {
            console.error("Failed to fetch data:", error);
        });
}


loadSavedLists();
