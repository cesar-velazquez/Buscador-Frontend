const closeSession = document.getElementById('closeSession');
const user = localStorage.getItem('nameUser');

if (!user || user === 'undefined') {
    window.location.href = '../../index.html';
    console.log("DESDE aquí");
}   