export const getLoginToken = async (username, password) => {
  const token = await fetch("http://localhost:2221/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  })
    .then((data) => data.json())
    .then((data) => data.token)
    .catch(() => {
      throw new Error("Error occurred when trying to get login token ");
    });
  return token;
};
