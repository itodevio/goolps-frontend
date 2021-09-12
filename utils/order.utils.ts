export const getTranslatedPaymentType = (type: string) => {
  if (type === "DINHEIRO") {
    return "CASH";
  } else if (type === "DEBITO") {
    return "DEBIT";
  } else if (type === "CREDITO") {
    return "CREDIT";
  } else if (type === "VALE ALIMENTAÇÃO") {
    return "MEAL_VOUCHER";
  } else if (type === "PIX") {
    return "PIX";
  } else {
    return "FOOD_VOUCHER";
  }
};

export const getPortPaymentType = (type: string) => {
  if (type === "CASH") {
    return "DINHEIRO";
  } else if (type === "DEBIT") {
    return "DEBITO";
  } else if (type === "CREDIT") {
    return "CREDITO";
  } else if (type === "VALE ALIMENTAÇÃO") {
    return "MEAL_VOUCHER";
  } else if (type === "PIX") {
    return "PIX";
  } else {
    return "VALE REFEIÇÃO";
  }
};
