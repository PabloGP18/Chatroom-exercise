let socket = io.connect();

// creating elements for the chatter
function Chat(){

    const mainDivChat = document.createElement('div');
    mainDivChat.id = 'log-chat';
    mainDivChat.setAttribute('style',
        'display: flex; justify-content: center;');
    containerDiv.appendChild(mainDivChat);

    const divInput= document.createElement('div');
    divInput.id = 'input-box';
    divInput.setAttribute('style',
        'display: flex; justify-content: center; margin-top: 10px;');
    containerDiv.appendChild(divInput);

    function createChatBox() {
        const chat = document.createElement('div');
        chat.id = "chat-container";
        chat.setAttribute('style',
            'background-color:white; height:600px; width:600px; opacity:80%;');
        mainDivChat.appendChild(chat);
        }

    function creatButtonToAll() {
        const divBtnToAll = document.createElement('div');
        divBtnToAll.id = 'div-btn-to-all';
        containerDiv.appendChild(divBtnToAll);

        const sendToAllButton = document.createElement('button');
        sendToAllButton.id="toAll";
        sendToAllButton.textContent ="sent to all";
        sendToAllButton.setAttribute('style',
            'padding:10px; border-radius:5px; border: none; font-weight:bold; letter-spacing:1px; margin-left:2px; cursor:pointer;');
        divBtnToAll.appendChild(sendToAllButton);
        divInput.appendChild(divBtnToAll);
    }

    function creatButtonToSelf() {
        const divBtnToSelf = document.createElement('div');
        divBtnToSelf.id = 'div-btn-to-self';
        containerDiv.appendChild(divBtnToSelf);

        const sendToSelfButton = document.createElement('button');
        sendToSelfButton.id="toSelf";
        sendToSelfButton.textContent = "sent to self";
        sendToSelfButton.setAttribute('style',
            'padding:10px; border-radius:5px; border: none; font-weight:bold; letter-spacing:1px; cursor:pointer;');
        divBtnToSelf.appendChild(sendToSelfButton);
        divInput.appendChild(divBtnToSelf);
    }

    function creatInput() {
      const input = document.createElement('input');
      input.id = 'postInput';
      input.type = 'text';
      input.setAttribute('style', 'width:28%; margin-right: 2px; background-color:whitesmoke; opacity: 80%')
      divInput.appendChild(input);
    }

    createChatBox();
    creatInput();
    creatButtonToSelf();
    creatButtonToAll();
}

const input = document.getElementById('postInput');
const target = document.getElementById('target');
const sendToAllButton = document.getElementById('toAll');
const sendToSelfButton = document.getElementById('toSelf');
const loginButton = document.getElementById("login-button");
const replaceForm = document.getElementById('login-box');
const containerDiv = document.getElementById('container-login');
// button to remove dom elements from the page
let removeLogin = document.getElementById("login-block");

loginButton.addEventListener('click',()=>{
    removeLogin.remove();
    //removeLogin.innerHTML=""
    //e.preventDefault();
    Chat();
});

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
const username = document.getElementById("userName").value;
//const username = prompt('Welcome! Please enter your name:')
socket.emit("logIn", username);
socket.on("logUsers",(usersArray)=>{
    console.log(usersArray)
    usersArray="";
    for (let i = 0; i <usersArray.length ; i++) {
        let display = document.createElement('p')
        display.innerHTML = usersArray[i];
        target.appendChild(display)
    }

});









