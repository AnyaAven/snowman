import { test, expect, describe } from "vitest";
import { SnowmanLogic } from "./snowman.js";

test("getSecret", function () {
  // We'll learn how to actually test random stuff later, but for now, we'll
  // make sure it gives us a back a string of at least length 3.
  const g = new SnowmanLogic();
  expect(typeof g.answer).toEqual("string");
  expect(g.answer.length).toBeGreaterThan(2);
});

test("getGuessedWord", function () {
  const g = new SnowmanLogic();
  g.answer = "apple";

  expect(g.getGuessedWord()).toEqual("_____");

  g.guessedLetters.add("a");
  expect(g.getGuessedWord()).toEqual("a____");

  g.guessedLetters.add("p");
  expect(g.getGuessedWord()).toEqual("app__");
});

describe("guessWord", function () {
  test("win", function () {
    const g = new SnowmanLogic(1);
    g.answer = "apple";

    expect(g.guessLetter("a")).toEqual(true);
    expect(g.numWrong).toEqual(0);
    expect(g.gameState).toEqual("PLAYING");

    expect(g.guessLetter("z")).toEqual(false);
    expect(g.numWrong).toEqual(1);
    expect(g.gameState).toEqual("PLAYING");

    expect(g.guessLetter("p")).toEqual(true);
    expect(g.numWrong).toEqual(1);
    expect(g.gameState).toEqual("PLAYING");

    expect(g.guessLetter("l")).toEqual(true);
    expect(g.numWrong).toEqual(1);
    expect(g.gameState).toEqual("PLAYING");

    expect(g.guessLetter("e")).toEqual(true);
    expect(g.numWrong).toEqual(1);
    expect(g.gameState).toEqual("WON");
  });

  test("loss", function () {
    const g = new SnowmanLogic(1);
    g.answer = "apple";

    expect(g.guessLetter("z")).toEqual(false);
    expect(g.numWrong).toEqual(1);
    expect(g.gameState).toEqual("PLAYING");

    expect(g.guessLetter("y")).toEqual(false);
    expect(g.numWrong).toEqual(2);
    expect(g.gameState).toEqual("LOST");
  });
});
