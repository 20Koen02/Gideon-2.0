class API {

  constructor(client) {
    this.client = client;

  }

  _get(url, method) {
    return this.client.helper.Miscs.request(url, method);
  }

}

module.exports = API;