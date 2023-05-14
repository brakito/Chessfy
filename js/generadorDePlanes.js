var userDates = JSON.parse(localStorage.getItem('planActivo'));
var rangoEntrenamiento = userDates.rango;

const cd = new Date;
const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const openDate = cd.getDate() + " de " + monthNames[cd.getMonth()] + " de " + cd.getFullYear();
userDates.ultimaVisita = openDate;
localStorage.setItem(userDates.ID, JSON.stringify(userDates));

const timingHash = {
  '0':{
    tactica: 25,
    jugar: 30,
    analisis: 15,
    apertura: 15,
    finales: 30,
    estrategia: 30,
    recuperacion: 20
  },
  '1': {
    tactica: 30,
    jugar: 40,
    analisis: 25,
    apertura: 20,
    finales: 35,
    estrategia: 40,
    recuperacion: 20
  },
  '2': {
    tactica: 45,
    jugar: 50,
    analisis: 35,
    apertura: 25,
    finales: 50,
    estrategia: 45,
    recuperacion: 30
  },
  '3': {
    tactica: 55,
    jugar: 70,
    analisis: 45,
    apertura: 40,
    finales: 60,
    estrategia: 55,
    recuperacion: 35
  },
  '4': {
    tactica: 80,
    jugar: 90,
    analisis: 70,
    apertura: 60,
    finales: 85,
    estrategia: 90,
    recuperacion: 50
  }
}

const days = {
    0: "Lunes",
    1: "Martes",
    2: "Miércoles",
    3: "Jueves",
    4: "Viernes",
    5: "Sábado",
    6: "Domingo"
}

const tiempoEntrenamiento = timingHash[rangoEntrenamiento];

