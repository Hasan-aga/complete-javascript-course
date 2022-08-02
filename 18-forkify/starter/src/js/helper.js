import { TIMEOUT_SECONDS } from './config';

export class ApiTools {
  static timeout = function (s) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error(`Request took too long! Timeout after ${s} second`));
      }, s * 1000);
    });
  };

  static getJson = async function (url) {
    try {
      const res = await Promise.race([
        fetch(url),
        ApiTools.timeout(TIMEOUT_SECONDS),
      ]);
      const data = await res.json();
      if (!res.ok)
        throw new Error(`failed to get data: ${data.error}, ${res.status}`);
      return data;
    } catch (error) {
      throw error;
    }
  };
}
