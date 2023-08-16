const formularioui = document.querySelector('#formulario');
const listaActividadesUI = document.getElementById('listaActividades');

let arrayActividades = [];

const CrearItem = (actividad) =>{
    let item = {
        actividad: actividad,
        estado: false
    }
    arrayActividades.push(item);
    return item;
}

const guardarDB =()=>{
//Agreagmos lo que ingresamos en el input al localStore
localStorage.setItem('rutina',JSON.stringify(arrayActividades)); //Guardamos en formato JSON porque por defecto guarda en texto
pintarDB();
}


const pintarDB=()=>{
    listaActividadesUI.innerHTML = '';
    arrayActividades = JSON.parse(localStorage.getItem('rutina')); //Recordar que en el setItem estamos guardando como Parse y para observar esos datos tambien como objeto demos hacer Json.parse

    if(arrayActividades === null){
        arrayActividades = [];
    }else{
        let color = '';
        let state = '';
        arrayActividades.forEach(element => {
            if(element.estado == false){
                color = 'danger'
                state = 'Pendiente'
            }else{
                color = 'primary'
                state = 'Realizado'

            }

            listaActividadesUI.innerHTML += `
            <div class="alert alert-${color}" role="alert">
            
            <i class="fa-solid fa-hand-point-right fa-beat-fade" style="color: #ffffff;"></i>
                
                <b>${element.actividad}</b> - ${state}
                <span class="float-right">
                    <i class="fa-solid fa-check mr-2"></i>
                    <i class="fa-solid fa-trash"></i>
                </span>
            </div>
            `
        });

    }
}

const eliminarDB =(actividad)=>{
    let indexArray;
    arrayActividades.forEach((elemento,index)=>{
        if(elemento.actividad == actividad){
            indexArray = index;
        }

       
    });

    arrayActividades.splice(indexArray,1);
    guardarDB();
}

const editarDB = (actividad) =>{
    
    let indexArray = arrayActividades.findIndex((elemento)=>{
        return elemento.actividad ===  actividad;
    });

    arrayActividades[indexArray].estado = true;
    guardarDB();
}

formularioui.addEventListener('submit',(e)=>{

    
     e.preventDefault();
     let actividadUI = document.querySelector('#actividad').value;
     if(actividadUI.trim() == ''){
        return
     }
     CrearItem(actividadUI);
     guardarDB();
     formularioui.reset();
})

document.addEventListener('DOMContentLoaded',pintarDB);

listaActividadesUI.addEventListener('click',(e)=>{
    e.preventDefault();
    if(e.target.classList[0] == 'fa-solid'){
       let texto = e.target.parentElement.parentElement.querySelector('b').textContent;
        if(e.target.classList[1] == 'fa-check'){
            editarDB(texto);
        }else{
            eliminarDB(texto);
            console.log(texto);
        };
    }
})