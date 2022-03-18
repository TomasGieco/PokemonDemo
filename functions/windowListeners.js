const keys = {
    w: {
        pressed: false
    },
    a: {
        pressed: false
    },
    s: {
        pressed: false
    },
    d: {
        pressed: false
    }
}

let clicked = false

window.addEventListener("keydown", (e) => {
    if (!clicked) {
        audio.Map.play()
        clicked = true;
    }

    switch (e.key) {
        case "w":
            keys.w.pressed = true
            break;

        case "a":
            keys.a.pressed = true
            break;

        case "s":
            keys.s.pressed = true
            break;

        case "d":
            keys.d.pressed = true
            break;
    }
})

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "w":
            keys.w.pressed = false;
            break;

        case "a":
            keys.a.pressed = false
            break;

        case "s":
            keys.s.pressed = false
            break;

        case "d":
            keys.d.pressed = false
            break;
    }
})


addEventListener("click", () => {
})