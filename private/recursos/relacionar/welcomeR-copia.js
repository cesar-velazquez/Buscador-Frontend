const closeSession = document.getElementById('closeSession');
const user = localStorage.getItem('nameUser');

if (localStorage.getItem('pestanasAbiertas') === 'no') {
    window.location.href = '../../index.html';
    console.log("DESDE aquí");
}   