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
        <div class="player">
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
                concretePlayer.points += idsToPoints[records[i].id]
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