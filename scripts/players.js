function drawPlayer(name, displayName, icon, position, points) {
    let playerWrapper = document.getElementById("player-wrapper")
    
    let iconLink

    if (icon == false) {
        iconLink = links.dataPath + links.iconsFolder + "--default--.png"
    } else if (icon == true) {
        iconLink = links.dataPath + links.iconsFolder 
                   + name + defaultFormats.playerIcon
    } else {
        iconLink = icon
    }

    let playerGui = `
        <div class="player" onclick="openPlayerInfo('${name}')">
            <img height="100px" src="${iconLink}" alt="player-icon">
            <div class="player-name-wrapper">
                <h1><span>#${position} </span>${displayName}</h1>
                <h3>${points} очков</h3>
            </div>
        </div>
    `

    playerWrapper.innerHTML += playerGui
}

function generatePlayers() {
    var players = JSON.parse(sessionStorage.data).players
    var records = JSON.parse(sessionStorage.data).progresses
    var idsToPoints = JSON.parse(sessionStorage.idsToPoints)

    var updatedPlayerList = []
    var concretePlayer

    for (let playerN = 0; playerN < players.length; playerN++) {
        concretePlayer = players[playerN]
        concretePlayer.points = 0
        for (let i = 0; i < records.length; i++) {
            if (records[i].player == concretePlayer.name) {
                concretePlayer.points += calculateProgressScore(idsToPoints[records[i].id], records[i].percent)
            }
        }
        updatedPlayerList.push(concretePlayer)
    }

    updatedPlayerList.sort((a, b) => b.points-a.points)

    var playerIcon

    for (let i = 0; i < updatedPlayerList.length; i++) {
        if (updatedPlayerList[i].icon == false) {
            playerIcon = links.dataPath + links.iconsFolder + '--default--.png'
        } else if (updatedPlayerList[i].icon == true) {
            playerIcon = links.dataPath + links.iconsFolder + 
                         updatedPlayerList[i].name + defaultFormats.playerIcon
        } else {
            playerIcon = updatedPlayerList[i].icon
        }


        drawPlayer(
            updatedPlayerList[i].name,
            updatedPlayerList[i].displayName,
            playerIcon,
            i+1,
            updatedPlayerList[i].points
        )
    }
}

function addPlayerInfo(player, 
                       records,
                       demonlist,
                       challengelist,
                       platformerlist) {

    var points = 0
    var idsToPoints = JSON.parse(sessionStorage.idsToPoints)
    var playerLevels = ''
    var concreteLevel = -1
    var levelPreview = ''

    for (let i = 0; i < records.length; i++) {
        if (player.name == records[i].player) {
            points += calculateProgressScore(idsToPoints[records[i].id], records[i].percent)

            // searching
            concreteLevel = concreteLevel == -1 ? searchByLevelID(records[i].id, demonlist, type="level") : concreteLevel
            concreteLevel = concreteLevel == -1 ? searchByLevelID(records[i].id, challengelist, type="level") : concreteLevel
            concreteLevel = concreteLevel == -1 ? searchByLevelID(records[i].id, platformerlist, type="level") : concreteLevel

            // calculating preview link
            if (concreteLevel.customPreview == false) {
                if (concreteLevel.previewFormat == false) {
                    levelPreview = links.dataPath + links.previewsFolder + 
                        concreteLevel.id + defaultFormats.levelPreview
                } else {
                    levelPreview = links.dataPath + links.previewsFolder + 
                        concreteLevel.id + concreteLevel.previewFormat
                }
            } else {
                levelPreview = concreteLevel.customPreview
            }

            // saving player interface
            playerLevels +=`<div class="player-complied-level" onclick="openLevelInfo(${concreteLevel.id})">
                                <img src="${levelPreview}" alt="level preview" onclick="openLink('${concreteLevel.videoLink}', target='_blank')">
                                <div class="complied-level-text">
                                    <h1>${concreteLevel.name} - ${records[i].percent}%</h1>
                                    <h3>${concreteLevel.creator}</h3>
                                </div>
                            </div>`
        }
    }

    const level = calculatePlayerLevel(points)[0]
    const score = calculatePlayerLevel(points)[1]
    const scoreForLevel = calculatePlayerLevel(points)[2]

    let tier = 1

    if (level >= 10) {
        tier = 2
    } else if (level >= 10) {
        tier = 3
    } else if (level >= 20) {
        tier = 4
    } else if (level >= 25) {
        tier = 5
    } else if (level >= 30) {
        tier = 6
    }

    document.querySelector(':root').style.setProperty('--player-level-progress', Math.round(score / scoreForLevel * 100) + '%')

    const playerInfo = `<div class="player-info-wrapper">
                            <div class="user-name-wrapper">
                                <div class="player-nickname">${player.displayName}</div>
                                <div class="player-level player-level-tier-${tier}">уровень ${level}</div>
                            </div>
        
                            <div class="player-level-bar-wrapper">
                                <div class="player-level-bar">
                                    <div class="player-level-progress-bar"></div>
                                </div>
                                <div>${score} / ${scoreForLevel}</div>
                            </div>
                        </div>`

    const content = `${playerInfo}
    <div class="player-complied-levels">${playerLevels}</div>`
 
    const contentWrapper = document.getElementById("content-wrapper")
    contentWrapper.innerHTML += content
}