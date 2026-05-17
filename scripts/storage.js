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


function storage_loadAll () {
    localforage.iterate(function (pk, id, iterationNumber) {
        if (id !== "token") {
            // load any member objects that have been cached
            // currently all non-token values saved to storage are pk member objects
            updatePkInfo(pk, true); // bool prevents immediately re-saving
        } else {
            if (validateToken(pk)) {
                log("Saved token validated");
                saveToken(pk);
            } else {
                log("Saved token invalid");
            }
        }
    }).then(function () {
        updateAllHeadmateTiles();
        activeListInput();
        log("Locally cached member data loaded"); // #todo #debug
    }).catch(err => { error(err) })

    // load in from PK and update tiles unless that's actively prevented
    if (getToggle("live")) { loadFromPk() } else {
        log("Loading remote data prevented by url parameter 'live=false'");
    }
}
