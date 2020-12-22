document.onreadystatechange = function () {
  if (document.readyState === "interactive") onDocumentReady();

  function onDocumentReady() {
    app.initialized().then(initialize).catch(handleErr);

    function initialize(client) {
      client.instance.context().then(handleContext).catch(handleErr);
    }

    function handleContext(context) {
      const answers = context.data.answers;

      Object.keys(answers).map((key) => {
        var question = answers[key];

        if (
          question.type !== "control_button" &&
          question.type !== "control_head" &&
          question.type !== "control_widget" &&
          question.name !== "doubleclickTo"
        ) {
          buildCell(question);
        }
      });
    }
  }

  function buildCell(question) {
    const { type, text, answer, prettyFormat } = question;

    var cell = buildTextElement(document.body, { className: "cell" });

    buildTextElement(cell, { content: text, className: "header" });

    switch (type) {
      case "control_phone":
        var content = prettyFormat;
        buildTextElement(cell, { content: content });
        break;
      case "control_fileupload":
        answer.map((url) => {
          buildImgLinkElement(cell, url);
        });
        break;
      case "control_datetime":
        var content = `${answer.day}/${answer.month}/${answer.year}`;
        buildTextElement(cell, { content: content });
        break;
      case "control_dropdown":
        var content = answer;
        var className = "option";
        var style = getProductColour(content);

        buildTextElement(cell, {
          content: content,
          className: className,
          style: style,
        });
        break;
      case "control_radio":
        var content = answer ? answer : "Not given";
        var className = "option";

        if (answer === "Yes") className += " yes";
        if (answer === "No") className += " no";

        buildTextElement(cell, { content: content, className: className });
        break;
      case "control_address":
        Object.keys(answer).map((key) => {
          var content = answer[key];
          buildTextElement(cell, { content: content });
        });
        break;
      default:
        var content = answer ? answer : "Not given";
        buildTextElement(cell, { content: content });
        break;
    }

    document.body.appendChild(cell);
  }

  function buildTextElement(parent, { content, className, style }) {
    var child = document.createElement("div");

    if (content) child.innerHTML = content;
    if (className) child.className = className;
    if (style) child.style = style;

    return parent.appendChild(child);
  }

  function buildImgLinkElement(parent, url) {
    var link = document.createElement("a");
    link.href = url;
    link.target = "_blank";

    var img = document.createElement("img");
    img.src = url;
    img.className = "image";

    link.appendChild(img);

    return parent.appendChild(link);
  }

  function handleErr(err) {
    console.error(`Error occured. Details:`, err);
  }
};
