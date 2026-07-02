const closeSession = document.querySelectorAll('.btnLogOut');
const user = localStorage.getItem('nameUser');

const nameUserElement = document.getElementById('nameUser');
if (nameUserElement) {
    nameUserElement.textContent = `Usuario: ${user}`;
}

if (!user || user === 'undefined' || user === null) {
    window.location.href = 'index.html';
}

closeSession.forEach(btn => {
    btn.addEventListener('click', finishSession);
});

function finishSession(e) {
    if (e) e.preventDefault();
    localStorage.removeItem('nameUser');
    const eventLogout = new CustomEvent('proyectoLogout');
    window.dispatchEvent(eventLogout);
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
};
