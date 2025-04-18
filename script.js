const quotes = {
    easy: [
      "Code is fun.",
      "I love typing.",
      "Practice makes perfect."
    ],
    medium: [
      "Typing helps improve your speed.",
      "JavaScript is fun to learn.",
      "Accuracy is better than speed."
    ],
    hard: [
      "The quick brown fox jumps over the lazy dog.",
      "Consistency and dedication lead to mastery.",
      "Debugging is twice as hard as writing the code in the first place."
    ]
  };
  
  let quote = "";
  let startTime;
  
  const input = document.getElementById("input");
  const quoteDisplay = document.getElementById("quoteDisplay");
  const result = document.getElementById("result");
  const liveWPM = document.getElementById("liveWPM");
  const difficulty = document.getElementById("difficulty");
  
  function loadQuote() {
    const level = difficulty.value;
    const randomIndex = Math.floor(Math.random() * quotes[level].length);
    quote = quotes[level][randomIndex];
  
    quoteDisplay.innerHTML = "";
    quote.split("").forEach(char => {
      const span = document.createElement("span");
      span.innerText = char;
      quoteDisplay.appendChild(span);
    });
  
    input.value = "";
    input.disabled = false;
    result.innerText = "";
    liveWPM.innerText = "WPM: 0";
    startTime = null;
  }
  
  input.addEventListener("input", () => {
    const inputText = input.value;
    const quoteSpans = quoteDisplay.querySelectorAll("span");
  
    let correctChars = 0;
    let totalChars = quote.length;
  
    if (!startTime) startTime = new Date();
  
    quoteSpans.forEach((charSpan, index) => {
      const typedChar = inputText[index];
  
      if (typedChar == null) {
        charSpan.classList.remove("correct", "incorrect");
      } else if (typedChar === charSpan.innerText) {
        charSpan.classList.add("correct");
        charSpan.classList.remove("incorrect");
        correctChars++;
      } else {
        charSpan.classList.add("incorrect");
        charSpan.classList.remove("correct");
      }
    });
  
    // WPM Calculation
    const timeElapsed = (new Date() - startTime) / 1000 / 60;
    const wordsTyped = inputText.trim().split(/\s+/).length;
    const wpm = Math.round(wordsTyped / timeElapsed);
    if (inputText.length > 5) {
        liveWPM.innerText = `WPM: ${isNaN(wpm) ? 0 : wpm}`;
    }
  
    // Completion check
    if (inputText === quote) {
      input.disabled = true;
      const timeTaken = (new Date() - startTime) / 1000;
      const accuracy = Math.round((correctChars / totalChars) * 100);
  
      result.innerHTML = `
        <p><strong>Finished!</strong></p>
        <p>Time: ${timeTaken.toFixed(2)}s</p>
        <p>Accuracy: ${accuracy}%</p>
        <p>Speed: ${wpm} WPM</p>
      `;
    }
  });
  
  window.onload = loadQuote;