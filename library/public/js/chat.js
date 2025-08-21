const roomName = location.pathname.split("/").pop();
const socket = io.connect("/", { query: `roomname=${roomName}` });
const sendForm = document.querySelector(".book-chat-form");
const messagesList = document.querySelector(".book-chat-messages-list");

function createMessageBlock(msg) {
  return `
    <div class="book-chat-message">
      <div class="book_name">
        Автор: ${msg.username === "" ? "Аноним" : msg.username}
      </div>
      <div class="book_actions">
        ${msg.message}
      </div>
    </div>
  `;
}

socket.on("message-to-room", msg => {
  messagesList.insertAdjacentHTML("beforeend", createMessageBlock(msg));
  messagesList.scrollTop = messagesList.scrollHeight;
});

sendForm.addEventListener("submit", e => {
  e.preventDefault();
  socket.emit("message-to-room", {
    username: username || "",
    message: e.target.elements["book-chat-form-input"].value,
  });

  e.target.reset();
});