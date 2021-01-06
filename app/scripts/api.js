const JOTFORM_API_URL = "https://api.jotform.com";
const JOTFORM_APIKEY = "<%= iparam.apiKey %>";

function fetchSubmissions(form, email) {
  var formId = form.jotformId;
  var filter =
    form.id === 0
      ? { "q4:matches:email": email }
      : form.id === 1
      ? { "q4:matches:email4": email }
      : null;

  filter = JSON.stringify(filter);

  return new Promise((resolve, reject) => {
    var url = `${JOTFORM_API_URL}/form/${formId}/submissions?apiKey=${JOTFORM_APIKEY}&filter=${filter}&limit=100`;

    request(url)
      .then((response) => resolve(response.content))
      .catch((error) => reject(error));
  });
}
