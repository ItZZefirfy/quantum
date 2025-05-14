function drawPlayer(name, displayName, icon, position, points) {
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
}