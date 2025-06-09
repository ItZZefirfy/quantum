function drawLevel(levelName, author, previewLink, videoLink, position, levelID) {
    let levelsWrapper = document.getElementById("levels-wrapper")

    let preview = `<img src="${previewLink}" alt="level preview" class="level-element">`

    if (videoLink != false) {
        preview = ` <div class="level-preview-wrapper" onclick="openLink('${videoLink}', '_blank')">
                        <div class="level-preview-hover-effect">
                            <i class='bx  bx-play'></i>
                        </div>
                        <img src="${previewLink}" alt="level preview" class="level-element">
                    </div>`
    }

    let level = `<div class="level" onclick="openLevelInfo(${levelID})">
                    ${preview}
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
            } else {
                preview = links.dataPath + links.previewsFolder + 
                    levels[i].id + levels[i].previewFormat
            }
        } else {
            preview = levels[i].customPreview
        }


        drawLevel(
            levels[i].name,
            levels[i].creator,
            preview,
            levels[i].videoLink,
            i + 1,
            levels[i].id
        )
    }
}

function addLevelInfo(level, records, players) {
    var idsToPoints = JSON.parse(sessionStorage.idsToPoints)
    var levelLength
    var levelPreview
    var maxLevelPoints = idsToPoints[level.id]
    

    // sorting records
    records.sort((a, b) => b.postID - a.postID)

    if (level.customPreview == false) {
        if (level.previewFormat == false) {
            levelPreview = links.dataPath + links.previewsFolder + 
                level.id + defaultFormats.levelPreview
        } else {
            levelPreview = links.dataPath + links.previewsFolder + 
                level.id + level.previewFormat
        }
    } else {
        levelPreview = level.customPreview
    }
        
    if (level.info.length[0] == 0) {
        levelLength = level.info.length[1] + 'с'
    } else {
        levelLength = level.info.length[0] + 'мин ' + level.info.length[1] + 'с'
    }
    
    var onclick = ''

    if (level.videoLink != false) {
        onclick = `onclick="openLink('${level.videoLink}', '_blank')"`
    }

    const levelInfoContent = `<div class="level-info-container">
                    <div class="level-name">${level.name}</div>
                    <img src="${levelPreview}" alt="level preview" ${onclick}>
                    <div class="level-information-wrapper">
                        <div class="level-information level-information-copy"
                            onclick="navigator.clipboard.writeText('${levelLength}')">ДЛИНА: ${levelLength}</div>
                        <div class="level-information level-information-copy"
                            onclick="navigator.clipboard.writeText('${level.creator}')">АВТОР: ${level.creator}</div>
                        <div class="level-information level-information-copy"
                            onclick="navigator.clipboard.writeText('${level.verifier}')">ВЕРИФЕР: ${level.verifier}</div>
                        <div class="level-information level-information-copy"
                            onclick="navigator.clipboard.writeText('${level.id}')">ID УРОВНЯ: ${level.id}</div>
                        <div class="level-information level-information-copy"
                            onclick="navigator.clipboard.writeText('${maxLevelPoints}')">ОЧКИ ЗА УРОВЕНЬ: ${maxLevelPoints}</div>
                        <button id="show-full-creators-list-button">Полный список креаторов</button>
                    </div>
                </div>`
    
    var victors = ''
    var victor = ''
    var victorIcon = ''
    var player
    var _players = []
    var _levels = []

    for (let i = 0; i < records.length; i++) {
        if (_players.indexOf(records[i].player) != -1 &&
            _levels.indexOf(records[i].id) != -1) {
            continue
        }
        _players.push(records[i].player)
        _levels.push(records[i].id)

        if (records[i].id == level.id && !records[i].verification) {

            victor = searchPlayerByName(records[i].player, players)
            if (victor.icon == false) {
                victorIcon = links.dataPath + links.iconsFolder + '--default--.png'
            } else if (victor.icon == true) {
                victorIcon = links.dataPath + links.iconsFolder + 
                            victor.name + defaultFormats.playerIcon
            } else {
                victorIcon = victor.icon
            }

            player = searchPlayerByName(records[i].player, players)

            victors += `
                    <div class="victor" onclick="openPlayerInfo('${records[i].player}')">
                        <img src="${victorIcon}" alt="player icon">
                        <div class="victor-text">
                            <h1>${player.displayName} - ${records[i].percent}%</h1>
                            <button onclick="openLink('${records[i].video}', '_blank')"><i class='bx  bx-play'></i>Видео</button>
                        </div>
                    </div>
            `
        }
    }
    
    const victorsWrapper = `<div class="victors-wrapper">${victors}</div>`

    const content = levelInfoContent + victorsWrapper

    const contentWrapper = document.getElementById("content-wrapper")
    contentWrapper.innerHTML += content
}