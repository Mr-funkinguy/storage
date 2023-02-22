      
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js';
  import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js';

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBdKXe96_iBAAAv5kh5UEzMn-FA_5rPQQ0",
    authDomain: "chat-4a0b9.firebaseapp.com",
    projectId: "chat-4a0b9",
    storageBucket: "chat-4a0b9.appspot.com",
    messagingSenderId: "428368215269",
    appId: "1:428368215269:web:d538bec65184211903280c",
    measurementId: "G-DTEHZNX4KW"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const textBox = document.getElementById('name-box');
  const firebaseApp = initializeApp(firebaseConfig);

  const messagesRef = ref(getDatabase(firebaseApp), 'messages');

  const messagesEl = document.getElementById('messages');
  const messageForm = document.getElementById('message-form');
  const messageInput = document.getElementById('message-input');
 
// Select the target div element to monitor
const targetDiv = messagesEl;
// Create a new MutationObserver instance
const observer = new MutationObserver(() => {
  // When the div is updated, scroll to the bottom
  targetDiv.scrollTop = targetDiv.scrollHeight;
});

// Configure the observer to watch for childList changes
const config = { childList: true };

// Start observing the target div
observer.observe(targetDiv, config);


  // Listen for new messages in the Firebase database
  onValue(messagesRef, snapshot => {
  messagesEl.innerHTML = '';
  snapshot.forEach(childSnapshot => {
    const message = childSnapshot.val();
    const messageEl = document.createElement('p');
    messageEl.textContent = `${message.hours}:${message.minutes} | ${message.name}: ${message.text}`;
    messageEl.style.opacity = 0;
    messagesEl.appendChild(messageEl);
    setTimeout(() => {
      messageEl.style.opacity = 1;
    }, 100); // adjust the delay as needed to control the speed of the fade-in effect
  });
});

  const now = new Date();
  const myInputBox = document.getElementById('name-box');
const value = myInputBox.value;
console.log(value);
  // Handle form submission to add a new message to the Firebase database
  messageForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const text = messageInput.value;
    const nameBox = document.getElementById('name-box');
    const name = nameBox.value;
    
    const hours = now.getHours();
  const minutes = now.getMinutes();



    push(messagesRef, {hours, minutes, name, text});
    messageInput.value = '';
  });
  document.getElementById('wrapper-load').style.opacity = 0;
  setTimeout(() => {
    document.getElementById('wrapper-load').style.display = 'none';
  }, 500);
  
