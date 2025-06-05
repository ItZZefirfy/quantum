function drawNews(filter="none") {
    var data = JSON.parse(sessionStorage.data)
    var content
    var uiContent = ''

    if (filter == "none") {
        content = data.news.concat(data.progresses)
    } else if (filter == "records") {
        content = data.progresses
    } else if (filter == "news") {
        content = data.news
    } else {
        return
    }

    content.sort((a, b) => b.postID - a.postID)

    var level
    var player
    var playerIcon
    var videoButton

    for (let i = 0; i < content.length; i++) {
        if (content[i].content != undefined) {
            uiContent += `
                <div class="news-post">${content[i].content}</div>
            `
        } else {
            level = -1
            level = level == -1 ? searchByLevelID(content[i].id, data.demonlist, type="level") : level
            level = level == -1 ? searchByLevelID(content[i].id, data.challengelist, type="level") : level
            level = level == -1 ? searchByLevelID(content[i].id, data.platformerlist, type="level") : level
            
            player = searchPlayerByName(content[i].player, 
                                        data.players)

            if (player.icon == false) {
                playerIcon = links.dataPath + links.iconsFolder + "--default--.png"
            } else if (player.icon == true) {
                playerIcon = links.dataPath + links.iconsFolder 
                        + player.name + defaultFormats.playerIcon
            } else {
                playerIcon = player.icon
            }

            if (content[i].video != false) {
                videoButton = `
                    <button class="news-record-video-button" onclick="openLink('${content[i].video}', '_blank')">
                        <i class='bx  bx-play'></i>
                        <div>Видео</div>
                    </button>
                `
            } else {
                videoButton = ''
            }


            if (content[i].verification) {
                uiContent += `
                    <div class="news-record">
                        <div class="record-text">
                            Игрок <button class="news-record-player-profile-button" onclick="openPlayerInfo('${player.name}')">
                                <img src="${playerIcon}" alt="player-icon">
                                <div>${player.displayName}</div>
                            </button> 
                            верифицирует <button class="news-record-level-link-button" onclick="openLevelInfo(${level.id})">
                               <div>${level.name}</div>
                            </button>
                        </div>
                        ${videoButton}
                    </div>
                `
            } else if (content[i].percent == 100) {
                uiContent += `
                    <div class="news-record">
                        <div class="record-text">
                            Игрок <button class="news-record-player-profile-button" onclick="openPlayerInfo('${player.name}')">
                                <img src="${playerIcon}" alt="player-icon">
                                <div>${player.displayName}</div>
                            </button> 
                            проходит <button class="news-record-level-link-button" onclick="openLevelInfo(${level.id})">
                            <div>${level.name}</div>
                            </button>
                        </div>
                        ${videoButton}
                    </div>
                `
            } else {
                uiContent += `
                    <div class="news-record">
                        <div class="record-text">
                            Игрок <button class="news-record-player-profile-button" onclick="openPlayerInfo('${player.name}')">
                                <img src="${playerIcon}" alt="player-icon">
                                <div>${player.displayName}</div>
                            </button> 
                            проходит <button class="news-record-level-link-button" onclick="openLevelInfo(${level.id})">
                            <div>${level.name}</div>
                            </button> на ${content[i].percent}%
                        </div>
                        ${videoButton}
                    </div>
                `
            }
        }
    }

    document.getElementById("news-wrapper").innerHTML += uiContent

    return content
}

drawNews()