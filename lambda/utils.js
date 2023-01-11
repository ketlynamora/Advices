const service = require("./service.js");
const speaks = require("./speakString.js");

const getSpeak = function (args) {
  const random = Math.floor(Math.random() * args.length);
  return args[random];
};

const getAdvice = async function () {
  try {
    let advices = {};
    let advice = {};
    let speakOutput = "";

    advices = await service.advice();

    if (advices) 
      advice = getSpeak(advices);

    return advice;
  } catch (error) {
    if (error.name !== "ServiceError") {
      console.error("Error:", `getVerse - ${error.message}`);

      return false;
    }
  }
};

module.exports.getAdvice = getAdvice;
module.exports.generateRandomSpeak = getSpeak;
