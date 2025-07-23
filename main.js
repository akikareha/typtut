document.addEventListener("DOMContentLoaded", function() {
	document.body.style.margin = "0";
	document.body.style.padding = "0";
	document.body.style.backgroundColor = "#333";

	const message = document.createElement("div");
	message.style.position = "fixed";
	message.style.top = "0";
	message.style.left = "0";
	message.style.width = "100%";
	message.style.padding = "0.5em";
	message.style.backgroundColor = "#222";
	message.style.color = "#0f0";
	message.style.fontFamily = "monospace";
	message.style.fontSize = "1.5em";
	message.style.boxSizing = "border-box";
	message.style.display = "flex";
	message.style.justifyContent = "flex-start";
	message.style.alignItems = "center";

	const messageText = document.createElement("div");
	messageText.textContent = "Type and echo two letters";

	const logo = document.createElement("div");
	logo.textContent = "typtut";
	logo.style.color = "#fc8";
	logo.style.paddingLeft = "0.1em";
	logo.style.paddingRight = "1em";
	logo.style.minWidth = "1ch";
	logo.style.textAlign = "center";

	message.appendChild(logo);
	message.appendChild(messageText);
	document.body.appendChild(message);

	const history = document.createElement("div");
	history.style.whiteSpace = "pre-line";
	history.style.paddingTop = "3em";
	history.style.paddingBottom = "3em";
	history.style.maxHeight = "80vh";
	history.style.overflowY = "auto";
	history.style.backgroundColor = "#333";
	history.style.color = "#0f0";
	history.style.fontFamily = "monospace";
	history.style.fontSize = "1.5em";
	document.body.appendChild(history);

	const dummy = document.createElement("div");
	dummy.style.height = "1px";
	history.appendChild(dummy);

	const prompt = document.createElement("div");
	prompt.style.position = "fixed";
	prompt.style.bottom = "0";
	prompt.style.left = "0";
	prompt.style.width = "100%";
	prompt.style.padding = "0.5em";
	prompt.style.backgroundColor = "#111";
	prompt.style.color = "#0f0";
	prompt.style.fontFamily = "monospace";
	prompt.style.fontSize = "1.5em";
	prompt.style.boxSizing = "border-box";
	prompt.style.display = "flex";
	prompt.style.justifyContent = "flex-start";
	prompt.style.alignItems = "center";

	const promptText = document.createElement("div");
	promptText.textContent = "> ";

	const display = document.createElement("div");
	display.style.color = "#0ff";
	display.style.paddingLeft = "0.5em";
	display.style.paddingRight = "0.5em";
	display.style.minWidth = "1ch";
	display.style.textAlign = "center";

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
