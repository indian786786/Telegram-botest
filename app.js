async function generate() {
  const prompt = document.getElementById("prompt").value;
  const editor = document.getElementById("editor");

  editor.textContent = "Thinking...\n";

  try {
    const res = await fetch(
      "https://canvas-ai.saififiroza786.workers.dev/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    const data = await res.json();

    if (data.text) {
      editor.textContent = data.text;
    } else if (data.error) {
      editor.textContent = "AI Error: " + data.error;
    } else {
      editor.textContent = "No reply from AI";
    }
  } catch (e) {
    editor.textContent = "Network error: " + e.message;
  }
}
