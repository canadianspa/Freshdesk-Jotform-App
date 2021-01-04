var client;
var state = {
  cache: {},
};
var forms = [
  { id: 0, name: "Warranty Registration", jotformId: "62344566898371" },
  { id: 1, name: "Back Garden Delivery", jotformId: "73314427413349" },
];

document.onreadystatechange = function () {
  if (document.readyState === "interactive") onDocumentReady();

  function onDocumentReady() {
    app.initialized().then(onAppInitialized).catch(handleErr);
  }

  function onAppInitialized(_client) {
    client = _client;
    resize("300px");

    var promises = [getData("contact"), getData("ticket")];

    Promise.all(promises)
      .then((data) => {
        state.email = data[0].contact.email;
        state.ticketId = data[1].ticket.id;

        buildDropdown(forms, onFormSelect);
        onFormSelect(forms[0]); // Load initial form
      })
      .catch(handleErr);
  }

  function onFormSelect(form) {
    var cache = state.cache[form.id];

    if (cache) {
      buildContent(form, cache);
    } else {
      showSpinner();

      fetchSubmissions(form, state.email, state.ticketId)
        .then((submissions) => {
          state.cache[form.id] = submissions;

          hideSpinner();
          buildContent(form, submissions);
        })
        .catch(handleErr);
    }
  }

  function buildContent(form, submissions) {
    if (submissions.length === 0) {
      emptyNavigator();
      buildNoSubmissions();
    } else {
      buildSubmission(form, submissions[0]);
      buildNavigator(submissions.length, function (i) {
        buildSubmission(form, submissions[i]);
      });
    }
  }

  function handleErr(err) {
    console.error(`Error occured. Details:`, err);
  }
};
