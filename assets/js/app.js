// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear();

const catCards = document.querySelectorAll('.cat-card');
const filterButtons = document.querySelectorAll('[data-btn-filter]');
const items = document.querySelectorAll('#menuList > div[data-category]');
const searchInput = document.getElementById('search');
const noResults = document.getElementById('noResults');

function applyFilters(){
    const activeBtn = document.querySelector('[data-btn-filter].active');
    const category = activeBtn ? activeBtn.dataset.btnFilter : 'all';
    const term = searchInput.value.trim().toLowerCase();
    let visibles = 0;

    items.forEach(el=>{
    const cat = el.dataset.category;
    const text = el.textContent.toLowerCase();
    const matchCat = category === 'all' || cat === category;
    const matchTerm = term === '' || text.includes(term);
    if(matchCat && matchTerm){
        el.style.display = '';
        visibles++;
    } else {
        el.style.display = 'none';
    }
});
noResults.style.display = visibles ? 'none':'block';
}

filterButtons.forEach(btn=>{
btn.addEventListener('click',()=>{
    filterButtons.forEach(b=>b.classList.remove('active','btn-light'));
    btn.classList.add('active','btn-light');
    applyFilters();
});
});

searchInput.addEventListener('input',applyFilters);

catCards.forEach(card=>{
    card.addEventListener('click',()=>{
    const filter = card.dataset.filter;
    const btn = document.querySelector('[data-btn-filter="'+filter+'"]');
    if(btn){
        btn.click();
        document.querySelector('#menu').scrollIntoView({behavior:'smooth', block:'start'});
    }
    });
});

// Botón agregar (demo)
document.querySelectorAll('.menu-item button').forEach(btn=>{
    btn.addEventListener('click',()=>{
    btn.textContent = 'Añadido ✓';
    btn.disabled = true;
    setTimeout(()=>{
        btn.textContent = 'Agregar';
        btn.disabled = false;
    },1500);
});
});