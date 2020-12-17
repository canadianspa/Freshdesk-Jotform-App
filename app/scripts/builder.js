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
}
