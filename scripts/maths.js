function calculateLevelScore(levelPosition, totalLevels) {
    if (levelPosition < 1 || levelPosition > totalLevels) {
        console.error(`Некорректная позиция уровня. ${levelPosition}/${totalLevels}`)
        return 0
    }

    const maxScore = 1000
    const minScore = 1

    const score = Math.round(maxScore - (maxScore - minScore) * Math.pow((levelPosition - 1) / (totalLevels), 0.66));

    return score
}

function calculateProgressScore(maxScore, percent) {
    const minScore = 40
    const minPart = 10
    const coefficient = 0.1

    const result = Math.round(
        Math.pow(maxScore,
        1 / Math.pow(101 - percent, coefficient)
    ))

    if (result < minScore || result < maxScore / minPart) {
        return 0
    }

    return result
}

function calculatePlayerLevel(score) {
    const power = 1.5
    const coefficient = 10

    var level = 1
    var scoreForLevel;
    while (true) {
        scoreForLevel = Math.round(Math.pow(level, power)) + coefficient * level
        if (score < scoreForLevel) break // выход из цикла, если очков не хватает
        score -= scoreForLevel
        level += 1
    }

    return [level, score, scoreForLevel]
}