let currentAnswer = "";

async function loadQuestion() {
  const topic = document.getElementById("topic").value;
  const questionBox = document.getElementById("question");
  const optionsBox = document.getElementById("options");

  questionBox.innerText = "Loading...";
  optionsBox.innerHTML = "";

  try {
    const res = await fetch("https://canvas-ai.saififiroza786.workers.dev/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: topic })
    });

    const q = await res.json(); // ✅ MUST be json()

    currentAnswer = q.answer;

    questionBox.innerText = q.question;

    for (const key in q.options) {
      const btn = document.createElement("button");
      btn.innerText = `${key}. ${q.options[key]}`;
      btn.onclick = () => checkAnswer(key, btn);
      optionsBox.appendChild(btn);
    }

  } catch (e) {
    questionBox.innerText = "Error loading question";
    console.error(e);
  }
}

function checkAnswer(selected, btn) {
  const buttons = document.querySelectorAll("#options button");

  buttons.forEach(b => b.disabled = true);

  if (selected === currentAnswer) {
    btn.style.background = "green";
  } else {
    btn.style.background = "red";
  }
}
