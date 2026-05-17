function toast (newText = "", level = 0, type = "success") {
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
function log (info = "?", level = 0) {
    toast(info, level);
    return info;
}
function error (info, level = 2) {
    toast(info, level, "error");
    return info;
}
function warn (info, level = 1) {
    toast(info, level, "error");
    return info;
}

var console = (function(oldCons){
    // Source - https://stackoverflow.com/a/42651511
    // @author Ludovic Feltz
    // Retrieved 2026-05-17, License - CC BY-SA 3.0
    // define a new console
    return {
        log: (text) => log(text),
        info: function (text) { log(text) },
        warn: function (text) {  warn(text) },
        error: function (text) { error(text) }
    };
}(window.console));

// Substitute console functions with toasts instead
window.console = console;


function inputToken () {
    // #todo make this a UI element
    let input = window.prompt("Enter your PK Token:","Use `pk;token` to have the PK bot DM yours to you or request it from an admin.");
    if (validateToken(input)) {
        saveToken(input)
        toast("Token accepted, thank you.")
    } else {
        toast("Sorry, that is not a valid token.", 10, "error")
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
