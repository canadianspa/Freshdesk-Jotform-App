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

  var title = `${form.name} Form`;
  var template = "modal/modal.html";
  var data = submission;

  $("#view").click(() => showModal(title, template, data));
}

// prettier-ignore
function buildSubmissionContent(form, submission) {
  var answers = submission.answers;

  switch (form.id) {
    case 0:
      var date = answers["17"].answer;
      var product = answers["21"].answer;
      var style = getProductColour(product);
      return $(`
          <div class="submission">
            <span>Purchase Date</span>
            <div>${date.day}/${date.month}/${date.year}</div>
            <span>Product</span>
            <div class="product" style="${style}">${product}</div>
            <span>Address</span>
            <div>${answers["5"].answer.addr_line1}</div>
            <div>${answers["5"].answer.city}</div>
            <div>${answers["5"].answer.state}</div>
            <div>${answers["5"].answer.postal}</div>
            <button name="${submission.id}" id="view">View</button>
          </div>
        `);
    case 1:
      var product = answers["32"].answer;
      var style = getProductColour(product);
      return $(`
          <div class="submission">
            <span>Order Number</span>
            <div>${answers["6"].answer || "Not given"}</div>
            <span>Spa Model</span>
            <div class="product" style="${style}">${product || "Not given"}</div>
            <span>Address</span>
            <div>${answers["5"].answer.addr_line1}</div>
            <div>${answers["5"].answer.city}</div>
            <div>${answers["5"].answer.state}</div>
            <div>${answers["5"].answer.postal}</div>
            <button name="${submission.id}" id="view">View</button>
          </div>
        `);
    default:
      console.error("Invalid form, ", form);
  }
}
