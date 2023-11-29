var addButton = document.getElementById("addButton");
var clearButton = document.getElementById("clearCompleted");
var emptyButton = document.getElementById("emptyList");
var saveButton = document.getElementById("saveList");
var toDoEntryBox = document.getElementById("todoEntryBox");
var toDoList = document.getElementById("to-do-List");

addButton.addEventListener("click", addToDoItem);
clearButton.addEventListener("click", clearCompletedToDoItems);
emptyButton.addEventListener("click", emptyList);
saveButton.addEventListener("click", saveList);


function addToDoItem()
{
    var itemText = toDoEntryBox.value;
    newToDoItem(itemText, false);
    saveList()
}
function newToDoItem(itemText, completed)
{
    var toDoItem = document.createElement("li");
    var toDoText = document.createTextNode(itemText);

    toDoItem.appendChild(toDoText);

    if(completed)
    {
        toDoItem.classList.add("completed");
    }

    toDoList.appendChild(toDoItem);
    toDoItem.addEventListener("dblclick", toggleToDoItemState);
    saveList()
}
function toggleToDoItemState()
{
    if(this.classList.contains("completed"))
        this.classList.remove("completed");
    else
        this.classList.add("completed");
    saveList()
}
function clearCompletedToDoItems(){
    var completedItems = toDoList.getElementsByClassName("completed");
    while(completedItems.length > 0)
        completedItems.item(0).remove();
    saveList()
}
function emptyList()
{
    var toDoItems = toDoList.children;
    while(toDoItems.length > 0)
        toDoItems.item(0).remove();
    saveList()
}
function saveList(){
    var toDos = [];
    for(var i = 0; i < toDoList.children.length; i++)
    {
        var toDo = toDoList.children.item(i);

        var toDoInfo = {
            "task": toDo.innerText,
            "completed": toDo.classList.contains("completed")
        };
        toDos.push(toDoInfo);
    }
    localStorage.setItem("toDos", JSON.stringify(toDos));
}
function loadList(){
    if(localStorage.getItem("toDos") != null)
    {
        var toDos = JSON.parse(localStorage.getItem("toDos"));
    }

    for(var i = 0; i < toDos.length; i++)
    {
        var toDo = toDos[i];
        newToDoItem(toDo.task, toDo.completed);
    }
}
loadList();