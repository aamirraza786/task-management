const taskContainer= document.querySelector(".task_container");
let globalStore=[];
const generateNewTask=(taskData)=>`
<div class="column col-md-6 col-lg-4" >
    
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success"id=${taskData.id} onclick="editCard.apply(this, arguments)">
    <i class="fas fa-pencil-alt"id=${taskData.id} onclick="editCard.apply(this, arguments)"></i></button>
    <button type="button" class="btn btn-outline-danger"id=${taskData.id} onclick="deleteCard.apply(this, arguments)">
    <i class="fas fa-trash-alt"id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i></button>
  </div>
  <img src= ${taskData.imageUrl} alt="image">
  <div class="card-body">
    <h5 class="card-title">${taskData.taskTitle}</h5>
    <p class="card-text">${taskData.taskDescription}</p>
    <a href="#" class="btn btn-primary mb-2">${taskData.taskType}</a>
      </div>
    <div class="card-footer ">
      <button type="button"id=${taskData.id} class="btn btn-outline-primary float-end">Open Task</button>
    </div>
  </div>
</div>
`;
const updateLocalStorage = () => {
  localStorage.setItem("aamir", JSON.stringify({cards:globalStore}));
};
const loadInitialCardData=()=>{
  // localstorage to get aamir's card data
  const getCardData = localStorage.getItem("aamir"); // getting the data in the local storage

  // convert from string to normal object
  const {cards} = JSON.parse(getCardData);

  // loop over those array of task object to create HTML card, 
  cards.map((cardObject) => {

    // inject it to DOM
    taskContainer.insertAdjacentHTML("beforeend", generateNewTask(cardObject));   // displaying the cards after every reload of the browser

    // update our globalStore
    globalStore.push(cardObject);
  })
 
};

const saveChanges=()=>{
const taskData={
    id: `${Date.now()}`,//generate unique number for id
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,                      // capture the data dynamically
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value,
};

taskContainer.insertAdjacentHTML("beforeend",generateNewTask(taskData));   // inserting the card before end of the body
globalStore.push(taskData);                                                // storing the information of each card in an array named globalStore

localStorage.setItem("aamir", JSON.stringify({cards:globalStore}));        // creating a local storage for storing all the cards data

};

const deleteCard = (event) =>{
  event =window.event;
 const targetID=event.target.id;
 const tagname = event.target.tagName // if clicked on button then tagname="BUTTON" else tagnaeme="ICON"
 globalStore=globalStore.filter((cardObject)=>cardObject.id!=targetID);
 updateLocalStorage(); 
 if(tagname === "BUTTON"){
  return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
}else{
  return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
}

};
// function to edit the card
const editCard = (event) => {
  event =window.event;
 const targetID=event.target.id;
 const tagname = event.target.tagName;
 let parentElement;
 if(tagname=="BUTTON"){
   parentElement=event.target.parentNode.parentNode;
 }else{
   parentElement=event.target.parentNode.parentNode.parentNode;
 } 
 let taskTitle=parentElement.childNodes[5].childNodes[1];
 let taskDescription=parentElement.childNodes[5].childNodes[3];
 let taskType=parentElement.childNodes[5].childNodes[5];
 let submitButton=parentElement.childNodes[7].childNodes[1];
 taskTitle.setAttribute("contenteditable","true");
 taskDescription.setAttribute("contenteditable","true");
 taskType.setAttribute("contenteditable","true");
 submitButton.setAttribute("onclick","saveEditchanges.apply(this, arguments)");
 submitButton.innerHTML="Save Changes";
};
// // function to save edit changes
const saveEditchanges = (event) =>{
  
    event =window.event;
   const targetID=event.target.id;
   const tagname = event.target.tagName;
   let parentElement;
   if(tagname=="BUTTON"){
     parentElement=event.target.parentNode.parentNode;
   }else{
     parentElement=event.target.parentNode.parentNode.parentNode;
   }
   let taskTitle=parentElement.childNodes[5].childNodes[1];
   let taskDescription=parentElement.childNodes[5].childNodes[3];
   let taskType=parentElement.childNodes[5].childNodes[5];
   let submitButton=parentElement.childNodes[7].childNodes[1];

   const updatedData={
    taskTitle: taskTitle.innerHTML,
    taskType: taskType.innerHTML,
    taskDescription: taskDescription.innerHTML,
   };
  globalStore=globalStore.map((task)=>{
    if(task.id==targetID){
      return{
        id: task.id,
        imageUrl: task.imageUrl,
        taskTitle: updatedData.taskTitle,                     
        taskType: updatedData.taskType,
        taskDescription: updatedData.taskDescription,
      };
    }
      return task;
    
  });
  
  updateLocalStorage();
  taskTitle.setAttribute("contenteditable","false");
 taskDescription.setAttribute("contenteditable","false");
 taskType.setAttribute("contenteditable","false");
 submitButton.removeAttribute("onclick");
 submitButton.innerHTML="Open Task";

};