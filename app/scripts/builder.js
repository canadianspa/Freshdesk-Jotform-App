function hideSpinner() {
  $(".spinner").hide();
}

function showSpinner() {
  emptySubmissionsContainer();
  $(".spinner").show();
}

function emptySubmissionsContainer() {
  $("#submissions-container").empty();
}

function buildSubmissions(form, submissions) {
  emptySubmissionsContainer();

  $("#submissions-container").append(
    submissions.map((submission) => buildSubmissionContent(form, submission))
  );
}
