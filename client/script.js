//making connection to the server side and  making it available to the client side
let socket = io.connect();

// creating function for making the chat
function Chat(){

    //created div container where the elements will be placed
    const mainDivChat = document.createElement('div');
    mainDivChat.id = 'log-chat';
    mainDivChat.setAttribute('style',
        'display: flex; justify-content: center;');
    containerDiv.appendChild(mainDivChat);

    //created div input where the input will be inserted into
    const divInput= document.createElement('div');
    divInput.id = 'input-box';
    divInput.setAttribute('style',
        'display: flex; justify-content: center; margin-top: 10px;');
    containerDiv.appendChild(divInput);

    //created div users where the list of users will be inserted into
    const divUsers = document.createElement('div');
    divUsers.id = 'users-box';
    divUsers.setAttribute('style',
        'height: 600px; width: 195px; opacity: 80%; background-color: white; border-right: 1px solid black;');
    mainDivChat.appendChild(divUsers);

    //function to createElement chat
    function createChatBox() {
        const chat = document.createElement('div');
        chat.id = "chat-container";
        chat.setAttribute('style',
            'background-color:white; height:600px; width:715px; opacity:80%;');
        mainDivChat.appendChild(chat);
        }

    //function to createElement button for the button to send to all the users
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

    //function to createElement button for sending to self
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

    //function to create an input field
    function creatInput() {
      const input = document.createElement('input');
      input.id = 'postInput';
      input.type = 'text';
      input.setAttribute('style', 'width:50%; margin-right: 2px; background-color:whitesmoke; opacity: 80%')
      divInput.appendChild(input);
    }

    //function to create a users list
    function createOnlineUsers() {
        const onlineUsers = document.createElement('li');
        onlineUsers.id = 'onlineUsers';
        onlineUsers.textContent = 'Online Users';
        onlineUsers.setAttribute('style', '' +
            'text-align: center; margin-top: 10px; color: green')
        divUsers.appendChild(onlineUsers);
    }

    //calling al the nested functions below
    createChatBox();
    creatInput();
    createOnlineUsers()
    creatButtonToSelf();
    creatButtonToAll();
}


// *****************the original chatter
//const input = document.getElementById('postInput');
//const target = document.getElementById('target');
//const sendToAllButton = document.getElementById('toAll');
//const sendToSelfButton = document.getElementById('toSelf');
//*****************

//const replaceForm = document.getElementById('login-box');
const loginButton = document.getElementById("login-button");
const containerDiv = document.getElementById('container-login');
// button to remove dom elements from the page
let removeLogin = document.getElementById("login-block");

//const username = prompt('Welcome! Please enter your name:')

let username;

loginButton.addEventListener('click',()=>{
    username = document.getElementById("userName").value;
    socket.emit("logIn", username);
    //removeLogin.innerHTML=""
    removeLogin.remove();
    //removeLogin.removeAttribute('style');
    //e.preventDefault();
    Chat();
});

//Chat();

socket.on('message',message =>{
    console.log(message);
});
document.addEventListener('click',(e)=>{
    if(e.target.id === 'toAll'){
        let input = document.getElementById('postInput');
        let message = username+": "+ input.value
        input.value="";
        socket.emit('sendToAll',message);
        console.log(message);
    }
})


document.addEventListener('click',(e)=>{
    if(e.target.id === 'toSelf') {
        let input = document.getElementById('postInput')
        let message = username+": "+ input.value ;
        input.value = "";
        socket.emit('sendToOwn', message);
        console.log(message);
    }
})

socket.on("displayMessage",(message)=> {
    let chat = document.getElementById("chat-container");
    let display = document.createElement("p");
    display.innerHTML = message;
    chat.appendChild(display);
});
console.log(username);

socket.on("logUsers",(usersArray)=>{
    console.log(usersArray)
    let users = document.getElementById("onlineUsers")
    //usersArray="";
    for (let i = 0; i <usersArray.length ; i++) {
        let display = document.createElement('p')
        display.innerHTML = usersArray[i];
        users.appendChild(display)
    }
});









