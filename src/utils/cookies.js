import cookies from "js-cookie"

class Cookies {
  constructor() {

  }
  set(key, value, expires) {
    cookies.set(key, value, { expires });
    return value
  }
  get(key) {
    return cookies.get(key);
  }
  getJSON(key) {
    return cookies.getJSON(key); // => { foo: 'bar' }
  }
  remove(key) {
    cookies.remove(key);
  }
}

export default new Cookies()
