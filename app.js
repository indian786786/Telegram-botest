async function generate() {
  const prompt = document.getElementById("prompt").value;
  const editor = document.getElementById("editor");

  if (!prompt.trim()) {
    editor.textContent = "Please enter a prompt.";
    return;
  }

  editor.textContent = "Thinking...";

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

    if (!res.ok) {
      editor.textContent = "Server error: " + res.status;
      return;
    }

    const data = await res.json();

    editor.textContent = data.text || "No response from AI";
  } catch (err) {
    editor.textContent = "Error connecting to AI";
  }
}
