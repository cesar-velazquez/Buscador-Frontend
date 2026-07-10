////////////////////////////////////////////////////////////////////////////////////////////////////////////////


let userInput = document.getElementById('user');
let passInput = document.getElementById('password');
let btnLogin = document.getElementById('signIn');
let showError = document.getElementById("errorLogin");
let hiddenError = document.getElementById("removeLogin");
const btnPassword = document.getElementById('btnPassword');
let incompleteInfo = document.getElementById('incompleteInfo');

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
});

btnLogin.addEventListener('click', validateAccount);

async function validateAccount(event) {
    // console.log('Validando cuenta...');
    
    event.preventDefault();
    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                correo: userInput.value,
                contrasena: passInput.value
            })
        });


        if (passInput.value === '' || userInput.value === '') {
            showMessageIncorrect();
            return;
        }

        const data = await response.json();

        if (data.success) {
            Swal.fire({
                icon: 'success',
                title: '¡Bienvenido!',
                text: '¡Ingreso exitoso: ' + data.user.nombre + '!',
                showConfirmButton: false,
                timer: 2000
            }).then(() => {
                localStorage.setItem('usuario', JSON.stringify(data.user.nombre));
                window.location.href = '../private/welcome.html';
            });
        } else {
            console.error(data.message);
            showMessageError();
        }
    } catch (error) {
        console.error('Error:', error);
        showMessageError();
    }
}

function showMessageError() {
    userInput.value = '';
    passInput.value = '';

    showError.classList.remove('translate-y-20', 'opacity-0', 'invisible');

    setTimeout(() => {
        showError.classList.add('translate-y-20', 'opacity-0', 'invisible')
    }, 2000);
}

function showMessageIncorrect() {
    userInput.value = '';
    passInput.value = '';

    incompleteInfo.classList.remove('translate-y-20', 'opacity-0', 'invisible');

    setTimeout(() => {
        incompleteInfo.classList.add('translate-y-20', 'opacity-0', 'invisible')
    }, 2000);
}