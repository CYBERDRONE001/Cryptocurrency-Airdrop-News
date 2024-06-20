document.addEventListener("DOMContentLoaded", function() {
    const title = document.querySelector('.title h1');
    const startButton = document.getElementById('startButton');
    const contentContainer = document.getElementById('contentContainer');
    const sections = [
        document.getElementById('cryptoAirdropNews'),
        document.getElementById('cryptocurrency'),
        document.getElementById('cryptoAirdrop'),
        document.getElementById('thankYou')
    ];
    let currentSectionIndex = 0;
    const redirectionUrl = 'https://your-crypto-airdrop-news.com'; // Replace with your URL

    function randomFlicker() {
        const flickerChance = Math.random();
        if (flickerChance > 0.8) {
            title.style.opacity = Math.random();
        } else {
            title.style.opacity = 1;
        }
    }

    setInterval(randomFlicker, 100);

    startButton.addEventListener('click', function() {
        startButton.style.display = 'none';
        title.style.display = 'none';
        contentContainer.style.display = 'block';
        readContent(sections[currentSectionIndex]);
    });

    function readContent(section) {
        if (currentSectionIndex === 0) {
            title.style.display = 'none'; // Hide initial title after start
        }
        showSection(section);
        const text = extractText(section);
        speak(text);
    }

    function extractText(section) {
        const heading = section.querySelector('h1').innerText;
        const paragraph = section.querySelector('p').innerText;
        return `${heading}. ${paragraph}`;
    }

    function speak(text) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = text;
        utterance.lang = 'en-US'; // Specify the language
        speechSynthesis.speak(utterance);

        utterance.onstart = function() {
            highlightText(sections[currentSectionIndex]);
        };

        utterance.onend = function() {
            removeHighlight(sections[currentSectionIndex]);
            hideSection(sections[currentSectionIndex]);
            currentSectionIndex++;
            if (currentSectionIndex < sections.length) {
                readContent(sections[currentSectionIndex]);
            } else {
                showThankYou();
                setTimeout(() => {
                    window.location.href = redirectionUrl;
                }, 5000); // Delay before redirecting
            }
        };
    }

    function highlightText(section) {
        section.classList.add('highlight');
    }

    function removeHighlight(section) {
        section.classList.remove('highlight');
    }

    function showSection(section) {
        section.style.display = 'block';
    }

    function hideSection(section) {
        section.style.display = 'none';
    }

    function showThankYou() {
        const thankYouSection = document.getElementById('thankYou');
        thankYouSection.style.display = 'block';
        const donateButton = document.getElementById('donateButton');
        donateButton.addEventListener('click', function() {
            // Redirect to donation page
            window.location.href = 'https://your-donation-page-url.com';
        });
    }
});