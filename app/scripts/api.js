function fetchSubmissions(params) {
  const { formId, filter } = params;

  var filterStr = JSON.stringify(filter);

  return new Promise(function (resolve, reject) {
    const url = `${JOTFORM_API_URL}/form/${formId}/submissions?apiKey=${JOTFORM_APIKEY}&filter=${filterStr}`;

    client.request.get(url).then(
      function (data) {
        return resolve(JSON.parse(data.response).content);
      },
      function (error) {
        console.error(error);
        return reject(error);
      }
    );
  });
}
