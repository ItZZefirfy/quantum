function addHeader() {
    let header = document.getElementsByTagName("header")[0]
    let headerText =   `<div id="header-wrapper">    
                            <a href="index.html" class="main-header"><h1>Главная</h1></a>
                            <a href="demonlist.html"><h1>демоны</h1></a>
                            <a href=""><h1>челленджи</h1></a>
                            <a href=""><h1>платформеры</h1></a>
                            <button id="open-menu-button"><h1>Меню</h1></button>
                        </div>`
    
    header.innerHTML = headerText
}

function addMenu() {
    let menu = document.getElementById("menu")
    let menuContent = `
        <h1>GDPS</h1>
        <a href="index.html" class="main-header"><h2>Главная</h2></a>
        <a href="demonlist.html"><h2>Демоны</h2></a>
        <button id="close-menu-button"><h3>Назад</h3></button>
    `
    
    menu.innerHTML += menuContent

    document.getElementById("open-menu-button").onclick = () => {
        const menu = document.getElementById("menu")
        menu.style.transform = "translateX(0)"
    }

    document.getElementById("close-menu-button").onclick = () => {
        const menu = document.getElementById("menu")
        menu.style.transform = "translateX(-100vw)"
    }
}