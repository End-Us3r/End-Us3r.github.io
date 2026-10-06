function redirectToPage(url) {
    window.location.assign(url);
}

function setupButtonListeners() {
    const buttons = {
        button_one: 'https://end-us3r.github.io/Inked-Art-Homepage-Project/',
        button_two: 'https://end-us3r.github.io/Message-Generator/',
        button_three: 'projects-folder/coffeeBot.html',
        button_four: 'projects-folder/gpaCalculator.html',
        button_five: 'projects-folder/boredlessTourist.html',
        button_six: 'projects-folder/rps.html',
        button_seven: 'projects-folder/nightmareGame.html',
    };

    for (const buttonId in buttons) {
        const buttonElement = document.getElementById(buttonId);
        if (!buttonElement) continue;
        buttonElement.addEventListener('click', (event) => {
            // Real links navigate themselves, including with JS off.
            // A new tab was the only extra effect, and same-tab stays.
            if (buttonElement.matches('a[href]')) {
                return;
            }
            event.preventDefault();
            redirectToPage(buttons[buttonId]);
        });
    }
}

document.addEventListener('DOMContentLoaded', setupButtonListeners);
