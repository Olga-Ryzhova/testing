/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/validators.js
function isValidCard(input) {
  // проверка некорректного номера
  if (input == '' || input == null || input == 0 || /^\s*$/.test(input)) {
    return false;
  }
  // алогритм Луна
  const number = input.toString();
  let sum = 0;
  const parity = number.length % 2;
  for (let i = 0; i < number.length; i++) {
    let digit = Number(number[i]);
    if (i % 2 === parity) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }
  return Number(sum % 10) === 0;
}

// определяем платежную систему карты
function definishonPaymentSystem(cardNumber) {
  if (/^4/.test(cardNumber) && cardNumber.length === 16) {
    return 'Visa';
  } else if (/^5[1-5]/.test(cardNumber) && cardNumber.length === 16) {
    return 'MasterCard';
  } else if (/^3[4,7]/.test(cardNumber) && cardNumber.length === 15) {
    return 'American Express';
  } else if (/^35/.test(cardNumber) && cardNumber.length === 16) {
    return 'JCB';
  } else if (/^50[18,20,38]/.test(cardNumber) || /^58/.test(cardNumber) || /^63/.test(cardNumber) || /^67[59,61-63]/.test(cardNumber) && cardNumber.length === 16) {
    return 'Maestro';
  } else if (/^2/.test(cardNumber) && cardNumber.length === 16) {
    return 'МИР';
  }
}
;// CONCATENATED MODULE: ./src/img/visa.png
const visa_namespaceObject = __webpack_require__.p + "45b61f78dac2b9f8dd8e.png";
;// CONCATENATED MODULE: ./src/img/MasterCard.png
const MasterCard_namespaceObject = __webpack_require__.p + "079f88f888c339cec46d.png";
;// CONCATENATED MODULE: ./src/img/AmEx.png
const AmEx_namespaceObject = __webpack_require__.p + "e9fb0c743118faf34866.png";
;// CONCATENATED MODULE: ./src/img/JCB.png
const JCB_namespaceObject = __webpack_require__.p + "20d188d9ff6722578a45.png";
;// CONCATENATED MODULE: ./src/img/maestro.png
const maestro_namespaceObject = __webpack_require__.p + "04b57f93fedaceb91d7a.png";
;// CONCATENATED MODULE: ./src/img/mir.png
const mir_namespaceObject = __webpack_require__.p + "61023062c15e89e063c8.png";
;// CONCATENATED MODULE: ./src/js/widget.js








class CardFormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;

    // привязываем контекст
    this.onSubmit = this.onSubmit.bind(this);
    this.showActiveCard = this.showActiveCard.bind(this);
    this.hiddenActiveCard = this.hiddenActiveCard.bind(this);
  }

  //метод для верстки
  static get markup() {
    return `
		 <div class="card-items">
			<img class="image-item" src="${visa_namespaceObject}" alt="VISA">
			<img class="image-item" src="${MasterCard_namespaceObject}" alt="MasterCard">
			<img class="image-item" src="${AmEx_namespaceObject}" alt="AmEx">
			<img class="image-item" src="${JCB_namespaceObject}" alt="JCB">
			<img class="image-item" src="${maestro_namespaceObject}" alt="Maestro">
			<img class="image-item" src="${mir_namespaceObject}" alt="МИР">
   		</div>
		<form class="card-form-widget">
			<div class="control">
			<label for="card-input"></label>
			<input class="input" id="card-input" type="text">
			</div>
			<button class="submit">Click to Validate</button>
		</form>
		`;
  }

  // получаем все наши селекторы - input, submit и card-form-widge:
  static get inputSelector() {
    return '.input';
  }
  static get submitSelector() {
    return '.submit';
  }
  static get selector() {
    return '.card-form-widget';
  }

  // метод для отрисовки:
  bindToDom() {
    this.parentEl.innerHTML = CardFormWidget.markup;

    // находим элементы с заданным селектором внутри parentEl:
    this.element = this.parentEl.querySelector(CardFormWidget.selector);
    this.submit = this.element.querySelector(CardFormWidget.submitSelector);
    this.input = this.element.querySelector(CardFormWidget.inputSelector);

    // событие на отправку формы:
    this.element.addEventListener('submit', this.onSubmit);
  }

  // метод для отправки формы
  onSubmit(e) {
    e.preventDefault();

    // получаем данные из input:
    const value = this.input.value;

    // проверяем условия валидациии
    if (isValidCard(value)) {
      this.input.classList.add('valid');
      this.input.classList.remove('invalid');
      this.showActiveCard(value);
    } else {
      this.input.classList.add('invalid');
      this.input.classList.remove('valid');
      this.element.reset();
      this.showMessInvalid();
    }
  }

  // отображение активной карты 
  showActiveCard(value) {
    const cards = document.querySelectorAll('.image-item');
    const avtiveCard = definishonPaymentSystem(value);
    if (avtiveCard === 'Visa') {
      cards[0].style.filter = 'grayscale(0%)';
    } else if (avtiveCard === 'MasterCard') {
      cards[1].style.filter = 'grayscale(0%)';
    } else if (avtiveCard === 'American Express') {
      cards[2].style.filter = 'grayscale(0%)';
    } else if (avtiveCard === 'JCB') {
      cards[3].style.filter = 'grayscale(0%)';
    } else if (avtiveCard === 'Maestro') {
      cards[4].style.filter = 'grayscale(0%)';
    } else if (avtiveCard === 'МИР') {
      cards[5].style.filter = 'grayscale(0%)';
    }
    this.hiddenActiveCard(cards);
  }

  // скрываем цвет активной карты и удаляем введенный номер карты
  hiddenActiveCard(cards) {
    cards.forEach(index => {
      setTimeout(() => {
        index.style.filter = 'grayscale(1)';
        this.input.value = '';
      }, 2000);
    });
  }

  // показываем сообщение о том, что номер карты невалидный	
  showMessInvalid() {
    let mess = document.createElement('div');
    mess.classList.add('mess');
    mess.textContent = 'Неверный номер карты';
    this.element.insertAdjacentElement('afterbegin', mess);
    setTimeout(() => {
      mess.remove();
    }, 2000);
  }
}
;// CONCATENATED MODULE: ./src/js/app.js


// получаем контейнер из верстки:
const container = document.querySelector('.container');
const app_form = new CardFormWidget(container);

// отрисовка виджета
app_form.bindToDom();
;// CONCATENATED MODULE: ./src/index.js





// TODO: write your code in app.js
/******/ })()
;