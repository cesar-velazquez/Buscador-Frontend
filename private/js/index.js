//BUSCAR Info:
let inputSearch = document.getElementById('inputSearch');

inputSearch.addEventListener('input', (e) => {
    const wordSearch = inputSearch.value.toLowerCase();
    const resultResearch = dataComplete.filter(res => res.titulo?.toLowerCase().includes(wordSearch));
    renderResults(resultResearch);
});