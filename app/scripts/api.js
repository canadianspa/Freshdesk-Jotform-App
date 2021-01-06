const JOTFORM_API_URL = "https://api.jotform.com";
const JOTFORM_APIKEY = "<%= iparam.apiKey %>";

function fetchSubmissions(form, email) {
  var filter = (() => {
    switch (form.id) {
      case 0:
        return { "q4:matches:email": email };
      case 1:
        return { "q4:matches:email4": email };
    }
  })();

  filter = JSON.stringify(filter);

  return new Promise((resolve, reject) => {
    var formId = form.jotformId;
    var url = `${JOTFORM_API_URL}/form/${formId}/submissions?apiKey=${JOTFORM_APIKEY}&filter=${filter}&limit=100`;

    request(url)
      .then((response) => resolve(response.content))
      .catch((error) => reject(error));
  });
}
