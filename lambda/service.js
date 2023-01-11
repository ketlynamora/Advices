const fetch = require("cross-fetch");

module.exports.advice = async () => {
  try {
    const uri =
      "https://raw.githubusercontent.com/ketlynamora/json/main/advices.json";
    const result = await fetch(uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!result) return false;

    return await result.json();
  } catch (error) {
    if (error.name !== "ServiceError") {
      console.error("Error:", `helper - bible - ${error.message}`);

      return false;
    }
  }
};
