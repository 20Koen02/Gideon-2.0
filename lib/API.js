class API {

  constructor(client) {
    this.client = client;

  }

  _get(url, method) {
    return this.client.helpers.Miscs.request(url, method);
  }
  async getAchievement(title, contents, image) {
    return this._get(`https://www.minecraftskinstealer.com/achievement/a.php?i=${image}&h=${title}&t=${contents}`);
  }
}

module.exports = API;
