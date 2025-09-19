let userFormDOM = document.querySelector("#userForm")

let userToast = document.querySelector("#toast")


function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getTodos() {
    let todos = localStorage.getItem("todos")
    return todos ? JSON.parse(todos) : []

}

const toast = (message) => `
<div class="toast" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-body">
  <div>${message}</div>
   <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
  </div>
</div>
`
const alertNew = document.querySelector("#alert")

const alertDom = (message, className = "warning") => `<div style="margin-bottom:0;" class="alert alert-${className} alert-dismissible fade show" role="alert">
  ${message}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`




userFormDOM.addEventListener("submit", formHandler)

function formHandler(e) {
    e.preventDefault();
    const ToDO_Name = document.querySelector("#toDoList")
    const value = ToDO_Name.value.trim();

    if (value) {
        addItem(value);   // boş değilse ekle
        // userToast.innerHTML = toast()
        // console.log(userToast)
        // 1- HTML ekle
        userToast.innerHTML = toast("Listeye eklendi ✅");

        // 2- Yeni toast elementini seç
        const toastEl = userToast.querySelector(".toast");

        // 3- Bootstrap ile göster
        const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
        bsToast.show();
        ToDO_Name.value = "";
    } else {
        // alert("Lütfen bir değer giriniz!");
        alertNew.innerHTML = alertDom("Lütfen bir değer giriniz!", "success")
    }
}

let userListDom = document.querySelector("#userList")

const addItem = (item) => {
    let liDOM = document.createElement("li")
    liDOM.innerHTML = `<div> ${item}</div> <div> 
        <button style="border:none;"><i class="bi bi-trash">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
    </i></button>
    </div>

    `

    // Görev DOM'a eklendikten sonra storage'a yaz
    let newTodos = getTodos();
    newTodos.push(item);
    saveTodos(newTodos);




    // userListDom.append(liDOM)
    userListDom.insertAdjacentElement("beforeend", liDOM)
    liDOM.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start")

    liDOM.addEventListener("click", myFunction)

    function myFunction() {
        // let spamDom = document.createElement("span")
        // spamDom.innerHTML = `✅`
        // userListDom.insertAdjacentElement("beforeend", liDOM)


        liDOM.classList.toggle("liste")
        liDOM.classList.toggle("item-new")
    }

    liDOM.querySelector("button").addEventListener("click", () => {
        liDOM.remove()
        // storage'tan da sil
        let todosRemove = getTodos().filter(t => t !== item);
        saveTodos(todosRemove);
        userToast.innerHTML = toast("Eleman silindi ✅");

        // 2- Yeni toast elementini seç
        const toastEl2 = userToast.querySelector(".toast");

        // 3- Bootstrap ile göster
        const bsToast2 = new bootstrap.Toast(toastEl2, { delay: 4000 });
        bsToast2.show();
    })
}

