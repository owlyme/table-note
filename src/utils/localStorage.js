class Storage {
  setSesssionStorage(key, value) {
    let type = typeof value;
    if (!this.validDataType(key, type, 1)) {
      console.error(
        `key值:${key}已存在sessionStorage中，本次存储和原有的数据类型不一致`
      );
      return false;
    }
    sessionStorage.setItem(key, JSON.stringify({ type, value }));
    return value;
  }
  getSesssionStorage(key) {
    let data = sessionStorage.getItem(key);
    if (data) {
      return this.switchValueToOriginType(data).value;
    } else {
      return false;
    }
  }
  removeSessionStorage(key) {
    delete sessionStorage[key];
  }

  setLocalStorage(key, value) {
    let type = typeof value;
    if (type === "function") {
      value = value(this.getLocalStorage(key));
    }
    type = typeof value;

    if (!this.validDataType(key, type, 2)) {
      console.error(
        `key值:${key}已存在localStorage中，本次存储和原有的数据类型不一致`
      );
      return false;
    }
    localStorage.setItem(key, JSON.stringify({ type, value }));
    return value;
  }
  getLocalStorage(key) {
    let data = localStorage.getItem(key);
    if (data) {
      return this.switchValueToOriginType(data).value;
    } else {
      return false;
    }
  }
  removeLocalStorage(key) {
    delete localStorage[key];
  }

  switchValueToOriginType(strData) {
    return JSON.parse(strData);
  }
  /**
   * 认证存储的数据类型是否和上一次保存的类型一致
   * method validDataType（）
   * @param dataType string
   * @param storageType num（1:sessiongStorage 2:localStorage）
   * @param key string
   * */
  validDataType(key, dataType, storageType) {
    let valid = true;
    if (storageType === 1) {
      let data = this.switchValueToOriginType(
        sessionStorage.getItem(key) || "{}"
      );
      if (data.type && data.type !== dataType) {
        valid = false;
      }
    } else if (storageType === 2) {
      let data = this.switchValueToOriginType(
        localStorage.getItem(key) || "{}"
      );
      if (data.type && data.type !== dataType) {
        valid = false;
      }
    }
    return valid;
  }
}

export default new Storage();
