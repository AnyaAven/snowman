/** Snowman game: plays hangman-style game with a melting snowman. */

import { ENGLISH_WORDS } from "./words.js";

/** Logic for snowman game.
 *
 * - answer: the secret word, like "apple"
 * - guessedLetters: set of guesses, like {a, b}
 * - numWrong: number of wrong guesses
 * - maxWrong: max number of wrong guesses before loss
 * - gameState: "PLAYING", "WON", or "LOST"
 *
 */

class SnowmanLogic {
  constructor(maxWrong = 5) {
    console.debug("SnowmanLogic", {maxWrong});

    this.answer = this.getSecret();
    this.guessedLetters = new Set();
    this.numWrong = 0;
    this.maxWrong = maxWrong;
    this.gameState = "PLAYING"; // or "WON" or "LOST"

    console.log("answer = ", this.answer);
  }

  /** Pick a secret word and return it. */

  getSecret() {
    console.debug("getSecret");

    const words = ENGLISH_WORDS;
    return words[Math.floor(Math.random() * words.length)];
  }

  /** Returns string of word: eg "_pp_e" if have guessed {p,e} for "apple"
   *
   * For secret word: "apple", here what it would show given guesses:
   *   {}         "_____"
   *   {a}        "a____"
   *   {a,p}      "app__"
   *   {a,p,e}    "app_e"
   *   {a,p,l,e}  "apple"
   *
   * */

  getGuessedWord() {
    console.debug("getGuessedWord");

    return this.answer
      .split("")
      .map(ltr => (this.guessedLetters.has(ltr) ? ltr : "_"))
      .join("");
  }

  /** Guess letter, update game state, and return t/f if letter correct. */

  guessLetter(ltr) {
    console.debug("guessLetter", {ltr});

    this.guessedLetters.add(ltr);

    const isCorrect = this.answer.includes(ltr);

    this.numWrong += isCorrect ? 0 : 1;

    // TODO: this should update the gameState attr to "WON" or "LOST"

    return isCorrect;
  }
}

export { SnowmanLogic };
