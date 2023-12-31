//get
const todoContainer = document.getElementById("todolist-container");

const showTodos = (datas) => {
  todoContainer.innerHTML = "";
  for (let data of datas) {
    const div = document.createElement("div");
    div.id = data.id;
    const h4 = document.createElement("h4");
    h4.innerText = data.title;
    const span1 = document.createElement("span");
    span1.innerText = data.desc;
    const span2 = document.createElement("span");
    const btn = document.createElement("button");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = data.check;
    checkbox.onclick = function () {
      checkTodo(data.id, !data.check);
    };
    btn.onclick = function () {
      deleteTodo(data.id, todoContainer.children);
    };
    btn.innerText = "Delete";
    span2.append(checkbox);
    span2.append(btn);

    //   div.innerHTML =
    div.append(h4);
    div.append(span1);
    div.append(span2);
    todoContainer.append(div);
  }
};
const getTodos = () => {
  console.log("get");
  fetch("https://64d74eef2a017531bc132085.mockapi.io/todos", {
    method: "get",
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      res.sort((a, b) => -a.createdAt + b.createdAt);
      showTodos(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
getTodos();

//post
const postTodo = () => {
  const title = document.getElementById("title").value;
  const desc = document.getElementById("desc").value;
  console.log(title, desc);

  fetch("https://64d74eef2a017531bc132085.mockapi.io/todos", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "post",
    body: JSON.stringify({
      title: title,
      desc: desc,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      const div = document.createElement("div");
      div.id = res.id;
      const h4 = document.createElement("h4");
      h4.innerText = res.title;
      const span1 = document.createElement("span");
      span1.innerText = res.desc;
      const span2 = document.createElement("span");
      const btn = document.createElement("button");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = res.check;
      checkbox.onclick = function () {
        checkTodo(res.id, !res.check);
      };
      btn.onclick = function () {
        deleteTodo(res.id, todoContainer.children);
      };
      btn.innerText = "Delete";
      span2.append(checkbox);
      span2.append(btn);
      div.append(h4);
      div.append(span1);
      div.append(span2);
      todoContainer.append(div);

      //   getTodos();
    })
    .catch((err) => {
      console.log(err);
    });
};

//delete
const deleteTodo = (id, children) => {
  fetch(`https://64d74eef2a017531bc132085.mockapi.io/todos/${id}`, {
    method: "delete",
  })
    .then((res) => res.json())
    .then((res) => {
      children = Array.from(children);
      idx = children.map((child) => child.id).indexOf(id);
      todoContainer.removeChild(children[idx]);
      console.log(idx);
    })
    .catch((err) => {
      console.log(err);
    });
};

//update
const checkTodo = (id, checkType) => {
  fetch(`https://64d74eef2a017531bc132085.mockapi.io/todos/${id}`, {
    method: "put",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      check: checkType,
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      getTodos();
    })
    .catch((err) => {
      console.log(err);
    });
};
