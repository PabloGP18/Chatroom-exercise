let socket = io.connect();

const input = document.getElementById('postInput');
const target = document.getElementById('target');
const sendToAllButton = document.getElementById('toAll');
const sendToSelfButton = document.getElementById('toSelf');



socket.on('message',message =>{
    console.log(message);
});

sendToAllButton.addEventListener('click',()=>{
    let message = username+": "+ input.value
    input.value="";
    socket.emit('sendToAll',message);
    console.log(message);
});

sendToSelfButton.addEventListener('click',()=>{
    let message = input.value;
    input.value ="";
    socket.emit('sendToOwn', message);
    console.log(message);
})

socket.on("displayMessage",(message)=> {
    let display = document.createElement("p");
    display.innerHTML = message;
    target.appendChild(display);
});

const username = prompt('Welcome! Please enter your name:')
socket.emit("logIn", username);
socket.on("logUsers",(usersArray)=>{
    console.log(usersArray)
    for (let i = 0; i <usersArray.length ; i++) {
        let display = document.createElement('p')
        display.innerHTML = usersArray[i];
        target.appendChild(display)
    }
});









