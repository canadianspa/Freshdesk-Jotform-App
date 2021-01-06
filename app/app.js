var client;
var state = {
  email: null,
  cache: {},
};

var forms = [
  { id: 0, name: "Warranty Registration", jotformId: "62344566898371" },
  { id: 1, name: "Back Garden Delivery", jotformId: "73314427413349" },
];

document.addEventListener("DOMContentLoaded", () => {
  app.initialized().then(initialize).catch(handleErr);

  function initialize(_client) {
    client = _client;

    resize("300px");
    getData("contact").then(load).catch(handleErr);
  }

  function load(data) {
    state.email = data.contact.email;
    buildDropdown(forms, onFormSelect);
  }

  function onFormSelect(form) {
    var cache = state.cache[form.id];

    if (cache) {
      buildContent(form, cache);
    } else {
      showSpinner();

      fetchSubmissions(form, state.email)
        .then(handleSubmissions)
        .catch(handleErr);

      function handleSubmissions(submissions) {
        state.cache[form.id] = submissions;

        hideSpinner();
        buildContent(form, submissions);
      }
    }
  }

  function buildContent(form, submissions) {
    if (submissions.length === 0) {
      emptyNavigator();
      buildNoSubmissions();
    } else {
      buildNavigator(submissions, function (submission) {
        buildSubmission(form, submission);
      });
    }
  }

  function handleErr(err) {
    console.error(`Error occured. Details:`, err);
  }
});
