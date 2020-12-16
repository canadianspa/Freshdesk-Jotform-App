$(document).ready(onDocumentReady);

function onDocumentReady() {
  app.initialized().then(initialize).catch(handleErr);

  function initialize(client) {
    window.client = client;
    window.state = {
      cache: {},
    };

    client.events.on("app.activated", onAppActivated);
  }
}

function onAppActivated() {
  getData("contact", (data) => (state.email = data.contact.email));
  getData("ticket", (data) => (state.ticketId = data.ticket.id));

  resize("300px");
  buildDropdown(forms, onFormSelect);

  // Initial Load
  onFormSelect(forms[0]);
}

function onFormSelect(form) {
  var cache = state.cache[form.name];

  if (cache) {
    var submissions = cache;

    buildSubmissions(form, submissions);
  } else {
    const { email, ticketId } = state;

    showSpinner();

    var params = {
      formId: form.id,
      filter: buildFormFilter(form, email, ticketId),
    };

    fetchSubmissions(params)
      .then((submissions) => {
        state.cache[form.name] = submissions;

        hideSpinner();
        buildSubmissions(form, submissions);
      })
      .catch(handleErr);
  }
}

function handleErr(err) {
  console.error(`Error occured. Details:`, err);
}
