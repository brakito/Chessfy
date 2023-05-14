const userPlans = JSON.parse(localStorage.getItem('planes')).reverse();

const container = document.querySelector('.planes');

userPlans.map(key =>{
    let userDates = JSON.parse(localStorage.getItem(key));
    renderizarPlanCard(key, userDates);
});

function renderizarPlanCard(key, userDates){
    dates = key.split("-");
    container.innerHTML += `
    <div class="planCard" onclick="abrirEstePlan('${key}')" title="Plan de Entrenamiento de ${dates[0]}">
        <div>
            <span class="userIcon ${userDates.color}">
            <h3>${dates[0].slice(0,1)}</h3>
            </span>
            <div>
                <label class="date">${dates[2]}</label>
                <h3>${dates[0]}</h3>
            </div>
        </div>
        <div class="recent">
            <span class="cardIcon" title="Abierto por ultima vez"><img src="img/lastTime.svg"></span>
            <p>${userDates.ultimaVisita}</p>
        </div>
        
    </div>
    `
}

function abrirEstePlan(key){
    const planActivo = JSON.parse(localStorage.getItem(key));
    localStorage.setItem('planActivo', JSON.stringify(planActivo));
    window.location.href = "plan.html";
}