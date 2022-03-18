class Sprite {
    constructor({
        position,
        image,
        frames = { max: 1, hold: 10 },
        sprites,
        animate = false,
        rotation = 0,

    }) {
        this.position = position;
        this.image = new Image();
        this.frames = { ...frames, val: 0, elapsed: 0 };
        this.image.onload = () => {
            this.width = this.image.width / this.frames.max;
            this.height = this.image.height;
        }
        this.image.src = image.src
        this.moving = animate
        this.sprites = sprites
        this.opacity = 1
        this.rotation = rotation

    }
    draw() {
        c.save()
        c.translate(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2
        )
        c.rotate(this.rotation)
        c.translate(
            -this.position.x - this.width / 2,
            -this.position.y - this.height / 2
        )
        c.globalAlpha = this.opacity
        c.drawImage(
            this.image,
            this.frames.val * this.width,
            0,
            this.image.width / this.frames.max,
            this.image.height,
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height
        )
        c.restore()

        if (!this.moving) return

        if (this.frames.max > 1) {
            this.frames.elapsed++
        }

        if (this.frames.elapsed % this.frames.hold === 0) {
            if (this.frames.val < this.frames.max - 1) this.frames.val++;
            else this.frames.val = 0;
        }
    }
}

class Monster extends Sprite {
    constructor({
        position,
        image,
        frames = { max: 1, hold: 10 },
        sprites,
        animate = false,
        rotation = 0,
        isEnemy = false,
        name,
        attacks
    }) {
        super({
            position,
            image,
            frames,
            sprites,
            animate,
            rotation,
        })
        this.health = 100
        this.isEnemy = isEnemy
        this.name = name
        this.attacks = attacks
    }
    attack({ attack, recipient, renderedSprites }) {
        document.querySelector(".quoteText").style.display = "block"
        document.querySelector(".quoteText").innerHTML = `${this.name} used ${attack.name}`

        switch (attack.name) {
            case "Tackle":
                this.health = TackleAttack({
                    attack,
                    recipient,
                    health: this.health,
                    position: this.position,
                    isEnemy: this.isEnemy
                })
                break;
            case "Fireball":
                this.health = FireballAttack({
                    attack,
                    recipient,
                    health: this.health,
                    position: this.position,
                    isEnemy: this.isEnemy,
                    renderedSprites
                })
                break;
        }
    }

    faint({ enemy, fainted, position }) {
        document.querySelector(".quoteText").innerHTML = `${fainted} fainted!`
        gsap.to(position, {
            y: position.y + 20
        })
        gsap.to(enemy, {
            opacity: 0
        })

    }
}

class Boundary {
    static width = 48;
    static height = 48;
    constructor({ position }) {
        this.position = position;
        this.width = 48;
        this.height = 48;
    }

    draw() {
        c.fillStyle = "transparent"
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}