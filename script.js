window.addEventListener("load", () => {
    todos = JSON.parse(localStorage.getItem("todos")) || []

   let myForm = document.querySelector(".my-form")

   // Nastavení zadávacího pole

   myForm.addEventListener("submit", (e) => {
       e.preventDefault()
       
       if(e.target.elements.content.value === "") {
           alert("Musíte vyplnit pole")
           return
       }
       
       const todo = {
           content: e.target.elements.content.value,
           done: false,
           createdAt: new Date(). getTime()
       }

       todos.push(todo)
       SaveData()
       e.target.reset()
       
       DisplayData()

   })

  DisplayData()

})

// Funkce pro zobrazení úkolů

function DisplayData() {
   const todoList = document.querySelector(".second-section")
   todoList.innerHTML = ""

   todos.forEach((todo) => {
       const todoItem = document.createElement("div")
       todoItem.classList.add("one-todo")

       const input = document.createElement("input")
       const content = document.createElement("div")
       const actions = document.createElement("div")
       const editButton = document.createElement("button")
       const deleteButton = document.createElement("button")

       input.type = "checkbox"
       input.checked = todo.done

       content.classList.add("one-content")
       actions.classList.add("actions")
       editButton.classList.add("edit")
       deleteButton.classList.add("delete")

       content.innerHTML = `<input type="text" value="${todo.content}" readonly>`
       editButton.innerHTML = "Upravit"
       deleteButton.innerHTML = "Smazat"

       actions.appendChild(editButton)
       actions.appendChild(deleteButton)

       
       todoItem.appendChild(input)
       todoItem.appendChild(content)
       todoItem.appendChild(actions)

       todoList.appendChild(todoItem)

       if(todo.done) {
           todoItem.classList.add("done")
       }

       
   input.addEventListener("click", (e) =>{
       todo.done = input.checked
       SaveData()

       if(todo.done) {
           todoItem.classList.add("done")
       } else {
           todoItem.classList.remove("done")
       }

       
       
       DisplayData()

   })


   // Tlačítko upravit

   editButton.addEventListener("click", (e) => {
       const input = content.querySelector("input")
       input.removeAttribute("readonly")
       input.focus()
       input.addEventListener("blur", (e) => {
           input.setAttribute("readonly", true)
           todo.content = e.target.value
           SaveData()
           DisplayData()
       })
   })

   // Tlačítko smazat

   deleteButton.addEventListener("click", (e) => {
       todos = todos.filter(t=> t != todo)
       SaveData()
       DisplayData()
   })

   })

}



// Funkce uložení dat do local storage

function SaveData() {
   localStorage.setItem("todos", JSON.stringify(todos))
}