const tactica = {icono: "", titulo: "Resolver táctica", tiempo: tiempoEntrenamiento.tactica};
const mate = {icono: "", titulo: "Ejercicios de jaque mate", tiempo: tiempoEntrenamiento.tactica};
const jugar = {icono: "", titulo: "Jugar partidas pensadas", tiempo: tiempoEntrenamiento.jugar};
const blitz = {icono: "", titulo: "Jugar partidas rápidas", tiempo: tiempoEntrenamiento.recuperacion};
const analisis = {icono: "", titulo: "Analizar tus partidas", tiempo: tiempoEntrenamiento.analisis};
const analisisM = {icono: "", titulo: "Analizar partidas de la elite", tiempo: tiempoEntrenamiento.analisis};
const apertura = {icono: "", titulo: "Estudiar tus aperturas", tiempo: tiempoEntrenamiento.apertura};
const finales = {icono: "", titulo: "Estudiar finales", tiempo: tiempoEntrenamiento.finales};
const estrategia = {icono: "", titulo: "Estudiar estrategia", tiempo: tiempoEntrenamiento.estrategia};
const recuperacion = {icono: "", titulo: "¡Diviértete!, juega algunas partidas", tiempo: tiempoEntrenamiento.recuperacion};

    // MICROCICLOS GENERALES
    const mcBasico = [
      [tactica, apertura, jugar],
      [tactica, estrategia, finales],
      [tactica, mate, blitz],
      [tactica, estrategia, finales],
      [tactica, apertura, jugar],
      [tactica, analisis],
      [blitz]
    ]

    const mcSuperPractico = [
      [tactica, jugar, blitz],
      [tactica, jugar, blitz],
      [tactica, mate, analisis],
      [tactica, jugar, blitz],
      [tactica, jugar, blitz],
      [mate, analisis],
      [recuperacion]
    ]

    const mcCorreccion = [
      [jugar, tactica, finales],
      [jugar, tactica, estrategia],
      [jugar, analisis, apertura],
      [jugar, tactica, estrategia],
      [jugar, tactica, finales],
      [tactica, analisis],
      [mate]
    ]

    const mcPerfeccionamiento = [
      [tactica, estrategia, finales],
      [jugar, apertura, analisisM],
      [tactica, estrategia, finales],
      [jugar, apertura, analisisM],
      [tactica, estrategia, finales],
      [jugar, analisis],
      [blitz]
    ]

    const mcCompetitivo = [
      [jugar, tactica, blitz],
      [jugar, apertura, analisis],
      [jugar, tactica, mate],
      [jugar, apertura, analisis],
      [jugar, tactica, blitz],
      [jugar, apertura, analisis],
      [mate]
    ]

    const mcRecuperacion = [
      [tactica, finales],
      [jugar, estrategia],
      [tactica, finales],
      [jugar, estrategia],
      [tactica, finales],
      [jugar, analisis],
      [mate]
    ]

    // MICROCICLOS ESPECIFICOS
    const mcApertura = [
      [tactica, jugar, apertura],
      [jugar, blitz, apertura],
      [tactica, analisisM, apertura],
      [jugar, blitz, apertura],
      [tactica, jugar, apertura],
      [tactica, analisis],
      [recuperacion]
    ]

    const mcEstrategia = [
      [tactica, estrategia, finales],
      [jugar, analisisM, estrategia],
      [tactica, mate, apertura],
      [jugar, analisisM, estrategia],
      [tactica, estrategia, finales],
      [mate, analisis],
      [recuperacion]
    ]

    const mcFinal = [
      [tactica, jugar,finales],
      [mate, jugar, finales],
      [tactica, blitz, finales],
      [mate, jugar, finales],
      [tactica, jugar, finales],
      [mate, analisis],
      [recuperacion]
    ]

    const mcTactico = [
      [tactica, mate, blitz],
      [tactica, estrategia, jugar],
      [tactica, mate, blitz],
      [tactica, estrategia, jugar],
      [tactica, mate, blitz],
      [tactica, analisis],
      [recuperacion]
    ]

    const microCiclos = {
      mcBasico: mcBasico,
      mcSuperPractico: mcSuperPractico,
      mcCorreccion: mcCorreccion,
      mcPerfeccionamiento: mcPerfeccionamiento,
      mcCompetitivo: mcCompetitivo,
      mcRecuperacion: mcRecuperacion,
      mcApertura: mcApertura,
      mcEstrategia: mcEstrategia,
      mcFinal: mcFinal,
      mcTactico: mcTactico
    }

    // codigo funcional >>>
    const container = document.querySelector(".container");
    const presentation = document.querySelector(".presentation");
    const planTitle = document.querySelector(".planTitle");

    // estructurar plan de entrenamiento >>>
    const planEntrenamineto = userDates.plan;
    // presentation.innerHTML +=`
    // <div class="presentationDates">
    //   <h2 class="mainTittle">${userDates.nombre}</h2>
    //   <span class="mainBadge" title="Minutos para este entrenamiento">${userDates.elo}</span>
    // </div>
    // `;

    planEntrenamineto.map((mc, nmc) =>{
        generarMicroCiclo(microCiclos[mc], nmc, mc);
    });

    // renderizar plan de entrenamiento >>>
    function generarMicroCiclo(mc, nmc, nombre){
        let nombreMC = nombre.slice(2, nombre.length);
        let microciclo = "";
        let esteDia = "";
        mc.map((dia, diaIndex)=>{
            esteDia = "";

        dia.map((carga) =>{
            esteDia += 
            `<div class="tarjeta"> 
                <div class="cardContain">
                  <span>${carga.icono}</span>
                  <p>${carga.titulo}</p>
                </div>
                <span class="badge" title="${carga.tiempo} minutos">${carga.tiempo}</span>
            </div>`
        });

        microciclo += `
            <div class="esteDia">
                <div class="cardTitle"><h3>${days[diaIndex]}</h3></div>
                <div class="cardContainer">${esteDia}</div>
            </div>`
        });
        
        let state;
        if (nmc == 0 && userDates.ID.split("-")[2] == userDates.ultimaVisita) {
          state = "open";
          planTitle.textContent = "¡" + userDates.nombre + " tu plan de entrenamiento está calentito!";
        } else if (userDates.ID.split("-")[2] != userDates.ultimaVisita) {
          planTitle.textContent = "¡" + userDates.nombre + " disfruta tu entrenamiento!";
        }
        container.innerHTML += `
        <details ${state}>
            <summary><span class="titulo">Semana ${nmc + 1} - Microciclo ${nombreMC}</span></summary>
            <div class="microciclo">${microciclo}</div>
        </details>
        `;
    }