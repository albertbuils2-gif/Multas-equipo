const API="https://script.google.com/macros/s/AKfycbxmBnH_gOW0lrz6owqIZg0O8Ja5UH9-sTtNRnELaplZWchKiJZy5PvuEJv9n1wtjjqMsw/exec";

function showPage(id){

document.querySelectorAll(".page").forEach(p=>{
p.classList.remove("active");
});

document.getElementById(id).classList.add("active");

}

fetch(API)
.then(r=>r.json())
.then(data=>{

let total=0;
let jugadores={};
let multasJugador={};

const tablaMultas=document.querySelector("#tablaMultas tbody");

data.forEach(m=>{

let monto=Number(m.monto);

total+=monto;

if(!jugadores[m.Jugador]) jugadores[m.Jugador]=0;
jugadores[m.Jugador]+=monto;

if(!multasJugador[m.Jugador]) multasJugador[m.Jugador]=0;
multasJugador[m.Jugador]++;

tablaMultas.innerHTML+=`
<tr>
<td>${m.Jugador}</td>
<td>${m.Multa}</td>
<td>${m.fecha}</td>
<td>${m.monto}</td>
</tr>
`;

});

document.getElementById("total").innerText=total;
document.getElementById("multasTotal").innerText=data.length;

const tablaJugadores=document.querySelector("#tablaJugadores tbody");

Object.keys(jugadores).forEach(j=>{

tablaJugadores.innerHTML+=`
<tr>
<td>${j}</td>
<td>${multasJugador[j]}</td>
<td>${jugadores[j]}</td>
</tr>
`;

});

new Chart(document.getElementById("jugadoresChart"),{
type:"bar",
data:{
labels:Object.keys(jugadores),
datasets:[{
label:"€ por jugador",
data:Object.values(jugadores)
}]
}
});

});
