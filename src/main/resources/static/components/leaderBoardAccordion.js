function playAccordion(node, data) {

    console.table(data);
    let score = new ScoreInfo(data.score, data.date, data.routeDirections, data.routeCoordinates, );

    if (!node.classList.contains('expanded-row')) {

        accordionElementRouteDetails = document.createElement("tr");
        accordionElementRouteDetails.classList.add("leaderboard-row");

        levelMap = document.createElement("td");
        levelMap.colSpan = "5";

        for (let r = 0; r < 15; r++) {
            let row = document.createElement("div");


            for (let c = 0; c < 30; c++) {
                let col = document.createElement("div");
                col.dataset.x = r;
                col.dataset.y = c;
                col.classList.add("cell-small");
                row.appendChild(col);
            }

            levelMap.appendChild(row);
        }

        accordionElementRouteDetails.appendChild(levelMap);
        node.parentNode.insertBefore(accordionElementRouteDetails, node.nextSibling);




        accordionElementScoreDetails = document.createElement("tr");
        accordionElementScoreDetails.classList.add("leaderboard-row");
        accordionElementScoreDetails.innerHTML = `
            <td>
                <div class="star"><i class="fa-solid fa-star gold"></i></div>
            </td>
            <td></td>
            <td>data.score</td>
            <td>data.date</td>
            <td>data.date</td>`;

        node.parentNode.insertBefore(accordionElementScoreDetails, node.nextSibling);







        node.classList.add('expanded-row');
    } else {

        node.nextSibling.remove();

        node.classList.remove('expanded-row');
    }
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