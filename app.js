function generate() {
  const editor = document.getElementById("editor");
  editor.textContent = "";

  const fakeAI =
    "This is your Canvas.\n\n" +
    "Text appears directly in the document.\n\n" +
    "Next step: connect real AI.";

  let i = 0;
  const interval = setInterval(() => {
    editor.textContent += fakeAI[i];
    i++;
    if (i >= fakeAI.length) clearInterval(interval);
  }, 25);
}
