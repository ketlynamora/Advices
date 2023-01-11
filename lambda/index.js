const Alexa = require("ask-sdk-core");

const utils = require("./utils.js");
const service = require("./service.js");
const speaks = require("./speakString.js");

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "LaunchRequest"
    );
  },
  async handle(handlerInput) {
    try {
      let speakOutput = "";

      const advice = await utils.getAdvice();

      if (!advice) {
        return handlerInput.responseBuilder
          .speak(speaks.PROBLEM)
          .withStandardCard(speaks.SKILL_NAME, speaks.PROBLEM)
          .withShouldEndSession(true)
          .getResponse();
      }

      speakOutput = advice.advice;
      speakOutput += "<break time='3s'/> Gostaria de ouvir outro conselho? ";

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .withStandardCard(speaks.SKILL_NAME, advice.advice)
        .getResponse();
    } catch (error) {
      if (error.name !== "ServiceError") {
        console.error("Error:", `LaunchRequestHandler - ${error.message}`);

        return handlerInput.responseBuilder
          .speak(speaks.PROBLEM)
          .withStandardCard(speaks.SKILL_NAME, speaks.PROBLEM)
          .withShouldEndSession(true)
          .getResponse();
      }
    }
  },
};

const AdvicesOfTheDayIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AdvicesOfTheDayIntent"
    );
  },
  async handle(handlerInput) {
    try {
      let speakOutput = "";

      const advice = await utils.getAdvice();

      if (!advice) {
        return handlerInput.responseBuilder
          .speak(speaks.PROBLEM)
          .withStandardCard(speaks.SKILL_NAME, speaks.PROBLEM)
          .withShouldEndSession(true)
          .getResponse();
      }

      speakOutput = advice.advice;

      speakOutput += "<break time='3s'/> Gostaria de ouvir outro conselho? ";

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .withStandardCard(speaks.SKILL_NAME, advice.advice)
        .getResponse();
    } catch (error) {
      if (error.name !== "ServiceError") {
        console.error(
          "Error:",
          `AdvicesOfTheDayIntentHandler - ${error.message}`
        );

        return handlerInput.responseBuilder
          .speak(speaks.PROBLEM)
          .withStandardCard(speaks.SKILL_NAME, speaks.PROBLEM)
          .withShouldEndSession(true)
          .getResponse();
      }
    }
  },
};

const YesNoIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.YesIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.NoIntent")
    );
  },
  async handle(handlerInput) {
    try {
      if (
        Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.NoIntent"
      ) {
        return handlerInput.responseBuilder
          .speak(utils.generateRandomSpeak(speaks.BYE))
          .withShouldEndSession(true)
          .getResponse();
      }

      let speakOutput = "";

      const advice = await utils.getAdvice();

      if (!advice) {
        return handlerInput.responseBuilder
          .speak(speaks.PROBLEM)
          .withStandardCard(speaks.SKILL_NAME, speaks.PROBLEM)
          .withShouldEndSession(true)
          .getResponse();
      }
      speakOutput = advice.advice;

      speakOutput += "<break time='3s'/> Gostaria de ouvir outro conselho? ";

      return handlerInput.responseBuilder
        .speak(speakOutput)
        .reprompt(speakOutput)
        .withStandardCard(speaks.SKILL_NAME, advice.advice)
        .getResponse();
    } catch (error) {
      if (error.name !== "ServiceError") {
        console.error("Error:", `YesNoIntentHandler - ${error.message}`);

        return handlerInput.responseBuilder
          .speak(speaks.PROBLEM)
          .withStandardCard(speaks.SKILL_NAME, speaks.PROBLEM)
          .withShouldEndSession(true)
          .getResponse();
      }
    }
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === "AMAZON.HelpIntent"
    );
  },
  async handle(handlerInput) {
    const speakOutput = speaks.HELP;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      (Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.CancelIntent" ||
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          "AMAZON.StopIntent")
    );
  },
  async handle(handlerInput) {
    const speakOutput = utils.generateRandomSpeak(speaks.BYE);

    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet
 * */
const FallbackIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest" &&
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
        "AMAZON.FallbackIntent"
    );
  },
  async handle(handlerInput) {
    const speakOutput = speaks.I_DIDNT_UNDERSTAND;

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs
 * */
const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) ===
      "SessionEndedRequest"
    );
  },
  async handle(handlerInput) {
    console.log(
      `~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`
    );
    return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
  },
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents
 * by defining them above, then also adding them to the request handler chain below
 * */
const IntentReflectorHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === "IntentRequest"
    );
  },
  async handle(handlerInput) {
    const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
    const speakOutput = `You just triggered ${intentName}`;

    return (
      handlerInput.responseBuilder
        .speak(speakOutput)
        //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
        .getResponse()
    );
  },
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below
 * */
const ErrorHandler = {
  canHandle() {
    return true;
  },
  async handle(handlerInput, error) {
    const speakOutput = speaks.I_DIDNT_UNDERSTAND;
    console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

    return handlerInput.responseBuilder
      .speak(speakOutput)
      .reprompt(speakOutput)
      .getResponse();
  },
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom
 * */
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    LaunchRequestHandler,
    AdvicesOfTheDayIntentHandler,
    YesNoIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    FallbackIntentHandler,
    SessionEndedRequestHandler,
    IntentReflectorHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
