function redirectToPage(url) {
    window.location.href = url;
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
        buttonElement = document.getElementById(buttonId);
        if (buttonElement) {
            buttonElement.addEventListener('click', () => {
                redirectToPage(buttons[buttonId]);
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', setupButtonListeners);