
//Animated battle
let emby;
let draggle;
let renderedSprites;
let queue

let battleAnimationId

function initBattle() {
    document.querySelector("#userInterface").style.display = "block"
    document.querySelector(".quoteText").style.display = "none"
    document.querySelector(".enemyHealthBar").style.width = "100%"
    document.querySelector(".playerHealthBar").style.width = "100%"
    document.querySelector("#attacks").replaceChildren()

    draggle = new Monster(monsters.Draggle)
    emby = new Monster(monsters.Emby)
    renderedSprites = [draggle, emby]
    queue = []

    emby.attacks.forEach(attack => {
        const button = document.createElement("button");
        button.innerHTML = attack.name
        document.querySelector("#attacks").append(button)
    })

    //Attack buttons


    document.querySelectorAll("button").forEach(b => {
        b.addEventListener("click", (e) => {

            const selectedAttack = attacks[e.currentTarget.innerHTML]

            emby.attack({
                attack: selectedAttack,
                recipient: draggle,
                renderedSprites
            })

            if (draggle.health <= 0) {
                audio.Victory.play()
                audio.Battle.stop()
                queue.push(() => {
                    draggle.faint({ enemy: draggle, fainted: draggle.name, position: draggle.position })
                })
                queue.push(() => {
                    gsap.to("#blackScreen", {
                        opacity: 1,
                        onComplete: () => {
                            cancelAnimationFrame(battleAnimationId)
                            animate()
                            document.querySelector("#userInterface").style.display = "none"

                            gsap.to("#blackScreen", {
                                opacity: 0,
                            })
                            battle.initiated = false
                            audio.Map.play()
                        }
                    })
                })
            }

            const randomAttack = draggle.attacks[Math.floor(Math.random() * draggle.attacks.length)]
            queue.push(() => {
                draggle.attack({
                    attack: randomAttack,
                    recipient: emby,
                    renderedSprites
                })

                if (emby.health <= 0) {

                    queue.push(() => {
                        emby.faint({ enemy: emby, fainted: emby.name, position: emby.position })
                    })
                    queue.push(() => {
                        gsap.to("#blackScreen", {
                            opacity: 1,
                            onComplete: () => {
                                audio.Lose.play()
                                audio.Battle.stop()
                                window.cancelAnimationFrame(battleAnimationId)
                                animate()
                                document.querySelector("#userInterface").style.display = "none"

                                gsap.to("#blackScreen", {
                                    opacity: 0,
                                })

                                battle.initiated = false
                            }
                        })
                    })
                }
            })
        })

        b.addEventListener("mouseenter", (e) => {
            const selectedAttack = attacks[e.currentTarget.innerHTML]
            const type = document.querySelector("#attackType")
            type.innerHTML = selectedAttack.type;
            type.style.color = selectedAttack.color
        })
    })
}

function animateBattle() {
    battleAnimationId = window.requestAnimationFrame(animateBattle)
    battleBackground.draw()
    // console.log(battleAnimationId)

    renderedSprites.forEach(sprite => {
        sprite.draw()
    })
}

document.querySelector(".quoteText").addEventListener("click", (e) => {
    if (queue.length > 0) {
        queue[0]()
        queue.shift()
    }
    else e.currentTarget.style.display = "none"
})