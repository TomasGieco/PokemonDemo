const audio = {
    Map: new Howl({
        src: "../audio/map.wav",
        html5: true,
        volume: 0.5
    }),
    InitBattle: new Howl({
        src: "../audio/initBattle.wav",
        html5: true,
        volume: 0.1
    }),
    Battle: new Howl({
        src: "../audio/battle.mp3",
        html5: true,
        volume: 0.1
    }),
    Tackle: new Howl({
        src: "../audio/tackleHit.wav",
        html5: true,
        volume: 0.1
    }),
    FireballHit: new Howl({
        src: "../audio/fireballHit.wav",
        html5: true,
        volume: 0.1
    }),
    FireballInit: new Howl({
        src: "../audio/initFireball.wav",
        html5: true,
        volume: 0.1
    }),
    Victory: new Howl({
        src: "../audio/victoryff.wav",
        html5: true,
        volume: 0.1
    }),
    Lose: new Howl({
        src: "../audio/lose.wav",
        html5: true,
        volume: 0.5
    })
}