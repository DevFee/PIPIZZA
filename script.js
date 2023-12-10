window.sr = ScrollReveal({ reset: true })

sr.reveal("#menu", {duration: 1500})
sr.reveal(".slogan", {duration: 1500})

window.addEventListener('scroll',()=>{
    document.querySelector("header").classList.toggle("Header_roll", window.scrollY > 0)
    document.querySelector(".op-inicio").classList.toggle("visivel", window.scrollY > 0)
})

