(function () {
	
  const app = document.querySelector(".app");
  const socket = io()

  let uname;

  app.querySelector(".join-screen #join-user").addEventListener("click", function () {
    let username = app.querySelector("#username").value.trim();
    if (!username) return;

    socket.emit("newuser", username);
    uname = username;

    app.querySelector(".join-screen").classList.remove("active");
    app.querySelector(".chat-screen").classList.add("active");
  });

  app.querySelector("#send-message").addEventListener("click", function () {
    let message = app.querySelector("#message-input").value.trim();
    if (!message) return;

    renderMessage("my", {
      username: uname,
      text: message,
    });

    socket.emit("chat", {
      username: uname,
      text: message,
    });

    app.querySelector("#message-input").value = "";
  });

  app.querySelector("#exit-chat").addEventListener("click", function () {
    socket.emit("exituser", uname);
    window.location.href = window.location.href;
  });

  socket.on("chat", function (message) {
    renderMessage("other", message);
  });

  socket.on("update", function (message) {
    renderMessage("update", message);
  });

  function renderMessage(type, message) {
    const messageContainer = app.querySelector(".messages");
    const el = document.createElement("div");

    if (type === "my") {
      el.classList.add("message", "my-message");
      el.innerHTML = `<div><span>You</span><p>${message.text}</p></div>`;
    } else if (type === "other") {
      el.classList.add("message", "other-message");
      el.innerHTML = `<div><span>${message.username}</span><p>${message.text}</p></div>`;
    } else if (type === "update") {
      el.classList.add("update");
      el.innerText = message;
    }

    messageContainer.appendChild(el);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
})();
