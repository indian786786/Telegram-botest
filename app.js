const API_URL = "https://canvas-ai.saififiroza786.workers.dev/";

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const output = document.getElementById("output");
const topicInput = document.getElementById("topic");

async function loadQuestion() {
  const topic = topicInput.value.trim();

  if (!topic) {
    output.innerHTML = "❌ Please enter a topic";
    return;
  }

  output.innerHTML = "⏳ Generating MCQ...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: `Generate ONE SSC-style MCQ with 4 options on the topic: ${topic}`
      })
    });

    const text = await res.text();

    output.innerHTML = `
      <pre style="white-space:pre-wrap; background:#020617; padding:15px; border-radius:8px">
${text}
      </pre>
    `;
  } catch (err) {
    console.error(err);
    output.innerHTML = "❌ Error connecting to AI";
  }
}

startBtn.onclick = loadQuestion;
nextBtn.onclick = loadQuestion;
