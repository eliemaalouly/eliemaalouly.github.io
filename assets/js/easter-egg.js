document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".easter-egg").forEach(egg => {
        egg.addEventListener("click", handleEggClick);
    });
});

function handleEggClick(e) {
    e.stopPropagation();
    const egg = e.currentTarget;

    if (egg.classList.contains("cracked-egg")) return;

    const quack = new Audio("/assets/sounds/misc/duck_quack.wav");
    quack.play();

    firebase.database().ref('ducksFound').transaction(current => {
        return (current || 0) + 1;
    }, (error, committed, snapshot) => {
        if (committed && snapshot) {
            const newCount = snapshot.val();

            if (newCount % 100 === 0) {
                showMilestoneMessage(newCount);
            }
        }
    });

    egg.classList.add("cracked-egg");

    const rect = egg.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const scrollLeft = window.scrollX;

    const duck = document.createElement("img");
    duck.src = "/assets/images/misc/rubber_duck.svg";
    duck.alt = "Rubber Duck";
    duck.className = "floating-duck hatching-duck";

    duck.style.position = "absolute";
    duck.style.left = `${rect.left + scrollLeft}px`;
    duck.style.top = `${rect.top + scrollTop}px`;
    duck.style.transition = "all 2s ease";
    document.body.appendChild(duck);

    void duck.offsetWidth;

    setTimeout(() => {
        duck.style.left = `${window.innerWidth - 95 + scrollLeft}px`;
        duck.style.top = `${window.innerHeight - 85 + scrollTop}px`;
    }, 1000);

    setTimeout(() => {
        duck.remove();

        const docked = document.createElement("img");
        docked.src = "/assets/images/misc/rubber_duck.svg";
        docked.alt = "Rubber Duck";
        docked.className = "docked-duck";
        document.body.appendChild(docked);

        docked.addEventListener("click", () => {
            docked.remove();
        });

    }, 3100);

    setTimeout(() => {
        egg.remove();
    }, 300);
}

document.addEventListener("DOMContentLoaded", () => {
    const waitForFirebase = setInterval(() => {
        if (window.firebase?.apps?.length) {
            clearInterval(waitForFirebase);
            firebase.database().ref('ducksFound').on('value', snapshot => {
                const count = snapshot.val() || 0;
                const el = document.getElementById("duck-count");
                if (el) {
                    el.textContent = count;
                }
            });
        }
    }, 50);
});


document.addEventListener("DOMContentLoaded", () => {
    const mainContent = document.querySelector(".page__content");
    if (!mainContent) return;

    const eggHTML = (word) =>
        `<span class="easter-egg-container">${word}<span class="easter-egg">🥚</span></span>`;

    function getTextNodes(node) {
        let textNodes = [];
        if (
            node.nodeType === 3 &&
            node.textContent.trim().length > 0 &&
            !node.parentElement.closest("a, code, pre, script, style")
        ) {
            textNodes.push(node);
        } else if (node.nodeType === 1) {
            for (let child of node.childNodes) {
                textNodes = textNodes.concat(getTextNodes(child));
            }
        }
        return textNodes;
    }

    const textNodes = getTextNodes(mainContent).filter(
        (n) => n.textContent.split(/\s+/).length >= 3
    );

    if (textNodes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * textNodes.length);
    const randomNode = textNodes[randomIndex];
    const fullText = randomNode.textContent;

    const words = fullText.match(/\S+/g);
    if (!words || words.length < 1) return;

    const wordIndex = Math.floor(Math.random() * words.length);
    const targetWord = words[wordIndex];
    // console.log(`Here let me make it easy for you! The egg is behind the word: "${targetWord}" in paragraph ${randomIndex} at index ${wordIndex} (I know, I know! It's still not that easy to find sometimes)`);

    let wordStartIndex = -1;
    let matchCount = 0;
    const regex = /\S+/g;
    let match;
    while ((match = regex.exec(fullText)) !== null) {
        if (matchCount === wordIndex) {
            wordStartIndex = match.index;
            break;
        }
        matchCount++;
    }

    if (wordStartIndex === -1) return;

    const before = randomNode.splitText(wordStartIndex);
    const after = before.splitText(targetWord.length);

    const span = document.createElement("span");
    span.innerHTML = eggHTML(targetWord);
    before.parentNode.replaceChild(span, before);

    document.querySelectorAll(".easter-egg").forEach((egg) => {
        egg.addEventListener("click", handleEggClick);
    });
});

function showMilestoneMessage(count) {
    const msg = document.createElement("div");
    msg.className = "duck-milestone-message";
    msg.innerHTML = `
        🎉 <strong>CONGRATULATIONS!</strong> 🎉<br>
        You found the <strong>${count}th duck</strong>!<br>
        You must be very proud!
        `;
    document.body.appendChild(msg);

    setTimeout(() => {
        msg.remove();
    }, 6000);
}

