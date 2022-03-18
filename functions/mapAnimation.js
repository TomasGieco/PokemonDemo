const battle = {
    initiated: false
}

const movables = [background, ...boundaries, foreground, ...battles]

const velocity = 10;

function animate() {
    const animationId = window.requestAnimationFrame(animate)
    background.draw()

    boundaries.forEach(boundary => {
        boundary.draw()
    })

    battles.forEach(spot => {
        spot.draw()
    })

    player.draw()
    foreground.draw()

    let moving = true;
    player.moving = false;

    if (battle.initiated) {
        return
    }

    if (keys.w.pressed || keys.a.pressed || keys.s.pressed || keys.d.pressed) {
        for (let i = 0; i < battles.length; i++) {
            const spot = battles[i]

            const overlappingArea =
                (Math.min(
                    player.position.x + player.width,
                    spot.position.x + spot.width
                ) - Math.max(player.position.x, spot.position.x))
                *
                (Math.min(
                    player.position.y + player.height,
                    spot.position.y + spot.height
                ) - Math.max(player.position.y, spot.position.y))

            if (rectangularCollision({
                rectangle1: player,
                rectangle2: spot
            }) && overlappingArea > (player.width * player.height) / 2 && Math.random() < 0.01
            ) {
                //desactivate animation
                window.cancelAnimationFrame(animationId)
                battle.initiated = true;

                audio.Map.stop()
                audio.InitBattle.play()
                audio.Battle.play()

                gsap.to("#blackScreen", {
                    opacity: 1,
                    repeat: 3,
                    yoyo: true,
                    duration: 0.4,
                    onComplete() {
                        gsap.to("#blackScreen", {
                            opacity: 1,
                            duration: 0.4,
                            onComplete() {
                                //Animate battle animation
                                initBattle()
                                animateBattle()
                                gsap.to("#blackScreen", {
                                    opacity: 0,
                                    duration: 0.4,
                                })
                            }
                        })

                    }
                })

                break;
            }
        }
    }

    if (keys.w.pressed) {
        player.moving = true;
        player.image = player.sprites.up;

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y + velocity
                    }
                }
            })) {
                console.log("colliding")
                moving = false;
                break;
            }
        }



        if (moving) {
            movables.forEach(mov => {
                mov.position.y += velocity
            })
        }
    }

    else if (keys.a.pressed) {
        player.moving = true;
        player.image = player.sprites.left;

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x + velocity,
                        y: boundary.position.y
                    }
                }
            })) {
                console.log("colliding")
                moving = false;
                break;
            }
        }
        if (moving) {
            movables.forEach(mov => {
                mov.position.x += velocity
            })
        }

    }

    else if (keys.s.pressed) {
        player.moving = true;
        player.image = player.sprites.down;

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x,
                        y: boundary.position.y - velocity
                    }
                }
            })) {
                console.log("colliding")
                moving = false;
                break;
            }
        }
        if (moving) {
            movables.forEach(mov => {
                mov.position.y -= velocity
            })
        }

    }

    else if (keys.d.pressed) {
        player.moving = true;
        player.image = player.sprites.right;

        for (let i = 0; i < boundaries.length; i++) {
            const boundary = boundaries[i]
            if (rectangularCollision({
                rectangle1: player,
                rectangle2: {
                    ...boundary, position: {
                        x: boundary.position.x - velocity,
                        y: boundary.position.y
                    }
                }
            })) {
                console.log("colliding")
                moving = false;
                break;
            }
        }
        if (moving) {
            movables.forEach(mov => {
                mov.position.x -= velocity
            })
        }

    }

}