String.prototype.format = function formatString() {
  const args = arguments;
  return this.replace(/\{(\d+)\}/g, (text, key) => args[key]);
};

const speaks = {
  SKILL_NAME: "Conselhos para a vida. ",
  I_DIDNT_UNDERSTAND:
    "Desculpe, não entendi o que você disse. Poderia repetir por favor?",
  HELP: "Você pode dizer: abrir conselhos para a vida ou dizer consultar conselhos. O que você gostaria de fazer?",
  BYE: [
    "Até a próxima.",
    "Até mais.",
    "Tchau, até mais.",
    "Tchau, até a próxima.",
  ],
  ADVICE: "{0}",
  PROBLEM:
    "Desculpe. Ocorreu um problema ao conectar-se ao serviço. " +
    "Por favor, tente novamente. ",
  CARD: "{0} {1} Capítulo {2} Versículo {3}",
};

module.exports = speaks;
