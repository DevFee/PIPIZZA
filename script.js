window.sr = ScrollReveal({ reset: true })
const popup = document.querySelector(".popup")

sr.reveal("#menu", {duration: 1500})
sr.reveal("#sobre", {duration: 1500})
sr.reveal("#contato", {duration: 1500})
sr.reveal(".slogan", {duration: 1500})
sr.reveal(".card", {duration: 1500})

window.addEventListener('scroll',()=>{
    document.querySelector("header").classList.toggle("Header_roll", window.scrollY > 0)
})

function copygmail(){
    navigator.clipboard.writeText("felipedeev@gmail.com").then(() =>{
        alert("Email Copiado!")
    })
}

function fecharpopup(){
    document.querySelector(".popup").style.scale = 0
}

function aparecerpopup(){
    document.querySelector(".popup").style.scale = 1
}