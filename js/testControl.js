// obtener los elementos de las preguntas
const bar = document.querySelector('.bar');
const barBlue = window.getComputedStyle(bar, '::before')
const getQuestions = document.querySelectorAll('.question-card');
const questions = Array.prototype.slice.call(getQuestions);
const numberCards = questions.length - 1;
const objectWidth = document.querySelector('.barContent').offsetWidth;
var thisCard = 0;
var userDates = [];
var userNormalizeData;

//obtener y configurar boton de siguiente pregunta
const button = document.querySelector('.send')
button.addEventListener("click", ()=>{
    getData(thisCard);
    let width = (objectWidth * (thisCard)) / numberCards;
    bar.style.width = width + "px";
});

//agrega la clase active para que se muestre a la tarjeta con la id igual a el contador
function showCard(id){
    for(question in questions){
        if (questions[question].id == id){
            questions[question].classList.add("active");
        }
        else{
            questions[question].classList.remove("active");
        }

    }
}

// clasifica el tipo de deto esperado y recoje la respuesta del usuario en un array
function getData(id){
    // Tipo de Respuesta esperada
    let type = questions[id].children;
    type = Array.prototype.slice.call(type)[1].title;

    // Datos
    let data = questions[id].children;
    data = Array.prototype.slice.call(data)[1].children;
    data = Array.prototype.slice.call(data);

    if(type == "info"){
        nextCard();
    }
    else if(type == "text"){
        for(input in data){
            if(data[input].value != ""){
                userDates.push(data[input].value);
                nextCard();
            }
        }
    }
    else if(type == "radio"){
        let radioData = 0;
        let radioInputs = [];
        for(input in data){
            radioData = data[input].children;
            radioData = Array.prototype.slice.call(radioData)[0];
            radioInputs.push(radioData);
        }
        for(radio in radioInputs){
            if(radioInputs[radio].checked){
                userDates.push(radioInputs[radio].value);
                nextCard();
            } 
        }
    }
}

function nextCard(){
    if(thisCard == (questions.length - 1)){
        normalizeData(userDates);
    }
    else{
        thisCard++;
        showCard(thisCard);
    }
    
}

function normalizeData(data){
    userNormalizeData = {
    nombre: data[0],
    edad: data[1],
    elo: data[2],
    apertura: data[3],
    final: data[4],
    ventaja: data[5],
    analisis: data[6],
    tactica: data[7],
    decisiones: data[8],
    tiempo: data[9],
    tiempoEntrenamiento: data[10]
    }

    const ExportUserDates = {
        nombre: data[0],
        edad: data[1],
        elo: data[2],
        rango: 0,
        plan: [],
        ultimaVisita: 0,
        ID: 0,
        color: ""
    }

    const cd = new Date;
    const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const creationDate = cd.getDate() + " de " + monthNames[cd.getMonth()] + " de " + cd.getFullYear();
    const timeID = cd.getTime();

    // Generador de ID que a la vez es la key de cada plan
    const thisPlan = ExportUserDates.nombre + "-" + ExportUserDates.elo + "-" + creationDate + "-" + timeID;

    ExportUserDates.ID = thisPlan;
    ExportUserDates.ultimaVisita = creationDate;
    ExportUserDates.rango = definirRango(userNormalizeData);
    ExportUserDates.plan = crearPlan(userNormalizeData);
    ExportUserDates.color = randomColor();

    // guarda la key de cada plan guardado
    var planes = JSON.parse(localStorage.getItem('planes'));
    if(planes == null){
        planes = [];
    }

    // guarda el plan con un id unico ademas de guardar el id en un array para mostrar en mis planes, despues
    planes.push(thisPlan);
    localStorage.setItem(thisPlan, JSON.stringify(ExportUserDates));
    localStorage.setItem("planes", JSON.stringify(planes));

    // Le pasamos el plan activo es decir este que acabamos de crear asi lo recuperamos en la pagina plan
    localStorage.setItem('planActivo', JSON.stringify(ExportUserDates));

    // redirige al usuario al plan generado recientemente
    window.location.href = "plan.html";
}

// calcular rango de entrenamiento >>>
function definirRango(userNormalizeData){
    let elo = userNormalizeData.elo;
    let edad = userNormalizeData.edad;
    let entrenamientoReducido = userNormalizeData.tiempoEntrenamiento;
    if (entrenamientoReducido === "true"){
      return 0;
    }
    else{
      let eloRango = [];
      eloRango.push(elo < 1400);
      eloRango.push(elo >= 1400 && elo < 1700);
      eloRango.push(elo >= 1700 && elo < 1900);
      eloRango.push(elo >= 1900);
      
      eloRango.map((dato, index)=>{
        if (dato == true){eloRango = index + 1}
      });
      
      let edadRango = [];
      edadRango.push(edad >= 50);
      edadRango.push(edad < 14);
      edadRango.push(edad >= 14 && edad < 17);
      edadRango.push(edad >= 17 && edad < 50);
      
      edadRango.map((dato, index)=>{
        if (dato == true){edadRango = index + 1}
      });
      
      let rango = Math.floor((eloRango + edadRango) / 2);
      return rango;
    }
  }

  // estructurar plan de entrenamiento >>>
  function crearPlan(r){
      plan = [r.apertura, r.final, r.ventaja, r.analisis, r.tactica, r.decisiones, r.tiempo];
    //   plan.sort(() => { return Math.random() - 0.5 });
      plan.push("mcRecuperacion");
      return plan;
  }

  function randomColor (){
      const colorList = ["green", "blue", "yellow", "red", "pink", "salmon"];
      let color  = colorList[Math.floor(Math.random() * colorList.length)];
      return color;
  }