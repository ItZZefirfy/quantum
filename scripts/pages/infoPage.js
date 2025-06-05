function infoPage() {
    var linkData = parseLink()
    var data = JSON.parse(sessionStorage.data)
    
    if (linkData.type == "level") {
        var level = -1
    
        // searching
        level = level == -1 ? searchByLevelID(linkData.levelID, data.demonlist, type="level") : level
        level = level == -1 ? searchByLevelID(linkData.levelID, data.challengelist, type="level") : level
        level = level == -1 ? searchByLevelID(linkData.levelID, data.platformerlist, type="level") : level

        if (level == -1) {
            document.title = "неизвестный уровень"
            document.getElementById("loading-wrapper").style.display = "none"
            return
        }

        document.title = level.name

        // creating interface
        addLevelInfo(level, data.progresses, data.players)
    
    } else if (linkData.type == "player") {
        var player = searchPlayerByName(linkData.player, data.players)

        if (player == -1) {
            document.title = "игрок не найден"
            document.getElementById("loading-wrapper").style.display = "none"
            return
        }

        var iconLink

        if (player.icon == false) {
            iconLink = links.dataPath + links.iconsFolder + "--default--.png"
        } else if (player.icon == true) {
            iconLink = links.dataPath + links.iconsFolder 
                    + player.name + defaultFormats.playerIcon
        } else {
            iconLink = player.icon
        }

        document.title = player.displayName
        document.getElementsByTagName("link")[0].href = iconLink

        addPlayerInfo(
            player, 
            data.progresses,
            data.demonlist, 
            data.challengelist, 
            data.platformerlist
        )
    } else {
        document.title = "не удалось найти"
    }
}


infoPage()