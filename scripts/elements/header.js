function addHeader() {
    const header = document.getElementsByTagName("header")[0]
    const headerText =   `<div id="header-wrapper">    
                            <a href="index.html" class="main-header"><h1>Главная</h1></a>
                            <button class="header-button" id="open-site-menu-button">Сайт</button>
                            <button class="header-button" id="open-lists-menu-button">Листы</button>
                            <button id="open-menu-button"><h1><i class='bx bx-menu'></i>Меню</h1></button>
                        </div>`
    
    header.innerHTML = headerText
}

function addMenu() {
    const menu = document.getElementById("menu")
    const menuContent = `
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

        <div class="menu-link-wrapper">
            <a href="news.html"><h2>Новости</h2></a>
        </div>

        <button id="close-menu-button"><h3>Назад</h3></button>
    `
    
    menu.innerHTML += menuContent

    document.getElementById("open-menu-button").onclick = () => {
        menu.style.transform = "translateX(0)"
    }

    document.getElementById("close-menu-button").onclick = () => {
        menu.style.transform = "translateX(-100vw)"
    }
}   

function addMenus() {
    const body = document.getElementsByTagName("body")[0]
    const menus = `<div class="mini-menu" id="lists-menu"></div>
                   <div class="mini-menu" id="site-navigation-menu"></div>`

    const listsMenuContent = `
        <listMenuButton id="mini-menu-players-link">Игроки</listMenuButton>
        <listMenuBorder></listMenuBorder>
        <listMenuButton id="mini-menu-demonlist-link">Демоны</listMenuButton>
        <listMenuButton id="mini-menu-challengelist-link">Челленджи</listMenuButton>
        <listMenuButton id="mini-menu-platformerlist-link">Платформеры</listMenuButton>
    `

    const siteNavigationMenuContent = `
        <listMenuButton id="mini-menu-news-link">Новости</listMenuButton>
        <listMenuButton id="mini-menu-settings-link">Настройки</listMenuButton>
        <listMenuBorder></listMenuBorder>
        <listMenuButton id="mini-menu-rules-discord-link">Правила дискорд сервера</listMenuButton>
        <listMenuButton id="mini-menu-rules-gdps-link">Правила приватного сервера</listMenuButton>
        <listMenuBorder></listMenuBorder>
        <listMenuButton id="mini-menu-send-progress">Отправить прохождение</listMenuButton>
    `
    
    body.innerHTML += menus    
    
    const siteNavigationMenu = document.getElementById("site-navigation-menu")
    const openSiteMenuButton = document.getElementById("open-site-menu-button")
    const listsMenu = document.getElementById("lists-menu")
    const openListsMenuButton = document.getElementById("open-lists-menu-button")

    listsMenu.innerHTML += listsMenuContent
    siteNavigationMenu.innerHTML += siteNavigationMenuContent

    window.isOpen_siteNavigationMenu = false
    window.isOpen_listsMenu = false
    
    function setDynamicUserFramePosition() {
        // navigation menu
        siteNavigationMenu.style.top = `${openSiteMenuButton.offsetHeight + 24}px`
        siteNavigationMenu.style.left = `${openSiteMenuButton.offsetLeft + 16}px`
        
        // lists menu    
        listsMenu.style.top = `${openListsMenuButton.offsetHeight + 24}px`
        listsMenu.style.left = `${openListsMenuButton.offsetLeft + 16}px`
    }

    setDynamicUserFramePosition()

    addEventListener("resize", () => {
        setDynamicUserFramePosition()

        siteNavigationMenu.style.transform = 'translateY(calc(-1 * var(--pxl2))) translateX(calc(-1 * var(--pxl3)))'
        siteNavigationMenu.style.opacity = 0
        siteNavigationMenu.style.pointerEvents = 'none'
        window.isOpen_siteNavigationMenu = false

        listsMenu.style.transform = 'translateY(calc(-1 * var(--pxl2))) translateX(calc(-1 * var(--pxl3)))'
        listsMenu.style.opacity = 0
        listsMenu.style.pointerEvents = 'none'
        window.isOpen_listsMenu = false
    })
    
    window.addEventListener('scroll', (event) => {
        siteNavigationMenu.style.transform = 'translateY(calc(-1 * var(--pxl2))) translateX(calc(-1 * var(--pxl3)))'
        siteNavigationMenu.style.opacity = 0
        siteNavigationMenu.style.pointerEvents = 'none'
        window.isOpen_siteNavigationMenu = false

        listsMenu.style.transform = 'translateY(calc(-1 * var(--pxl2))) translateX(calc(-1 * var(--pxl3)))'
        listsMenu.style.opacity = 0
        listsMenu.style.pointerEvents = 'none'
        window.isOpen_listsMenu = false
    })

    window.addEventListener('click', (event) => {
        if (!event.target.matches('#site-navigation-menu') 
            && window.isOpen_siteNavigationMenu) {
            siteNavigationMenu.style.transform = 'translateY(calc(-1 * var(--pxl2))) translateX(calc(-1 * var(--pxl3)))'
            siteNavigationMenu.style.opacity = 0
            siteNavigationMenu.style.pointerEvents = 'none'
            window.isOpen_siteNavigationMenu = false
        } else if (event.target.matches('#open-site-menu-button')) {
            if (siteNavigationMenu.style.opacity == 0) {
                siteNavigationMenu.style.transform = 'translateY(var(--pxl2)) translateX(calc(-1 * var(--pxl3)))'
                siteNavigationMenu.style.opacity = 1
                siteNavigationMenu.style.pointerEvents = 'all'
            } else {
                siteNavigationMenu.style.transform = 'translateY(calc(-1 * var(--pxl2))) translateX(calc(-1 * var(--pxl3)))'
                siteNavigationMenu.style.opacity = 0
                siteNavigationMenu.style.pointerEvents = 'none'
            }

            window.isOpen_siteNavigationMenu = !window.isOpen_siteNavigationMenu
        }

        if (!event.target.matches('#lists-menu')
            && window.isOpen_listsMenu) {
            listsMenu.style.transform = 'translateY(calc(-1 * var(--pxl2))) translateX(calc(-1 * var(--pxl3)))'
            listsMenu.style.opacity = 0
            listsMenu.style.pointerEvents = 'none'
            window.isOpen_listsMenu = false

        } else if (event.target.matches('#open-lists-menu-button')) {
            if (listsMenu.style.opacity == 0) {
                listsMenu.style.transform = 'translateY(var(--pxl2)) translateX(calc(-1 * var(--pxl3)))'
                listsMenu.style.opacity = 1
                listsMenu.style.pointerEvents = 'all'
            } else {
                listsMenu.style.transform = 'translateY(calc(-1 * var(--pxl2))) translateX(calc(-1 * var(--pxl3)))'
                listsMenu.style.opacity = 0
                listsMenu.style.pointerEvents = 'none'
            }

            window.isOpen_listsMenu = !window.isOpen_listsMenu
        }
    })

    document.getElementById("mini-menu-players-link").onclick = () => { openLink("players.html") }
    document.getElementById("mini-menu-demonlist-link").onclick = () => { openLink("demonlist.html") }
    document.getElementById("mini-menu-challengelist-link").onclick = () => { openLink("challengelist.html") }
    document.getElementById("mini-menu-platformerlist-link").onclick = () => { openLink("platformerlist.html") }

    document.getElementById("mini-menu-news-link").onclick = () => { openLink("news.html") }
    document.getElementById("mini-menu-rules-discord-link").onclick = () => { openLink("https://github.com/ItZZefirfy/quantum/blob/main/data/rules-discord.md", "_blank") }
    document.getElementById("mini-menu-rules-gdps-link").onclick = () => { openLink("https://github.com/ItZZefirfy/quantum/blob/main/data/rules-gdps.md", "_blank") }
    document.getElementById("mini-menu-settings-link").onclick = () => { openLink("settings.html") }
    document.getElementById("mini-menu-send-progress").onclick = () => { openLink("") }
}