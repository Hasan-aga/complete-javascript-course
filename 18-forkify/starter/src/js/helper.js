import { TIMEOUT_SECONDS } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const getJson = async function (url) {
  console.log(url);
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SECONDS)]);
    const data = await res.json();
    console.log(data);
    if (!res.ok)
      throw new Error(`failed to get data: ${data.error}, ${res.status}`);
    return data;
  } catch (error) {
    throw error;
  }
};
