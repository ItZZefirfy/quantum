function addHeader() {
    let header = document.getElementsByTagName("header")[0]
    let headerText =   `<div id="header-wrapper">    
                            <a href="index.html" class="main-header"><h1>Главная</h1></a>
                            <a href="demonlist.html"><h1>демоны</h1></a>
                            <a href="challengelist.html"><h1>челленджи</h1></a>
                            <a href="platformerlist.html"><h1>платформеры</h1></a>
                            <button id="open-menu-button"><h1><i class='bx bx-menu'></i>Меню</h1></button>
                        </div>`
    
    header.innerHTML = headerText
}

function addMenu() {
    let menu = document.getElementById("menu")
    let menuContent = `
        <h1>GDPS</h1>

        <div class="menu-link-wrapper">
            <a href="index.html" class="main-header"><h2>Главная</h2></a>
        </div>
        <div class="menu-link-wrapper">
            <a href="demonlist.html"><h2>Демоны</h2></a>
        </div>
        <div class="menu-link-wrapper">
            <a href="challengelist.html"><h2>Челленджи</h2></a>
        </div>
        <div class="menu-link-wrapper">
            <a href="platformerlist.html"><h2>Платформеры</h2></a>
        </div>
        <div class="menu-link-wrapper">
            <a href="players.html"><h2>Игроки</h2></a>
        </div>

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