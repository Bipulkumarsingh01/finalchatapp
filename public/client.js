let socket;
let userName;
let roomID;

// Function to join the chat room
function joinChat() {
  userName = document.getElementById('nameInput').value.trim();
  roomID = document.getElementById('roomInput').value.trim();

  if (userName && roomID) {
    document.getElementById('joinForm').style.display = 'none';
    document.getElementById('chatContainer').style.display = 'block';

    // Connect to Socket.io server
    socket = io();

    // Emit 'join' event to server
    socket.emit('join', { userName, roomID });

    // Update UI with username and roomID
    document.getElementById('usernameDisplay').innerText += userName;
    document.getElementById('roomIDDisplay').innerText += roomID;

    // Listen for 'userList' event from server
    socket.on('userList', (users) => {
      updateUserList(users);
    });
    // Listen for incoming chat messages

// Assume the socket variable and other functions are defined as per your original code

// Listen for incoming chat messages
socket.on('chat-message', (data) => {
  const { userName, message } = data;
  console.log('Received message:', data); // Check if messages are received correctly
  displayMessage(`${userName}: ${message}`);
});
  }
}

function leaveRoom() {
  // Reload the page
  window.location.reload();
}

function updateUserList(users) {
  const userListElement = document.getElementById('userList');

  // Clear previous user list
  userListElement.innerHTML = '';

  // Loop through each user and create list item
  users.forEach(user => {
    const userItem = document.createElement('div');
    userItem.classList.add('user-item');
    userItem.classList.add(user.status === 'online' ? 'online' : 'offline'); // Add online/offline class based on user status

    const userStatus = document.createElement('span');
    userStatus.classList.add('user-status');
    userStatus.style.backgroundColor = user.status === 'online' ? 'green' : 'red'; // Assuming 'status' is provided by the server

    const username = document.createElement('span');
    username.classList.add('username');
    username.textContent = user.userName; // Corrected from user.name

    userItem.appendChild(userStatus);
    userItem.appendChild(username);

    userListElement.appendChild(userItem);
  });
}

// Event listener for form submission
document.getElementById('form').addEventListener('submit', (e) => {
  e.preventDefault();
  console.log('Submit') // Prevent the default form submission behavior

  const message = document.getElementById('input').value.trim();
  if (message) {
    // Emit 'chat message' event to server
    socket.emit('chat-message', message);
    console.log('Submit',message) 
    document.getElementById('input').value = '';
  }
});

// Function to display chat messages
function displayMessage(msg) {
  console.log('Received message:', msg); // Check if messages are received

  const item = document.createElement('li');
  item.textContent = msg;

  const messageList = document.getElementById('messages');
  if (messageList) {
    messageList.appendChild(item);
  } else {
    console.error('Message list not found');
  }
}
