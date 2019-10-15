window.onload=function() {
    document.getElementById('get_fixture').addEventListener('submit', async function (event) {
        event.preventDefault();

        try {
            let response = await fetch('http://127.0.0.1:3000/event',
                {
                    method: "GET"
                });
            if (response.ok) {
                let body = await response.text();
                let resultsJSON = JSON.parse(body);
                document.getElementById('event').innerHTML =
                    `<span> ${resultsJSON.results[0].strFilename} </span>`;
                document.getElementById('hometeam').innerHTML =
                    `<b><span> ${resultsJSON.results[0].strHomeTeam} </span></b>` + ":" + `<span> ${resultsJSON.results[0].intHomeScore} </span>`;
                document.getElementById('homegoalscorer').innerHTML =
                    `<span> ${resultsJSON.results[0].strHomeGoalDetails} </span>`;
                document.getElementById('awayteam').innerHTML =
                    `<b><span> ${resultsJSON.results[0].strAwayTeam} </span></b>` + ":" + `<span> ${resultsJSON.results[0].intAwayScore} </span>`;
                document.getElementById('awaygoalscorer').innerHTML =
                    `<span> ${resultsJSON.results[0].strAwayGoalDetails} </span>`;
            } else {
                throw new Error("problem getting details" + response.code);
            }
        } catch (error) {
            alert("problem: " + error);
        }
    });

    document.getElementById('get_name').addEventListener('submit', async function (event) {
        event.preventDefault();

        try {
            let name = document.getElementById('firstname').value + "%20" + document.getElementById('surname').value;
            let response = await fetch('http://127.0.0.1:3000/name?name=' + name,
                {
                    method: "GET"
                });
            if (response.ok) {
                let body = await response.text();
                let playerJSON = JSON.parse(body);
                document.getElementById('player').innerHTML =
                    `<span> ${playerJSON.player[0].strPlayer} </span>`;
                document.getElementById('Nationality').innerHTML =
                    `<span> ${playerJSON.player[0].strNationality} </span>`;
                document.getElementById('Position').innerHTML =
                    `<span> ${playerJSON.player[0].strPosition} </span>`;
                document.getElementById('DOB').innerHTML =
                    `<span> ${playerJSON.player[0].dateBorn} </span>`;
                document.getElementById('POB').innerHTML =
                    `<span> ${playerJSON.player[0].strBirthLocation} </span>`;
                document.getElementById('Height').innerHTML =
                    `<span> ${playerJSON.player[0].strHeight} </span>` + "m";
                document.getElementById('Weight').innerHTML =
                    `<span> ${playerJSON.player[0].strWeight} </span>` + "kg";
                document.getElementById('picture').innerHTML =
                    `<img src = ${playerJSON.player[0].strThumb} alt = "player picture" style ="width:50%">`;
                alert(body);
            } else {
                throw new Error("problem getting details" + response.code);
            }
        } catch (error) {
            alert("problem: " + error);
        }
    });
    document.getElementById('getcom').addEventListener('click', async function (event) {
        let response = await fetch('http://127.0.01:3000/comment');
        let body = await response.text();

        document.getElementById("comment1").innerHTML = "<ul>";


        let comments = JSON.parse(body);
        for (let i = 0; i < comments.length; i++) {
            document.getElementById('comment1').innerHTML += "<li>" + comments[i] + "</li>";
        }

        document.getElementById('comment1').innerHTML += "</ul>";

    });
    document.getElementById('comment').addEventListener('submit', async function (event) {
        event.preventDefault();

        try {
            let user_comment = document.getElementById('user_comment').value;
            let response = await fetch('http://127.0.01:3000/add',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: "user_comment=" + user_comment
                });
            if (!response.ok) {
                throw new Error("problem adding comment" + response.code);
            }
        } catch (error) {
            alert("problem: " + error);
        }
    });
};