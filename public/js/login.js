const axios = require("axios");
const showAlert = require("./showAlert");

exports.login = async (email, password) => {
  try {
    const res = await axios.post("/login", { email, password });

    if (res.data.status === "success") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/dashboard");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};

exports.logout = async () => {
  try {
    const res = await axios.get("/logout");
    if ((res.data.status = "success")) location.assign("/");
  } catch (err) {
    console.log(err.response);
    showAlert("error", "Error logging out! Try again.");
  }
};
