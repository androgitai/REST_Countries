import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second(s). Please try again later!`));
    }, s * 1000);
  });
};

export const getCountriesJSON = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(1)]);
    if (!res) return;
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
