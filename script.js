const display = document.getElementById("display");

function appendValue(value) {
    if (display.value === "0" || display.value === "Error") {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearDisplay() {
    display.value = "0";
}

function deleteLast() {
    if (display.value === "Error" || display.value.length <= 1) {
        display.value = "0";
    } else {
        display.value = display.value.slice(0, -1);
    }
}

function calculate() {
    try {
        let expression = display.value.replace(/%/g, "/100");
        if (!expression) return;

        const result = Function('"use strict"; return (' + expression + ')')();

        if (!Number.isFinite(result)) {
            display.value = "Error";
            return;
        }

        display.value = Number(result.toFixed(10));
    } catch {
        display.value = "Error";
    }
}

document.addEventListener("keydown", (event) => {
    if ("0123456789+-*/.%".includes(event.key)) appendValue(event.key);
    else if (event.key === "Enter" || event.key === "=") calculate();
    else if (event.key === "Backspace") deleteLast();
    else if (event.key === "Escape") clearDisplay();
});
