////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Función Login Falso 
const users = [
    {
        username: 'admin@gmail.com',
        password: 'Admin2#$'
    },
    {
        username: 'cesar',
        password: 'Cesar2#$'
    },
    
];
// 

let userInput = document.getElementById('user');
let passInput = document.getElementById('password');
let btnLogin = document.getElementById('signIn');
let showError = document.getElementById("errorLogin");
let hiddenError = document.getElementById("removeLogin");
const btnPassword = document.getElementById('btnPassword');

const eyeClosed = document.getElementById('eyeClosed');
const eyeOpen = document.getElementById('eyeOpen');
function showPass() {
    // console.log("es contrasena");
    if (passInput.type === 'password' && passInput.value.length != 0) {
        passInput.setAttribute('type', 'text');
        eyeClosed.classList.add('hidden');
        eyeOpen.classList.remove('hidden');
    } else {
        passInput.setAttribute('type', 'password');
        eyeClosed.classList.remove('hidden');
        eyeOpen.classList.add('hidden');
    }
}

btnPassword.addEventListener('click', (e) => {
    e.preventDefault();
    showPass()
    // passInput.setAttribute('type', 'text');

});


btnLogin.addEventListener('click', validateAccount);

function validateAccount(event) {
    event.preventDefault();
    const foundUser = users.find(user => userInput.value === user.username && passInput.value === user.password);

    if (foundUser) {
        localStorage.setItem('nameUser', foundUser.username);
        window.location.href = 'welcome.html';
    } else {
        showMessageError();
    }
}

function showMessageError() {
    userInput.value = '';
    passInput.value = '';

    showError.classList.remove('translate-y-20', 'opacity-0', 'invisible');

    setTimeout(() => {
        showError.classList.add('translate-y-20', 'opacity-0', 'invisible')
    }, 3000);
}