//getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer");

inputBox.onkeyup=()=>{
    let userData = inputBox.value;
    if(userData.trim() != 0){ // if user  enter any value
        addBtn.classList.add("active"); // plus button shows active
    }
    else{
        addBtn.classList.remove("active");// otherwise shows inactive
    }
} 
showTasks();//calling show tasks functions
//if user click on the add button
addBtn.onclick = () =>{
    let userData = inputBox.value; //getting user enterd value
    let getlocalstorage = localStorage.getItem("New Todo"); //getting local storage
    if (getlocalstorage == null){ //if local storage in null
         listArr = [];//creating blank array
    }
    else{
        listArr = JSON.parse(getlocalstorage); //transforming json strig into a js object
    }
    listArr.push(userData);//pusing or adding user data
    localStorage.setItem("New Todo", JSON.stringify(listArr)); //transforming js object into a json string
    showTasks(); //calling show tasks functions
}
// function to add task list inside ul
function showTasks(){
    let getlocalstorage = localStorage.getItem("New Todo"); //getting local storage
    if (getlocalstorage == null){ //if local storage in null
         listArr = [];//creating blank array
    }
    else{
        listArr = JSON.parse(getlocalstorage); //transforming json strig into a js object
    }
    const pendingNumb = document.querySelector(".pendingNumb");
    pendingNumb.textContent = listArr.length;//passing the length value in pendingnumb
    let newLiTag = '';
    listArr.forEach((element,index)=> {
        newLiTag +=  `<li>${element}<span onclick="deleteTask(${index})"><i class="fa fa-close"></i></span></li>`
        
    });
    todoList.innerHTML = newLiTag //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank
}

//delete task function
function deleteTask(index){
    let getlocalstorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getlocalstorage); //transforming json strig into a js object
    listArr.splice(index,1);//delete or remove the particular indexed li
    //after removing the li ahain update the local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();

}

//delete all tasks function
deleteAllBtn.onclick = () =>{
    listArr = [];//empty an array
    //after delete all tasks again upadte local storage
    localStorage.setItem("New Todo", JSON.stringify(listArr));
    showTasks();
}