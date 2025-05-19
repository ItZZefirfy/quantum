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