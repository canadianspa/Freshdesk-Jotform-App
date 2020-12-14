$(document).ready(onDocumentReady);

function onDocumentReady() {
  app.initialized().then(
    function (client) {
      window.client = client;
      window.state = {};

      client.events.on("app.activated", onAppActivated);
    },
    function (error) {
      handleErr(error);
    }
  );
}

function onAppActivated() {
  buildDropdown(forms, onDropdownChange);

  // CHANGE EMAIL
  var params = {
    formId: "62344566898371",
    filter: { "q4:matches:email": "test@feltin.com" },
  };

  fetchSubmissions(params).then(
    function (submissions) {
      $(".spinner").hide();

      var container = $("#submissions-container");

      $.map(submissions, function (submission) {
        var answers = submission.answers;

        var div = $("<div>")
          .addClass("submission")
          .append(`<div class="header">Submission Date</div>`)
          .append(`<div>${answers["17"].prettyFormat}</div>`)
          .append(`<div class="header">Product</div>`)
          .append(`<div>${answers["21"].answer}</div>`);

        div.appendTo(container);
      });

      console.log(submissions);
    },
    function (error) {
      handleErr(error);
    }
  );
}

function onDropdownChange(value) {
  alert(value);
}

function handleErr(err) {
  alert(err);
  console.error(`Error occured. Details:`, err);
}
