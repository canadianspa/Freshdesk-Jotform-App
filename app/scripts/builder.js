function hideSpinner() {
  $(".spinner").hide();
}

function showSpinner() {
  emptySubmissionContainer();
  $(".spinner").show();
}

function emptySubmissionContainer() {
  $("#submission-container").empty();
}

function buildNoSubmissions() {
  emptySubmissionContainer();

  $("#submission-container").append(
    `<div class="centre">No submissions found</div>`
  );
}

function buildSubmission(form, submission) {
  emptySubmissionContainer();

  var content = buildSubmissionContent(form, submission);

  $("#submission-container").append(content);

  $("#view").click((event) => {
    client.interface
      .trigger("showModal", {
        title: form.name,
        template: "templates/modal.html",
        data: { submissionId: event.target.name },
      })
      .then(function (data) {
        // data - success message
      })
      .catch(function (error) {
        // error - error object
      });
  });
}
