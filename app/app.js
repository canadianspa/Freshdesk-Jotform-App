$(document).ready(onDocumentReady);

var client;
var state = {
  cache: {},
};

function onDocumentReady() {
  app.initialized().then(initialize).catch(handleErr);

  function initialize(_client) {
    client = _client;

    client.instance.resize({ height: "300px" });
    client.events.on("app.activated", onAppActivated);
  }
}

async function onAppActivated() {
  await loadData();
  buildDropdown(forms, onFormSelect);

  var intialForm = forms[0];
  onFormSelect(intialForm);
}

async function loadData() {
  var contactData = await client.data.get("contact");
  state.email = contactData.contact.email;

  var ticketData = await client.data.get("ticket");
  state.ticketId = ticketData.ticket.id;
}

function onFormSelect(form) {
  var cache = state.cache[form.id];

  if (cache) {
    var submissions = cache;

    buildContent(form, submissions);
  } else {
    showSpinner();

    var params = {
      formId: form.jotformId,
      filter: buildFormFilter(form, state.email, state.ticketId),
    };

    fetchSubmissions(params)
      .then(function (submissions) {
        state.cache[form.id] = submissions;

        buildContent(form, submissions);
        hideSpinner();
      })
      .catch(handleErr);
  }
}

function buildContent(form, submissions) {
  if (submissions.length === 0) {
    emptySubmissionContainer();
    emptyNavigator();
  } else {
    buildSubmission(form, submissions[0]);

    buildNavigator(submissions.length, function (index) {
      buildSubmission(form, submissions[index]);
    });
  }
}

function handleErr(err) {
  console.error(`Error occured. Details:`, err);
}
