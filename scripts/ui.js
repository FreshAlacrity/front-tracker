function toast (newText, type = "success") {
    /* @author https://www.w3schools.com/howto/howto_js_snackbar.asp */

    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    if (type == "error") {
        newText = "⚠️ " + newText
    }

    x.innerText = newText;

    // Add the "show" class to DIV
    x.className = "show";

    // After 6 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 6000);
}

function inputToken () {
    // #todo make this a UI element
    let input = window.prompt("Enter your PK Token:","Use `pk;token` to have the PK bot DM yours to you or request it from an admin.");
    if (validateToken(input)) {
        saveToken(input)
        toast("Thank you.")
    } else {
        toast("Sorry, that is not a valid token.", "error")
    }
}

function makeCheckboxes () {
    // #todo add more informative titles + labels for the checkboxes
    // #todo add this to toggles instead:
    // flip to alt accounts
    //if (urlParams.has('alts') === true) { flipTiles() }
    let toggles = data.page.toggles
    for (const [key, value] of Object.entries(toggles)) {
        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "toggle " + key;
        checkbox.title = "toggle " + key;
        checkbox.id = "toggle-" + key;
        checkbox.checked = value.default;
        checkbox.addEventListener('change', value.action);
        data.page.settings.appendChild(checkbox);
    };
}

function addListInputListener () {
    data.page.active_list.addEventListener("focusout", activeListInput);
    data.page.active_list.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            activeListInput();
        }
    });
}
