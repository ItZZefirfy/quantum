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
            sessionStorage.data = data
        })
    }
}