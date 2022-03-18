const collisionMap = []
for (let i = 0; i < collisions.length; i += 70) {
    collisionMap.push(collisions.slice(i, 70 + i))
}

const battleZonesMap = []
for (let i = 0; i < battleZones.length; i += 70) {
    battleZonesMap.push(battleZones.slice(i, 70 + i))
}

const boundaries = []
const offset = {
    x: -500,
    y: -800,
}

collisionMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            boundaries.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y,
                }
            }))
        }
    })
})

const battles = []

battleZonesMap.forEach((row, i) => {
    row.forEach((symbol, j) => {
        if (symbol === 1025) {
            battles.push(new Boundary({
                position: {
                    x: j * Boundary.width + offset.x,
                    y: i * Boundary.height + offset.y,
                }
            }))
        }
    })
})