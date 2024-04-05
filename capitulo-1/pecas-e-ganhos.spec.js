import { statement } from "./pecas-e-ganhos.js";
import {eventos, pecas} from './fixture.js'

describe("Teste unitário", () => {

test('statement should calculate the correct amount for a tragedy play with audience over 30', () => {
  const invoice = {
    customer: "BigCo",
    performances: [
      {
        playID: "hamlet",
        audience: 55,
      },
    ],
  };

  const plays = {
    hamlet: { name: "Hamlet", type: "tragedy" },
  };

  const expectedResult = `Statement for BigCo
 Hamlet: $650.00 (55 seats)
Amount owed is $650.00
You earned 25 credits
`;

  const result = statement(invoice, plays);
  expect(result).toBe(expectedResult);
});


test('statement should calculate the correct amount for a tragedy play with audience under 30', () => {
  const invoice = {
    customer: "BigCo",
    performances: [
      {
        playID: "hamlet",
        audience: 25,
      },
    ],
  };

  const plays = {
    hamlet: { name: "Hamlet", type: "tragedy" },
  };

  const expectedResult = `Statement for BigCo
 Hamlet: $400.00 (25 seats)
Amount owed is $400.00
You earned 0 credits
`;

  const result = statement(invoice, plays);
  expect(result).toBe(expectedResult);
});


test('statement should calculate the correct amount for a comedy play with audience under 20', () => {
  const invoice = {
    customer: "BigCo",
    performances: [
      {
        playID: "hamlet",
        audience: 10,
      },
    ],
  };

  const plays = {
    hamlet: { name: "Hamlet", type: "comedy" },
  };

  const expectedResult = `Statement for BigCo
 Hamlet: $330.00 (10 seats)
Amount owed is $330.00
You earned 2 credits
`;

  const result = statement(invoice, plays);
  expect(result).toBe(expectedResult);
});

test('statement should calculate the correct amount for a comedy play with audience over 20', () => {
  const invoice = {
    customer: "BigCo",
    performances: [
      {
        playID: "asYouLikeIt",
        audience: 35,
      },
    ],
  };

  const plays = {
    asYouLikeIt: { name: "As You Like It", type: "comedy" },
  };

  const expectedResult = `Statement for BigCo
 As You Like It: $580.00 (35 seats)
Amount owed is $580.00
You earned 12 credits
`;

  const result = statement(invoice, plays);
  expect(result).toBe(expectedResult);
});

test('statement should throw an error for unknown play type', () => {
  const invoice = {
    customer: "BigCo",
    performances: [
      {
        playID: "unknown",
        audience: 50,
      },
    ],
  };

  const plays = {
    unknown: { name: "Unknown", type: "mystery" },
  };

  expect(() => statement(invoice, plays)).toThrowError(
    'unknown type: mystery'
  );
});
});
