window.sr = ScrollReveal({ reset: true })

sr.reveal("#menu", {duration: 1500, delay: 110})
sr.reveal(".slogan", {duration: 1500, delay: 200})

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