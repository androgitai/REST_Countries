export const getCountriesJSON = async function (url) {
  try {
    const res = await fetch(url);
    if (!res) return;
    const data = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
};
