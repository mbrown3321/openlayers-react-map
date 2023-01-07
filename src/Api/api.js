export const get = async (url) => {
  try {
    const data = await fetch(url);
    return data.json();
  } catch (e) {}
};
