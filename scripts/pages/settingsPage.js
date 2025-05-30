function drawOptionsStatus() {
    document.getElementById("option-enable-blur-status").innerHTML = 
        Number(localStorage.enableBlur) ? '[вкл]' : '[выкл]'
}

drawOptionsStatus()

document.getElementById("option-enable-blur").onclick = () => {
    localStorage.enableBlur = Number(!Number(localStorage.enableBlur))
    drawOptionsStatus() 
    console.log(localStorage.enableBlur)
}