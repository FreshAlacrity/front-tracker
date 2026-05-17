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
