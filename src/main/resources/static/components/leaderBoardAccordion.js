function playAccordion(clickedNode, data) {

    let score = new ScoreInfo(data.score, data.date, data.routeDirections, data.routeCoordinates, );
    console.table(score);


    if (!clickedNode.classList.contains('expanded-row')) {

        clearExpandedRows();

        let levelMapRow = createLeaderBoardRow();
        levelMapRow.appendChild(createLevelMapDetailsContainer());
        clickedNode.parentNode.insertBefore(levelMapRow, clickedNode.nextSibling);

        // let scoreDetailsRow = createLeaderBoardRow();
        // scoreDetailsRow.innerHTML = createScoreDetailsHeaderContainer(score);
        // clickedNode.parentNode.insertBefore(scoreDetailsRow, clickedNode.nextSibling);

        clickedNode.classList.add('expanded-row');

        mapScoreCoordinatesToTable(score);



    } else if (clickedNode.classList.contains('expanded-row')) {

        clickedNode.nextSibling.remove();
        clickedNode.nextSibling.remove();
        clickedNode.nextSibling.remove();
        clickedNode.classList.remove('expanded-row');

    }

}

function clearExpandedRows() {
    const rows = document.getElementsByClassName('expanded-row');
    Array.from(rows).forEach(r => {
        r.classList.remove('expanded-row');
    });

    const detailRows = document.getElementsByClassName('leaderboard-row-detail');
    Array.from(detailRows).forEach(r => {
        r.remove();
    });

}

function mapScoreCoordinatesToTable(score) {

    const heatMapGradient = gradient('#c9eb34', '#eb3434', score.coordinates.length);

    score.coordinates.forEach((coordinate, index) => {

        let cell = document.querySelector(`td[data-x="${coordinate[0]}"][data-y="${coordinate[1]}"]`);

        if (null !== cell) {
            cell.style.backgroundColor = String(heatMapGradient[index]);
        }

    });


}

function createLeaderBoardRow() {
    row = document.createElement("tr");
    row.classList.add("leaderboard-row-detail");
    return row;
}

function createLevelMapDetailsContainer() {

    levelMapContainer = document.createElement("td");
    levelMapContainer.colSpan = "5";

    levelMapTable = document.createElement("table");
    levelMapTable.classList.add('level-map-table');
    levelMapContainer.appendChild(levelMapTable);

    for (let r = 0; r < 15; r++) {
        let row = document.createElement("tr");


        for (let c = 0; c < 30; c++) {
            let col = document.createElement("td");
            col.dataset.x = r;
            col.dataset.y = c;
            col.classList.add("cell-small");
            row.prepend(col);
        }

        levelMapTable.appendChild(row);
    }

    return levelMapContainer;
}

function createScoreDetailsHeaderContainer(score) {

    return `
        <td colspan="5">
            <div class="text-center">Heat Map</div>
        </td>
        `;

}

class ScoreInfo {

    constructor(points, date, directions, coordinates) {
        this.points = points;
        this.date = date;
        this.directions = this.parseData(directions);
        this.coordinates = this.parseData(coordinates);
    }

    parseData(data) {
        let dataPoints = data.split("+");

        if (dataPoints.length > 1 && dataPoints[1].includes(",")) {
            let _dataPoints = new Array();
            dataPoints.forEach(e => {
                _dataPoints.push(e.split(","));
            })
            dataPoints = _dataPoints;
        }

        return dataPoints;
    }
}

// *** https://stackoverflow.com/questions/12934720/how-to-increment-decrement-hex-color-values-with-javascript-jquery ***
function gradient(startColor, endColor, steps) {
    var start = {
        'Hex': startColor,
        'R': parseInt(startColor.slice(1, 3), 16),
        'G': parseInt(startColor.slice(3, 5), 16),
        'B': parseInt(startColor.slice(5, 7), 16)
    }
    var end = {
        'Hex': endColor,
        'R': parseInt(endColor.slice(1, 3), 16),
        'G': parseInt(endColor.slice(3, 5), 16),
        'B': parseInt(endColor.slice(5, 7), 16)
    }
    diffR = end['R'] - start['R'];
    diffG = end['G'] - start['G'];
    diffB = end['B'] - start['B'];

    stepsHex = new Array();
    stepsR = new Array();
    stepsG = new Array();
    stepsB = new Array();

    for (var i = 0; i <= steps; i++) {
        stepsR[i] = start['R'] + ((diffR / steps) * i);
        stepsG[i] = start['G'] + ((diffG / steps) * i);
        stepsB[i] = start['B'] + ((diffB / steps) * i);
        stepsHex[i] = '#' + Math.round(stepsR[i]).toString(16) + '' + Math.round(stepsG[i]).toString(16) + '' + Math.round(stepsB[i]).toString(16);
    }
    return stepsHex;

}