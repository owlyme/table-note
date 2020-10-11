import cookieJs from "js-cookie";

class Cookie {
  set(key, value) {
    cookieJs.set(key, value, {
      expires: 7,
    });
  }

  get(key) {
    return cookieJs.get(key);
  }

  remove(key) {
    cookieJs.remove(key);
  }
}

export default new Cookie();
