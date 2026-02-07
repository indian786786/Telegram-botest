async function generate() {
  const prompt = document.getElementById("prompt").value;
  const editor = document.getElementById("editor");

  editor.textContent = "Thinking...\n\n";

  try {
    const res = await fetch("https://canvas-ai.saififiroza786.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const data = await res.json();
    editor.textContent = data.text || "No response from AI";
  } catch (e) {
    editor.textContent = "Error connecting to AI";
  }
}
