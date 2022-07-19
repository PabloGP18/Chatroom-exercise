let socket = io.connect();

const input = document.getElementById('postInput');
const target = document.getElementById('target');
const sendToAllButton = document.getElementById('toAll');
const sendToSelfButton = document.getElementById('toSelf');

sendToAllButton.addEventListener('click' , ()=>{
    let message = input.value;
    input.value = "";
    socket.emit('sendToAll', message);
    console.log(message);

});

socket.on("displayMessage",(message) => {
    let display = document.createElement("p");
    display.innerHTML = message;
    target.appendChild(display);
});




