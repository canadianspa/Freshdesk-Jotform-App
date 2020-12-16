// FRESHDESK CLIENT UTILS

function resize(height) {
  window.client.instance.resize({ height: height });
}

function getData(type, callback) {
  var closure = client.data.get(type);
  closure.then(callback).catch(handleErr);
}
