document.addEventListener("DOMContentLoaded", function() {
	const message = document.createElement("div");
	message.className = "message";

	const messageText = document.createElement("div");
	messageText.textContent = "Type and echo two letters";

	const logo = document.createElement("div");
	logo.className = "logo";
	logo.textContent = "typtut";

	message.appendChild(logo);
	message.appendChild(messageText);
	document.body.appendChild(message);

	const history = document.createElement("div");
	history.className = "history";
	document.body.appendChild(history);

	const dummy = document.createElement("div");
	dummy.style.height = "1px";
	history.appendChild(dummy);

	const prompt = document.createElement("div");
	prompt.className = "prompt";

	const promptText = document.createElement("div");
	promptText.textContent = "> ";

	const display = document.createElement("div");
	display.className = "display";

	prompt.appendChild(display);
	prompt.appendChild(promptText);
	document.body.appendChild(prompt);

	let currentLine = "";
	let currentTask = "";

	function generateTask() {
		const chars = "abcdefghijklmnopqrstuvwxyz";
		const a = chars[Math.floor(Math.random() * 26)];
		const b = chars[Math.floor(Math.random() * 26)];
		return a + b;
	}

	function addToHistory(text) {
		const line = document.createElement("div");
		line.textContent = text;
		history.insertBefore(line, dummy);
		dummy.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	}

	function addEmptyLine() {
		const empty = document.createElement("div");
		empty.innerHTML = "&nbsp;";
		history.insertBefore(empty, dummy);
	}

	function showTask() {
		addToHistory("Echo this: " + currentTask);
	}

	function nextTask() {
		currentTask = generateTask();
		showTask();
	}

	// initial task
	nextTask();

	document.addEventListener("keydown", function(event) {
		if (event.key.length === 1) {
			display.textContent = event.key;

			currentLine += event.key;
			promptText.textContent = "> " + currentLine;
		} else if (event.key === "Backspace") {
			currentLine = currentLine.slice(0, -1);
			promptText.textContent = "> " + currentLine;
		} else if (event.key === "Enter") {
			addToHistory("> " + currentLine);
			if (currentLine === currentTask) {
				addToHistory("✅ Correct!");
				currentLine = "";
				promptText.textContent = "> ";
				display.textContent = "";

				addEmptyLine();
				nextTask();
			} else {
				addToHistory("❌ Mismatch: Input = " + currentLine);
				currentLine = "";
				promptText.textContent = "> ";
				display.textContent = "";
				addToHistory("Try again.");
				showTask();
			}
		}
	});
});
