function resize(height) {
  client.instance.resize({ height: height });
}

function request(url) {
  return new Promise((resolve, reject) => {
    client.request
      .get(url)
      .then((data) => resolve(JSON.parse(data.response)))
      .catch((error) => reject(error));
  });
}

function getData(type) {
  return new Promise((resolve, reject) => {
    client.data
      .get(type)
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}

function getContext() {
  return new Promise((resolve, reject) => {
    client.instance
      .context()
      .then((context) => resolve(context))
      .catch((error) => reject(error));
  });
}

function showModal(title, template, data) {
  return new Promise((resolve, reject) => {
    client.interface
      .trigger("showModal", {
        title: title,
        template: template,
        data: data,
      })
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
}
