(function () {
    function pickVoice(lang) {
        const voices = window.speechSynthesis.getVoices() || [];
        return voices.find(v => v.lang.toLowerCase() === lang.toLowerCase())
            || voices.find(v => v.lang.toLowerCase().startsWith(lang.toLowerCase()))
            || null;
    }

    async function speak(text, lang) {
        if (!("speechSynthesis" in window)) throw new Error("no_speech_synthesis");
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = lang || "ar";
        const voice = pickVoice(utter.lang);
        if (voice) utter.voice = voice;
        utter.rate = 0.95;
        window.speechSynthesis.speak(utter);
    }

    function playAudio(src) {
        const a = new Audio(src);
        a.preload = "auto";
        a.play();
    }

    document.addEventListener("click", function (e) {
        const btn = e.target.closest(".pronounce-btn");
        if (!btn) return;

        const audioSrc = btn.dataset.audio;
        const text = btn.dataset.text;
        const lang = btn.dataset.lang || "ar";

        if (audioSrc) {
            playAudio(audioSrc);
            return;
        }

        speak(text, lang).catch(() => {
            if (audioSrc) playAudio(audioSrc);
            else alert("Sorry, your browser can't play this pronunciation.");
        });
    });

    if ("speechSynthesis" in window) {
        window.speechSynthesis.onvoiceschanged = function () { };
    }
})();
