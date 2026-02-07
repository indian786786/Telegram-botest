async function generate() {
  const prompt = document.getElementById("prompt").value;
  const editor = document.getElementById("editor");

  editor.textContent = "Thinking...";

  try {
    const res = await fetch("https://canvas-ai-saifiroza786.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const text = await res.text();   // ✅ FIX
    editor.textContent = text;       // ✅ FIX
  } catch (e) {
    editor.textContent = "Error connecting to AI";
  }
}
