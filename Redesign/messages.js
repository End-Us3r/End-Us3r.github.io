document.getElementById("inspire-button").addEventListener('click', function() {
    // Toggle 'clicked' class on inspire-button
    this.classList.add('clicked');
    setTimeout(() => {
        this.classList.remove('clicked');
    }, 4000);

    // Toggle 'visible' class on expanded-element after 5000ms
    document.getElementById("expanded-element").classList.toggle('visible');
    setTimeout(() => {
        document.getElementById("expanded-element").classList.toggle('visible');
    }, 4000);

    // Toggle 'invisible' class on h3 after
    document.getElementById("inspire-h3").classList.toggle('invisible');
    setTimeout(() => {
        document.getElementById("inspire-h3").classList.toggle('invisible');
    }, 4000);
});

// Function to display a random message
function displayRandomMessage() {
    const messages = [
        { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { quote: "The best way to predict the future is to create it.", author: "Peter Drucker" },
        { quote: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
        { quote: "The best way to find yourself is to lose yourself in the service of others.", author: "Mahatma Gandhi" },
        { quote: "The only thing we have to fear is fear itself.", author: "Franklin D. Roosevelt" },
        { quote: "The only thing that interferes with my learning is my education.", author: "Albert Einstein" },
        { quote: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
        { quote: "The only thing necessary for the triumph of evil is for good people to do nothing.", author: "Edmund Burke" },
        { quote: "The only thing we know about the future is that it will be different.", author: "Peter Drucker" },
        { quote: "The only thing that is constant is change.", author: "Heraclitus" },
        { quote: "The only thing that will redeem mankind is cooperation and the human spirit of love.", author: "Bertrand Russell" },
        { quote: "The only thing that makes life possible is permanent, intolerable uncertainty; not knowing what comes next.", author: "Ursula K. Le Guin" },
        { quote: "The only thing that can save the world is the reclaiming of the awareness of the world. That's what poetry does.", author: "Allen Ginsberg" },
        { quote: "The only thing that's the end of the world is the end of the world.", author: "George R.R. Martin" },
    ];

    // Display a random message from 'messages' array
    const randomIndex = Math.floor(Math.random() * messages.length);
    const quoteElement = document.getElementById("random-quote");
    const authorElement = document.getElementById("random-author");

    quoteElement.textContent = messages[randomIndex].quote;
    authorElement.textContent = `${messages[randomIndex].author}`;

    // Ensure 'expanded-element' is visible when displaying message
    document.getElementById("expanded-element").classList.add('visible');

    // Debugging log
    console.log('Random message displayed');
}

// Event listener to display random message on button click
document.getElementById("inspire-button").addEventListener('click', displayRandomMessage);