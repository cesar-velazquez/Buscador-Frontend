const closeSession = document.querySelectorAll('.btnLogOut');
const user = localStorage.getItem('usuario');
const overlay = document.getElementById('overlay');

const nameUserElement = document.getElementById('nameUser');
if (nameUserElement) {
    let nameUser = user.replace(/['"]+/g, '');
    nameUserElement.textContent = "Usuario: " + nameUser;    
}

if (!user || user === 'undefined' || user === null) {
    window.location.href = '../index.html';
}

closeSession.forEach(btn => {
    btn.addEventListener('click', finishSession);
});

function finishSession(e) {
    if (e) e.preventDefault();
    localStorage.removeItem('usuario');
    overlay.classList.remove('opacity-0', 'invisible');
    const eventLogout = new CustomEvent('proyectoLogout');
    window.dispatchEvent(eventLogout);
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 2000);
};
