function appendTextElement(parent, { content, className, style }) {
  var child = document.createElement("div");

  if (content) child.innerHTML = content;
  if (className) child.className = className;
  if (style) child.style = style;

  return parent.appendChild(child);
}

function appendImgElement(parent, url) {
  var link = document.createElement("a");
  link.href = url;
  link.target = "_blank";

  var img = document.createElement("img");
  img.src = url;
  img.className = "image";

  link.appendChild(img);

  return parent.appendChild(link);
}

function buildCell(body) {
  return appendTextElement(body, { className: "cell" });
}

function buildHeader(cell, question) {
  var content = question.text;

  appendTextElement(cell, { content: content, className: "header" });
}

function buildPhone(cell, question) {
  var content = question.prettyFormat;

  appendTextElement(cell, { content: content });
}

function buildFileUpload(cell, question) {
  question.answer.map((url) => {
    appendImgElement(cell, url);
  });
}

function buildDateTime(cell, question) {
  var answer = question.answer;
  var content = `${answer.day}/${answer.month}/${answer.year}`;

  appendTextElement(cell, { content: content });
}

function buildDropdown(cell, question) {
  var content = question.answer;
  var className = "option";
  var style = getProductColour(content);

  appendTextElement(cell, {
    content: content,
    className: className,
    style: style,
  });
}

function buildRadio(cell, question) {
  var answer = question.answer;
  var content = answer ? answer : "Not given";
  var className = "option";

  if (answer === "Yes") className += " yes";
  if (answer === "No") className += " no";

  appendTextElement(cell, { content: content, className: className });
}

function buildAddress(cell, question) {
  var answer = question.answer;

  Object.keys(answer).map((key) => {
    var content = answer[key];

    appendTextElement(cell, { content: content });
  });
}

function buildDefault(cell, question) {
  var answer = question.answer;
  var content = answer ? answer : "Not given";

  appendTextElement(cell, { content: content });
}
