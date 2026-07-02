//Función Menu
const menu = document.getElementById('menu');

menu.addEventListener('click', () => {
    const containerMenu = document.getElementById('containerMenu');
    if (containerMenu.classList.contains('translate-x-20', 'opacity-0', 'invisible')) {
        containerMenu.classList.remove('translate-x-20', 'opacity-0', 'invisible');
    } else {
        containerMenu.classList.add('translate-x-20', 'opacity-0', 'invisible');
    }

});
