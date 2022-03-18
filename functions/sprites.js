/* SPRITES ANIMATION */
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d")

canvas.width = 1024;
canvas.height = 576;

const player = new Sprite({
    position: {
        x: canvas.width / 2 - 192 / 4 / 2,
        y: canvas.height / 2 - 68 / 4
    },
    image: playerDownImage,
    frames: {
        max: 4,
        hold: 10
    },
    sprites: {
        up: playerUpImage,
        left: playerLeftImage,
        right: playerRightImage,
        down: playerDownImage,
    }
})

const background = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: image,

})

const foreground = new Sprite({
    position: {
        x: offset.x,
        y: offset.y,
    },
    image: foregroundImage,
})

const battleBackground = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    image: battleBackgroundImage,
})

