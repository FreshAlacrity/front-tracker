function ui_toast (newText = "", level = 0, type = "success") {
    /* @author https://www.w3schools.com/howto/howto_js_snackbar.asp */

    // Get the snackbar DIV
    var x = document.getElementById("alerts");

    if (type == "error") {
        newText = "⚠️ " + newText
    }

    x.innerText = newText;

    // Add the "show" class to DIV
    x.className = "show";

    // After 6 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 6000);
}

function ui_setFooter (newText) {
    var x = document.getElementById("footer");
    //x.innerText = newText;
}

// Flavored toasts for easy use
function log (text = "?", level = 0) {
    ui_toast(text, level);
    return text;
}
function info (text = "?", level = 1) {
    ui_toast(text, level);
    return text;
}
function error (text, level = 3) {
    ui_toast(text, level, "error");
    return text;
}
function warn (text, level = 2) {
    ui_toast(text, level, "error");
    return text;
}

var console = (function(oldCons){
    // Source - https://stackoverflow.com/a/42651511
    // @author Ludovic Feltz
    // Retrieved 2026-05-17, License - CC BY-SA 3.0
    // define a new console
    return {
        log:   (text) => log(text),
        info:  (text) => info(text),
        warn:  (text) => warn(text),
        error: (text) => error(text)
    };
}(window.console));

// Substitute console functions with toasts instead
window.console = console;


function inputToken () {
    // #todo make this a UI element
    let input = window.prompt("Enter your PK Token:","Use `pk;token` to have the PK bot DM yours to you or request it from an admin.");
    if (validateToken(input)) {
        saveToken(input)
        ui_toast("Token accepted, thank you.")
    } else {
        ui_toast("Sorry, that is not a valid token.", 10, "error")
    }
}

function ui_makeCheckboxes () {
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

function ui_addListInputListener () {
    // Looks for input to the main text field
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
