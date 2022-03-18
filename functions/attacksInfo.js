const TackleAttack = ({ attack, recipient, health, position, isEnemy }) => {
    const tl = gsap.timeline()

    recipient.health -= attack.damage

    let movementDistance = 20
    if (isEnemy) movementDistance = -20

    let healthBar = ".enemyHealthBar"
    if (isEnemy) healthBar = ".playerHealthBar"

    tl.to(position, {
        x: position.x - movementDistance,
    }).to(position, {
        x: position.x + movementDistance * 2,
        duration: 0.1,
        onComplete: () => {
            //Enemy gets hit
            audio.Tackle.play()
            gsap.to(healthBar, {
                width: recipient.health + "%"
            })

            gsap.to(recipient.position, {
                x: recipient.position.x + 10,
                yoyo: true,
                repeat: 5,
                duration: 0.08
            })
        }
    }).to(position, {
        x: position.x
    })
    return health
}

const FireballAttack = ({ attack, recipient, health, position, isEnemy }) => {

    recipient.health -= attack.damage
    audio.FireballInit.play()

    let healthBar = ".enemyHealthBar"
    if (isEnemy) healthBar = ".playerHealthBar"

    let rotationCicle = 2
    if (isEnemy) rotationCicle = -2

    const fireballImage = new Image();
    fireballImage.src = "../img/fireball.png";
    const fireball = new Sprite({
        position: {
            x: position.x,
            y: position.y
        },
        image: fireballImage,
        frames: {
            max: 4,
            hold: 10
        },
        animate: true,
        rotation: rotationCicle
    })

    renderedSprites.splice(1, 0, fireball)

    gsap.to(fireball.position, {
        x: recipient.position.x,
        y: recipient.position.y,
        onComplete: () => {
            audio.FireballHit.play()

            gsap.to(healthBar, {
                width: recipient.health + "%"
            })

            gsap.to(recipient.position, {
                x: recipient.position.x + 10,
                yoyo: true,
                repeat: 5,
                duration: 0.08
            })
            renderedSprites.splice(1, 1)

        }
    })

    return health

}