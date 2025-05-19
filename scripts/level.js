function drawLevel(levelName, author, previewLink, videoLink, position) {
    let levelsWrapper = document.getElementById("levels-wrapper")

    let level = `<div class="level">
                    <img src="${previewLink}" alt="level preview" class="level-element" 
                        onclick="window.open('${videoLink}', '_blank')">
                    <div class="level-text-wrapper level-element">
                        <h1 class="level-main-text"><span class="level-name-secondary-text"> #${position} </span>${levelName}</h1>
                        <h3 class="level-secondary-text">by ${author}</h3>
                    </div>
                </div>`
    
    
    levelsWrapper.innerHTML += level
}

function generateLevels(type) {
    var levels = []
    if (type == "demons"){
        levels = JSON.parse(sessionStorage.data).demonlist
    } else if (type == "challenges"){
        levels = JSON.parse(sessionStorage.data).challengelist
    } else if (type == "platformers"){
        levels = JSON.parse(sessionStorage.data).platformerlist
    }

    var preview

    for (let i = 0; i < levels.length; i++) {
        if (levels[i].customPreview == false) {
            if (levels[i].previewFormat == false) {
                preview = links.dataPath + links.previewsFolder + 
                    levels[i].id + defaultFormats.levelPreview
                console.log(preview)
                console.log(1)
            } else {
                preview = links.dataPath + links.previewsFolder + 
                    levels[i].id + levels[i].previewFormat
                console.log(preview)
                console.log(2)
            }
        } else {
            preview = levels[i].customPreview
            console.log(preview)
            console.log(3)
        }


        drawLevel(
            levels[i].name,
            levels[i].creator,
            preview,
            levels[i].videoLink,
            i + 1
        )
    }
}