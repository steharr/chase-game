const sj = {
    "frames": {
        "enemy-move-right0.png": {
            "frame": {
                "x": 0,
                "y": 0,
                "w": 32,
                "h": 32
            },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": {
                "x": 0,
                "y": 0,
                "w": 32,
                "h": 32
            },
            "sourceSize": {
                "w": 32,
                "h": 32
            }
        },
        "enemy-move-right1.png": {
            "frame": {
                "x": 32,
                "y": 0,
                "w": 32,
                "h": 32
            },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": {
                "x": 0,
                "y": 0,
                "w": 32,
                "h": 32
            },
            "sourceSize": {
                "w": 32,
                "h": 32
            }
        },
        "enemy-move-right2.png": {
            "frame": {
                "x": 64,
                "y": 0,
                "w": 32,
                "h": 32
            },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": {
                "x": 0,
                "y": 0,
                "w": 32,
                "h": 32
            },
            "sourceSize": {
                "w": 32,
                "h": 32
            }
        },
        "enemy-move-right3.png": {
            "frame": {
                "x": 0,
                "y": 32,
                "w": 32,
                "h": 32
            },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": {
                "x": 0,
                "y": 0,
                "w": 32,
                "h": 32
            },
            "sourceSize": {
                "w": 32,
                "h": 32
            }
        },
        "enemy-move-right4.png": {
            "frame": {
                "x": 32,
                "y": 32,
                "w": 32,
                "h": 32
            },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": {
                "x": 0,
                "y": 0,
                "w": 32,
                "h": 32
            },
            "sourceSize": {
                "w": 32,
                "h": 32
            }
        },
        "enemy-move-right5.png": {
            "frame": {
                "x": 64,
                "y": 32,
                "w": 32,
                "h": 32
            },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": {
                "x": 0,
                "y": 0,
                "w": 32,
                "h": 32
            },
            "sourceSize": {
                "w": 32,
                "h": 32
            }
        },
        "enemy-move-right6.png": {
            "frame": {
                "x": 0,
                "y": 64,
                "w": 32,
                "h": 32
            },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": {
                "x": 0,
                "y": 0,
                "w": 32,
                "h": 32
            },
            "sourceSize": {
                "w": 32,
                "h": 32
            }
        },
        "enemy-move-right7.png": {
            "frame": {
                "x": 32,
                "y": 64,
                "w": 32,
                "h": 32
            },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": {
                "x": 0,
                "y": 0,
                "w": 32,
                "h": 32
            },
            "sourceSize": {
                "w": 32,
                "h": 32
            }
        },
        "enemy-move-right8.png": {
            "frame": {
                "x": 64,
                "y": 64,
                "w": 32,
                "h": 32
            },
            "rotated": false,
            "trimmed": false,
            "spriteSourceSize": {
                "x": 0,
                "y": 0,
                "w": 32,
                "h": 32
            },
            "sourceSize": {
                "w": 32,
                "h": 32
            }
        }
    },
    "meta": {
        "app": "https://github.com/piskelapp/piskel/",
        "version": "1.0",
        "image": "enemy-move-right.png",
        "format": "RGBA8888",
        "size": {
            "w": 96,
            "h": 96
        }
    }
}

console.dir(sj);

let app = new PIXI.Application({
    width: 640,
    height: 360
});
document.body.appendChild(app.view);

// Create the sprite and add it to the stage
let player = PIXI.Sprite.from('../media/pngs/rock-4.png');
app.stage.addChild(player);




app.loader.add("character", "../media/spritesheets/enemy-move-right/enemy-move-right.png");

let tesxture = new PIXI.BaseTexture.from

const sheet = new PIXI.Spritesheet(texture, spritesheetData);
await sheet.parse();

const speed = 5;
const keyboardMap = new Map([
    ['ArrowUp', false],
    ['ArrowDown', false],
    ['ArrowLeft', false],
    ['ArrowRight', false],
])


document.addEventListener('keydown', (ev) => {
    let pressedButton = ev.code;
    if (keyboardMap.has(pressedButton)) {
        keyboardMap.set(pressedButton, true);
    }
});

document.addEventListener('keyup', (ev) => {
    let pressedButton = ev.code;
    if (keyboardMap.has(pressedButton)) {
        keyboardMap.set(pressedButton, false);
    }
});


app.ticker.add(() => {
    if (keyboardMap.get('ArrowUp')) {
        player.y -= speed;
    }
    if (keyboardMap.get('ArrowDown')) {
        player.y += speed;
    }
    if (keyboardMap.get('ArrowLeft')) {
        player.x -= speed;
    }
    if (keyboardMap.get('ArrowRight')) {
        player.x += speed;
    }
});


function getJson() {
    return fetch("../media/spritesheets/enemy-move-right/enemy-move-right.json").then(response => {
        response.json()
    })
}