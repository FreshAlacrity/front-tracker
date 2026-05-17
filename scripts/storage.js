function saveToken (input) {
    data.setup.token = input;
    localforage.setItem('token', input).then(function (value) {
        // Do other things once the value has been saved.
        log("Token saved to local storage");
    }).catch(function(err) {
        // This code runs if there were any errors
        log(err);
    });
}

function inputToken () {
    let input = window.prompt("Enter your PK Token:","Use `pk;token` to have the PK bot DM yours to you or request it from an admin.");
    if (validateToken(input)) {
        saveToken(input)
        alert("Thank you.")
    } else {
        alert("Sorry, that is not a valid token.")
    }
}

function validateToken (input) {
    // #later actually check this with the PK server
    return (input.length === 64)
}

function clearToken () {
    data.setup.token = "";
    localforage.removeItem('token').then(function() {
        // Run this code once the key has been removed.
        alert("Token cleared.");
    }).catch(function(err) {
        // This code runs if there were any errors
        alert("Issue clearing token: " + err);
    });
}
