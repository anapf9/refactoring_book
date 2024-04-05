import { statement } from "./pecas-e-ganhos.js";

describe("Teste unitário", () => {
  test("statement should generate a statement for a tragedy play", () => {
    const invoice = [
      {
        customer: "BigCo",
        performances: [
          {
            playID: "hamlet",
            audience: 55,
          },
        ],
      },
    ];

    const plays = {
      hamlet: { name: "Hamlet", type: "tragedy" },
    };

    const expectedResult = `Statement for BigCo
       Hamlet: $560.00 (55 seats)
       Amount owed is $560.00
       You earned 25 credits
      `;

    const result = statement(invoice, plays);
    expect(result).toBe(expectedResult);
  });
});
