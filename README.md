#API Documentation

###2 Forms of API have been used for this website

<hr>

#####External API
The first is https://www.thesportsdb.com/ who's API
is used to fetch all data about results and player 
information.

Player information available at:
https://www.thesportsdb.com/api/v1/json/1/searchplayers.php?p=Firstname%20Surname

Event/Match information at:
https://www.thesportsdb.com/api/v1/json/1/eventsnext.php?id=TeamId

Fulhams Team ID is 133600

<hr>

#####Rest API

Used for the comments system. Set up as a list in the
app.js file as:

~~~~
let comments = [
        "Richard1203 Says: We looked poor all over the pitch!",
        "Marek21 Says: But we won?!"
    ];
    
~~~~

Accessed by the index.js app in the lines:

~~~~
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
        
~~~~


