function playAccordion(node, data) {

    console.table(data);

    if (!node.classList.contains('expanded-row')) {

        accordionElement = document.createElement("tr");
        accordionElement.classList.add("leaderboard-row");
        accordionElement.innerHTML = `
            <td>
                <div class="star"><i class="fa-solid fa-star gold"></i></div>
            </td>
            <td></td>
            <td>data.score</td>
            <td>data.date</td>
            <td>data.date</td>`;

        node.parentNode.insertBefore(accordionElement, node.nextSibling);

        node.classList.add('expanded-row');
    } else {

        node.nextSibling.remove();

        node.classList.remove('expanded-row');
    }
}