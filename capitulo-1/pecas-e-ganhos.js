export function statement(invoice, plays) {
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
    let result = 0;
    result += Math.max(performance.audience - 30, 0);

    if ("comedy" === playFor(performance).type)
      result += Math.floor(performance.audience / 5);
    return result;
  }

  function totalVolumeDeCreditos() {
    let result = 0;

    for (let performance of invoice.performances) {
      result += volumeDeCreditosPara(performance);
    }
    return result;
  }

  function montanteTotal() {
    let result = 0;

    for (let performance of invoice.performances) {
      result += valorPara(performance);
    }
    return result;
  }

  for (let performance of invoice.performances) {
    result += ` ${playFor(performance).name}: ${dolar(valorPara(performance))} (${
      performance.audience
    } seats)\n`;
  }

  result += `Amount owed is ${dolar(montanteTotal())}\n`;
  result += `You earned ${totalVolumeDeCreditos()} credits\n`;

  return result;
}

function dolar(valor) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(valor / 100);
}
