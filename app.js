async function generate() {
  const topic = document.getElementById("prompt").value;
  const output = document.getElementById("editor");

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
      <ul>
        <li>A. ${data.options.A}</li>
        <li>B. ${data.options.B}</li>
        <li>C. ${data.options.C}</li>
        <li>D. ${data.options.D}</li>
      </ul>
    `;

  } catch (e) {
    output.innerHTML = "Error loading question";
  }
}
