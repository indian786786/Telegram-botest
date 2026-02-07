const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const topicInput = document.getElementById("topic");
const output = document.getElementById("output");

let currentTopic = "";

startBtn.onclick = () => {
  currentTopic = topicInput.value.trim();
  if (!currentTopic) {
    alert("Enter a topic");
    return;
  }
  loadQuestion();
};

nextBtn.onclick = () => {
  if (!currentTopic) {
    alert("Click Start first");
    return;
  }
  loadQuestion();
};

async function loadQuestion() {
  output.innerHTML = "Loading...";

  try {
    const res = await fetch(
      "https://canvas-ai.saififiroza786.workers.dev/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: currentTopic })
      }
    );

    const data = await res.json();

    if (!data.question || !data.options) {
      throw new Error("Invalid response");
    }

    output.innerHTML = `
      <h3>${data.question}</h3>

      <button style="width:100%;margin:5px">${data.options.A}</button>
      <button style="width:100%;margin:5px">${data.options.B}</button>
      <button style="width:100%;margin:5px">${data.options.C}</button>
      <button style="width:100%;margin:5px">${data.options.D}</button>
    `;
  } catch (err) {
    console.error(err);
    output.innerHTML = "❌ Error loading question";
  }
}
