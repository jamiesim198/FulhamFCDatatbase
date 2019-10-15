#Fulham FC Database Site
##User Guide:
####Layout of site
#####HTML
The website is a single page application, keeping it
on a simple, easy to read page. Upon loading the page
the page makes a request to the server and the server 
sends a response in the form of the index.html page. 

<hr>

#####Player Profiles
You are greeted with a form with two entries, First
Name and Surname. If you input the name of any player
in the premier league and submit the form, the page 
submits an AJAX request to the server, for 7 pieces 
of dynamic content about the player requested. Although, 
because the page is intended to be for the purpose of 
just one club, the data about the player does not include
the club for the player. To ensure the page loads prior to 
the request a window.onLoad() function is used. 

The server then makes a request to the external api used,
thesportDB api. If the request is successful, the api will
respond with JSON data which will be rendered within the 
DOM as HTML. The data is then entered into the sections
on the player profile card, presented below the submit section.
~~~
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
~~~~

<hr>

#####Recent Result
Lower down on the page, there is a section dedicated to presenting
the result of the most recent Fulham game. In a similar fashion
to the previous data, this function relies on the user submitting
a form, although no data is entered into the form, this is made to
ensure that if the api is not available, it doesn't affect the loading 
of the html page. 

Once the form is submitted, the server follows an identical process
to the previously shown method to get the player details, but fetches the
information about Fulhams last game and within the index.js file, carrys
out the necessary styling on the information before placing it in the
HTML.



