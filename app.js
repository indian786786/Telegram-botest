async function generate() {
  const topic = document.getElementById("prompt").value.trim();
  const output = document.getElementById("editor");

  if (!topic) {
    output.innerHTML = "Please enter a topic";
    return;
  }

  output.innerHTML = "Loading question...";

  try {
    const res = await fetch("https://canvas-ai.saififiroza786.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topic })
    });

    const data = await res.json();

    output.innerHTML = `
      <h3>${data.question}</h3>
      <button>A. ${data.options.A}</button><br><br>
      <button>B. ${data.options.B}</button><br><br>
      <button>C. ${data.options.C}</button><br><br>
      <button>D. ${data.options.D}</button>
    `;

  } catch (err) {
    output.innerHTML = "Error loading question";
  }
}
