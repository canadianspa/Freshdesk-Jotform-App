function appendTextElement(parent, { content, className, style }) {
  var child = document.createElement("div");

  if (content) child.innerHTML = content;
  if (className) child.className = className;
  if (style) child.style = style;

  return parent.appendChild(child);
}

function appendImgElement(parent, url) {
  function onClick() {
    var _window = window.open("", "_blank");

    var img = _window.document.createElement("img");
    img.src = url;
    img.alt = "Form Image";
    img.style.height = "100%";

    _window.document.body.appendChild(img);
  }

  var img = document.createElement("img");
  img.src = url;
  img.alt = "Form Image";
  img.className = "image";
  img.addEventListener("click", onClick);

  return parent.appendChild(img);
}

function appendCell(body) {
  var className = "cell";

  return appendTextElement(body, {
    className: className,
  });
}

function appendHeader(cell, question) {
  var content = question.text;
  var className = "header";

  appendTextElement(cell, {
    content: content,
    className: className,
  });
}

function appendPhone(cell, question) {
  var content = question.prettyFormat;

  appendTextElement(cell, {
    content: content,
  });
}

function appendFileUpload(cell, question) {
  question.answer.map((url) => {
    appendImgElement(cell, url);
  });
}

function appendDateTime(cell, question) {
  var answer = question.answer;
  var content = `${answer.day}/${answer.month}/${answer.year}`;

  appendTextElement(cell, {
    content: content,
  });
}

function appendDropdown(cell, question) {
  var content = question.answer;
  var className = "option";
  var style = getProductColour(content);

  appendTextElement(cell, {
    content: content,
    className: className,
    style: style,
  });
}

function appendRadio(cell, question) {
  var answer = question.answer;
  var content = answer ? answer : "Not given";
  var className = "option";

  if (answer === "Yes") className += " yes";
  if (answer === "No") className += " no";

  appendTextElement(cell, {
    content: content,
    className: className,
  });
}

function appendAddress(cell, question) {
  var answer = question.answer;

  Object.keys(answer).map((key) => {
    var content = answer[key];

    appendTextElement(cell, {
      content: content,
    });
  });
}

function appendDefault(cell, question) {
  var answer = question.answer;
  var content = answer ? answer : "Not given";

  appendTextElement(cell, {
    content: content,
  });
}
