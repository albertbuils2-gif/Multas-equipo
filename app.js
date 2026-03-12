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

let dineroJugador={}
let multasJugador={}
let dineroMes={}

const tablaMultas=document.querySelector("#tablaMultas tbody")

data.forEach(m=>{

let monto=Number(m.monto)

total+=monto

if(!dineroJugador[m.Jugador]) dineroJugador[m.Jugador]=0
dineroJugador[m.Jugador]+=monto

if(!multasJugador[m.Jugador]) multasJugador[m.Jugador]=0
multasJugador[m.Jugador]++

if(!dineroMes[m.mes]) dineroMes[m.mes]=0
dineroMes[m.mes]+=monto

tablaMultas.innerHTML+=`
<tr>
<td>${m.Jugador}</td>
<td>${m.Multa}</td>
<td>${m.fecha}</td>
<td>${m.monto}</td>
</tr>
`

})

document.getElementById("total").innerText=total
document.getElementById("multasTotal").innerText=data.length
document.getElementById("jugadoresTotal").innerText=Object.keys(dineroJugador).length

const tablaJugadores=document.querySelector("#tablaJugadores tbody")

Object.keys(dineroJugador).forEach(j=>{

tablaJugadores.innerHTML+=`
<tr>
<td>${j}</td>
<td>${multasJugador[j]}</td>
<td>${dineroJugador[j]}</td>
</tr>
`

})

Chart.register(ChartDataLabels)

const configBar={
plugins:{
datalabels:{
color:"white",
anchor:"center",
align:"center",
font:{
weight:"bold"
}
}
}
}

new Chart(document.getElementById("chartDineroJugador"),{
type:"bar",
data:{
labels:Object.keys(dineroJugador),
datasets:[{
label:"€",
data:Object.values(dineroJugador),
backgroundColor:"#cc0000"
}]
},
options:configBar
})

new Chart(document.getElementById("chartMultasJugador"),{
type:"bar",
data:{
labels:Object.keys(multasJugador),
datasets:[{
label:"Multas",
data:Object.values(multasJugador),
backgroundColor:"#ff4d4d"
}]
},
options:configBar
})

new Chart(document.getElementById("chartMes"),{
type:"line",
data:{
labels:Object.keys(dineroMes),
datasets:[{
label:"€ por mes",
data:Object.values(dineroMes),
borderColor:"#cc0000",
fill:false
}]
}
})

})
