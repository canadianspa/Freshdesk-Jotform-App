var client;

document.onreadystatechange = function () {
  if (document.readyState === "interactive") onDocumentReady();

  function onDocumentReady() {
    app.initialized().then(initialize).catch(handleErr);

    function initialize(_client) {
      client = _client;

      getContext().then(handleContext).catch(handleErr);
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
          buildFormElement(question);
        }
      });
    }
  }

  function buildFormElement(question) {
    var cell = buildCell(document.body);

    buildHeader(cell, question);

    switch (question.type) {
      case "control_phone":
        buildPhone(cell, question);
        break;
      case "control_fileupload":
        buildFileUpload(cell, question);
        break;
      case "control_datetime":
        buildDateTime(cell, question);
        break;
      case "control_dropdown":
        buildDropdown(cell, question);
        break;
      case "control_radio":
        buildRadio(cell, question);
        break;
      case "control_address":
        buildAddress(cell, question);
        break;
      default:
        buildDefault(cell, question);
        break;
    }

    document.body.appendChild(cell);
  }

  function handleErr(err) {
    console.error(`Error occured. Details:`, err);
  }
};
