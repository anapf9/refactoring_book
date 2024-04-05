export function statement(invoice, plays) {
  let totalAmount = 0;

  let result = `Statement for ${invoice.customer}\n`;

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function valorPara(aPerformance) {
    let result = 0;
    switch (playFor(aPerformance).type) {
      case "tragedy":
        result = 40000;
        if (aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy":
        result = 30000;
        if (aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`unknown type: ${playFor(aPerformance).type}`);
    }

    return result;
  }

  function volumeDeCreditosPara(performance) {
    let volumeCredits = 0;

    volumeCredits += Math.max(performance.audience - 30, 0);
    // soma um crédito extra para cada dez espectadores de comédia
    if ("comedy" === playFor(performance).type)
      volumeCredits += Math.floor(performance.audience / 5);
    return;
  }

  const format = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  for (let performance of invoice.performances) {
    // soma créditos por volume

    // exibe a linha para esta requisição
    result += ` ${playFor(performance).name}: ${format(valorPara(performance) / 100)} (${
      performance.audience
    } seats)\n`;
    totalAmount += valorPara(performance);
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`;
  result += `You earned ${volumeDeCreditosPara(performance)} credits\n`;
  // console.log(result)
  return result;
}
