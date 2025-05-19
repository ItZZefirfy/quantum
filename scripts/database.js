const links = {
    "dataPath": "data/",
    "iconsFolder": "icons/",
    "previewsFolder": "previews/",
    "dataBaseFile": "data.json"
}

const defaultFormats = {
    "levelPreview": ".png",
    "playerIcon": ".png"
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
        info.html?type=player&levelID=${name}
    `
    openLink(link)
}

function searchByLevelID(id, list, type='index') {
    for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
            if (type == "index") {
                return i
            } else if (type == "level") {
                return list[i]
            }
        }
    }
    
    return -1
}

function updateData(updateRequired=false) {
    if (sessionStorage.data == undefined || updateRequired == true) {
        fetch(links.dataPath + links.dataBaseFile)
        .then(data => data.text())
        .then(data => {
            var jsonData = JSON.parse(data)
            var idsToPoints = {}
            var concreteLevel
            var score
            var concreteLevel_idToPoints

            // calculation dict | levelId: points 
            // demons
            for (let i = 0; i < jsonData.demonlist.length; i++) {
                concreteLevel = jsonData.demonlist[i]
                score = calculateLevelScore(i+1, jsonData.demonlist.length)
                concreteLevel_idToPoints = {
                    [concreteLevel.id]: score
                }

                idsToPoints = Object.assign(
                    {}, 
                    idsToPoints, 
                    concreteLevel_idToPoints 
                )
            }

            // challenges
            for (let i = 0; i < jsonData.challengelist.length; i++) {
                concreteLevel = jsonData.challengelist[i]
                score = calculateLevelScore(i+1, jsonData.challengelist.length)
                concreteLevel_idToPoints = {
                    [concreteLevel.id]: score
                }

                idsToPoints = Object.assign(
                    {}, 
                    idsToPoints, 
                    concreteLevel_idToPoints 
                )
            }

            // platformers
            for (let i = 0; i < jsonData.platformerlist.length; i++) {
                concreteLevel = jsonData.platformerlist[i]
                score = calculateLevelScore(i+1, jsonData.platformerlist.length)
                concreteLevel_idToPoints = {
                    [concreteLevel.id]: score
                }

                idsToPoints = Object.assign(
                    {}, 
                    idsToPoints, 
                    concreteLevel_idToPoints 
                )
            }
            
            // saving data in sessionStorage
            sessionStorage.idsToPoints = JSON.stringify(idsToPoints)
            sessionStorage.data = data
        })
    }
}