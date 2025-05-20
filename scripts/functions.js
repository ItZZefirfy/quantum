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
        info.html?type=player&levelID=${name}
    `
    openLink(link)
}