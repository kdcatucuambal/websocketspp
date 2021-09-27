const socket = io();
//DOM elements
const message = document.getElementById("message");
const username = document.getElementById("username");
const btnSend = document.getElementById("send");
const output = document.getElementById("output");
const actions = document.getElementById("typer");
const aux = document.getElementById("aux");

btnSend.addEventListener("click", () => {
  const data = {
    username: username.value,
    message: message.value,
  };
  socket.emit("chat:message", data);
});

message.addEventListener("keypress", () => {
  socket.emit("chat:typing", username.value);
});

socket.on("chat:server", (data) => {
  actions.innerHTML = "";
  output.innerHTML += `
    <p>
    <strong>${data.username}</strong>: ${data.message}
    </p>
    `;
});

socket.on("chat:typing", (data) => {

  aux.innerHTML = `${data} is typing a message....`
  actions.innerHTML = `${data} is typing a message....`;
});
