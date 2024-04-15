import { SnowmanLogic } from "./snowman.js";

class SnowmanUI {
  constructor(maxWrong = 5) {
    console.debug("Snowman UI");

    this.maxWrong = maxWrong;
    this.game = new SnowmanLogic(maxWrong);

    this.$keyboard = document.querySelector("#Snowman-keyboard");
    this.$word = document.querySelector("#Snowman-word");
    this.$image = document.querySelector("#Snowman-image");

    this.updateWord();
    this.addKeyboard();
  }

  /** Add keys to keyboard area and register single eaent listener for area.  */

  addKeyboard() {
    console.debug("addKeyboard");

    const $letters = [..."abcdefghijklmnopqrstuvwxyz"].map(
      letter => {
        const $letter = document.createElement("button");
        $letter.classList.add("letter");
        $letter.dataset.letter = letter;
        $letter.innerText = letter;
        return $letter;
      },
    );

    this.$keyboard.append(...$letters);


    this.$keyboard.addEventListener("click", this.handleGuess.bind(this));
  }

  /** Update guessed word on board. */

  updateWord() {
    console.debug("updateWord");

    this.$word.innerText = this.game.getGuessedWord();
  }

  /** Update image after a bad guess. */

  updateImage() {
    console.debug("updateImage");

    this.$image.src = `${this.game.numWrong}.png`;
  }

  /** Handle guessing a letter. */

  guessLetter(letter) {
    console.debug("guessLetter", letter);

    const isCorrect = this.game.guessLetter(letter); //TODO: what is this for?

    this.updateWord();
    this.updateImage();

    this.checkForOutcomeAndUpdateUI();

  }

  /** Handle clicking a letter button: disable button & handle guess. */

  handleGuess(evt) {
    console.debug("handleGuess");

    if (!evt.target.matches('button')) {
      console.log('clicked between buttons oops');
      return;
    }
    const letter = evt.target.dataset.letter;
    this.guessLetter(letter);
  }

  /* Check the gameState and update UI to display win or loss */
  checkForOutcomeAndUpdateUI() {
    if (this.game.gameState === "PLAYING") return;

    const $main = document.querySelector("#Snowman");
    const $outcomeArea = document.createElement("div");

    //WON
    if (this.game.gameState === "WON") {

      $outcomeArea.innerText = "You did it!!! AMAZING!!! CONGRATS!!!";
    } else {
      //LOST
      $outcomeArea.innerText = "You failed.";
    }



    $main.append($outcomeArea);
  }
}

export { SnowmanUI };
