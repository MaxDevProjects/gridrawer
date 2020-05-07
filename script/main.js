import {
    fix_dpi
} from './config.js'
// creation d'une table de drunkart vide

// génération du nombre de drunkart au démarrage

// position initiale des drunkart
// ##############################
//Creation des éléments du jeu
// ##############################

//création du jeu si context.
if (canvas.getContext) {
    // Variables d'initialisations
    const context = canvas.getContext('2d');
    let tileSize = 32
    let grid = []
    let nbLine = 18
    let nbCol = 18
    let randomly = false

    // Variables de DOM (ids)
    let editTileSize = document.getElementById('tileSize')
    let btnRandomiser = document.getElementById('randomly')
    let editNbCol = document.getElementById('nbCol')
    let editNbLine = document.getElementById('nbLine')
    let gridCode = document.getElementById('grid-code');
    let genCodeText = document.getElementById('genCode')

    // variables de générations
    let gridItemValue = 0
    let mouseGridX = 0
    let mouseGridY = 0
    let mouseMove = false
    let mouseClick = false

    // initialisation des valeurs par défauts
    let init = () => {
        // Gestionnaire de ratio (ce systeme permet de palier à la pixelisation des éléments vecto 
        // lors du chargement et durant toute la gameloop dans le canvas)
        fix_dpi();
        editNbLine.value = nbLine
        editNbCol.value = nbCol

    }

    editTileSize.addEventListener('input', () => {
        tileSize = editTileSize.value
        document.getElementById('tileSizeValue').innerText = ` : ${tileSize}`
    })

    btnRandomiser.addEventListener('click', () => {
        randomly = true
        generateGrid(randomly)
        console.log(randomly);
    })

    editNbLine.addEventListener('input', () => {
        nbLine = editNbLine.value
        document.getElementById('nbLineValue').innerText = ` : ${nbLine}`
        randomly = false
        generateGrid(randomly)
    })

    editNbCol.addEventListener('input', () => {
        nbCol = editNbCol.value
        document.getElementById('nbColValue').innerText = ` : ${nbCol}`
        randomly = false
        generateGrid(randomly)
    })

    let generateGridCode = async () => {
        gridCode.innerText = `let theGrid = \n`
        for (let l = 0; l < nbLine; l++) {
            gridCode.innerText += `[`
            for (let c = 0; c < nbCol; c++) {
                if (grid[l][c] == 255) {
                    gridItemValue = 1
                } else {
                    gridItemValue = 0
                }
                if (c < nbCol - 1) {
                    gridCode.innerText += `${gridItemValue},`
                } else {
                    gridCode.innerText += `${gridItemValue}`
                }
            }
            if (l < nbLine - 1) {
                gridCode.innerText += `], \n`
            } else {
                gridCode.innerText += `] \n`
            }

        }
    }
    let generateGrid = async (randomly = false) => {
        grid = []
        for (let l = 0; l < nbLine; l++) {
            grid[l] = new Array()
            for (let c = 0; c < nbCol; c++) {
                if (randomly) {
                    grid[l][c] = Math.floor(Math.random() * 255)
                } else {
                    grid[l][c] = 255
                }
                if (grid[l][c] < 123) {
                    grid[l][c] = 0
                } else {
                    grid[l][c] = 255
                }
            }
        }
    }

    genCodeText.addEventListener('click', () => {
        generateGridCode()
    })

    let load = () => {
        init()
        document.getElementById('tileSizeValue').innerText = ` : ${tileSize}`
        document.getElementById('nbLineValue').innerText = ` : ${nbLine}`
        document.getElementById('nbColValue').innerText = ` : ${nbCol}`
        generateGrid()
    }

    load() 

    let drawGrid = () => {
        for (let l = 0; l < grid.length; l++) {
            for (let c = 0; c < grid[l].length; c++) {
                let color = grid[l][c]
                context.strokeStyle = `rgb(${color},${color},${color})`;
                context.strokeRect(c * tileSize, l * tileSize, tileSize, tileSize);
            }
        }
    }

    let getCursorPosition = (event) => {
        let clientRect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - clientRect.left,
            y: event.clientY - clientRect.top
        }
    }


    
    canvas.addEventListener('mousemove', (event) => {
        let mousePos = getCursorPosition(event)
        mouseGridX = Math.floor(mousePos.x / tileSize)
        mouseGridY = Math.floor(mousePos.y / tileSize)
        mouseMove = true
        // console.log(`${mouseGridX}  /  ${mouseGridY}`);
    })

    

    let hover = async () => {

        for (let l = 0; l < nbLine; l++) {
            const line = grid[l];
            for (let c = 0; c < nbCol; c++) {
                let element = grid[l][c];
                try {
                    if (element == grid[mouseGridY][mouseGridX]) {
                        context.fillStyle = 'rgb(255,255,255)';
                        context.fillRect(mouseGridX * tileSize + 1, mouseGridY * tileSize + 1, tileSize - 2, tileSize - 2);
                    } else {
                        // do nothing
                    }
                } catch (error) {
                    return error;
                }
            }
        }
    }

    canvas.addEventListener('mousedown', (event) => {
        let mousePos = getCursorPosition(event)
        mouseGridX = Math.floor(mousePos.x / tileSize)
        mouseGridY = Math.floor(mousePos.y / tileSize)
        mouseClick = true
        console.log(event + ' ' + mouseClick);
        let element = grid[mouseGridY][mouseGridX]
        if(element == grid[mouseGridY][mouseGridX]) {
            if(grid[mouseGridY][mouseGridX] == 255) {
                grid[mouseGridY][mouseGridX] = 0
            } else {
                grid[mouseGridY][mouseGridX] = 255
            }
        }
    })

    canvas.addEventListener('mouseup', () => {
        mouseClick = false
        console.log(mouseClick);
    })

    let update = () => {}

    let draw = () => {
        drawGrid()
        hover()
    }
    let animate = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        update();
        draw()
        requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
} else {
    `<p>Désolé mais ton navigateur n'accepte pas le truc de fou que je voulais te montrer</p>`
}