var client;

document.addEventListener("DOMContentLoaded", () => {
  app.initialized().then(initialize).catch(handleErr);

  function initialize(_client) {
    client = _client;

    getContext().then(handleContext).catch(handleErr);
  }

  function handleContext(context) {
    var answers = context.data.answers;

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

  function buildFormElement(question) {
    var cell = appendCell(document.body);

    appendHeader(cell, question);

    switch (question.type) {
      case "control_phone":
        appendPhone(cell, question);
        break;
      case "control_fileupload":
        appendFileUpload(cell, question);
        break;
      case "control_datetime":
        appendDateTime(cell, question);
        break;
      case "control_dropdown":
        appendDropdown(cell, question);
        break;
      case "control_radio":
        appendRadio(cell, question);
        break;
      case "control_address":
        appendAddress(cell, question);
        break;
      default:
        appendDefault(cell, question);
        break;
    }
  }

  function handleErr(err) {
    console.error(`Error occured. Details:`, err);
  }
});
