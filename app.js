async function generate() {
  const topic = document.getElementById("prompt").value.trim();
  const editor = document.getElementById("editor");

  editor.innerHTML = "Loading question...";

  try {
    const res = await fetch(
      "https://canvas-ai.saififiroza786.workers.dev/",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      }
    );

    const q = await res.json();

    editor.innerHTML = `
      <h3>${q.question}</h3>

      <button onclick="check('A','${q.answer}','${q.explanation}')">
        A. ${q.options.A}
      </button><br>

      <button onclick="check('B','${q.answer}','${q.explanation}')">
        B. ${q.options.B}
      </button><br>

      <button onclick="check('C','${q.answer}','${q.explanation}')">
        C. ${q.options.C}
      </button><br>

      <button onclick="check('D','${q.answer}','${q.explanation}')">
        D. ${q.options.D}
      </button>
    `;
  } catch {
    editor.innerText = "Error loading question";
  }
}

function check(selected, correct, explanation) {
  const editor = document.getElementById("editor");

  if (selected === correct) {
    editor.innerHTML += `<p style="color:green">✔ Right Answer</p>`;
  } else {
    editor.innerHTML += `<p style="color:red">✘ Wrong Answer</p>`;
  }

  editor.innerHTML += `<p><b>Explanation:</b> ${explanation}</p>`;
}
