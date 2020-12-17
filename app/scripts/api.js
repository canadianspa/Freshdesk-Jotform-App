const JOTFORM_API_URL = "https://api.jotform.com";
const JOTFORM_APIKEY = "<%= iparam.apiKey %>";

function fetchSubmissions(params) {
  return new Promise(function (resolve, reject) {
    const { formId, filter } = params;

    var url = `${JOTFORM_API_URL}/form/${formId}/submissions?apiKey=${JOTFORM_APIKEY}&filter=${filter}&limit=100`;

    client.request
      .get(url)
      .then(function (data) {
        var response = JSON.parse(data.response);
        return resolve(response.content);
      })
      .catch(function (error) {
        console.error(error);
        return reject(error);
      });
  });
}
