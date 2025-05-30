function initSettings(required=false) {
    if (localStorage.initSettings == undefined || required) {
        localStorage.enableBlur = "1"

        localStorage.initSettings = "1"
    }
}

function settingsEffect() {
    if (!Number(localStorage.enableBlur)) {
        document.querySelector(":root").style.setProperty("--blur", '0px')
    }
}

function addUpdateButton() {
    const updateDataButton = `
        <button class="reload-bd-button" 
            onclick="updateData(true)">
            <i class='bx bx-refresh bx-flip-horizontal'></i>
        </button>
    `
    document.body.innerHTML += updateDataButton
}

function parseLink() {
    const link = location.href
    const staticData = link.split("?")[1].split('&')
    var data = {}

    for (let i = 0; i < staticData.length; i++) {
        data = Object.assign(
            {},
            data, 
            {
                [staticData[i].split("=")[0]]:staticData[i].split("=")[1]
            }
        )
    }

    return data
}

function openLink(href, target="_self") {
    let locationHref = location.href.split("/")
    if (href != locationHref[locationHref.length - 1]) {
        window.open(href, target)
    }
}

function openLevelInfo(id) {
    let link = `
        info.html?type=level&levelID=${id}
    `
    openLink(link)
}

function openPlayerInfo(name) {
    let link = `
        info.html?type=player&player=${name}
    `
    openLink(link)
}

// <button class="send-button"><i class='bx bx-send'></i><div class="send-button-text">Отправить прохождение</div></button>