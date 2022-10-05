function playAccordion(node, data) {

    let score = new ScoreInfo(data.score, data.date, data.routeDirections, data.routeCoordinates, );
    console.table(score);

    if (!node.classList.contains('expanded-row')) {

        let levelMapRow = createLeaderBoardRow();
        levelMapRow.appendChild(createLevelMapDetailsContainer());
        node.parentNode.insertBefore(levelMapRow, node.nextSibling);

        let scoreDetailsRow = createLeaderBoardRow();
        scoreDetailsRow.innerHTML = createScoreDetailsContainer(score);
        node.parentNode.insertBefore(scoreDetailsRow, node.nextSibling);

        node.classList.add('expanded-row');

        mapScoreCoordinatesToTable(score)

    } else {

        node.nextSibling.remove();
        node.classList.remove('expanded-row');
    }
}

function mapScoreCoordinatesToTable(score) {

    score.coordinates.forEach(c => {

        const cell = document.querySelector(`td[data-x="${c[0]}"][data-y="${c[1]}"]`);

        if (null !== cell) {
            cell.classList.add('cell-small-filled');
        }

    });
}

function createLeaderBoardRow() {
    row = document.createElement("tr");
    row.setAttribute('id', 'test');
    row.classList.add("leaderboard-row");
    return row;
}

function createLevelMapDetailsContainer() {

    levelMapContainer = document.createElement("td")
    levelMapContainer.colSpan = "5";

    levelMapTable = document.createElement("table");
    levelMapContainer.appendChild(levelMapTable);

    for (let r = 0; r < 15; r++) {
        let row = document.createElement("tr");


        for (let c = 0; c < 30; c++) {
            let col = document.createElement("td");
            col.dataset.x = r;
            col.dataset.y = c;
            col.classList.add("cell-small");
            row.appendChild(col);
        }

        levelMapTable.appendChild(row);
    }

    return levelMapContainer;
}

function createScoreDetailsContainer(score) {

    return `
        <td>
            <div class="star"><i class="fa-solid fa-star gold"></i></div>
        </td>
        <td></td>
        <td>data.score</td>
        <td>data.date</td>
        <td>data.date</td>`;

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