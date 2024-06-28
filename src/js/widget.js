import { isValidCard } from "./validators";
import {definishonPaymentSystem} from "./validators";
import visa from "../img/visa.png"
import MasterCard from "../img/MasterCard.png"
import AmEx from "../img/AmEx.png"
import JCB from "../img/JCB.png"
import maestro from "../img/maestro.png"
import mir from "../img/mir.png"

export class CardFormWidget {
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
			<img class="image-item" src="${visa}" alt="VISA">
			<img class="image-item" src="${MasterCard}" alt="MasterCard">
			<img class="image-item" src="${AmEx}" alt="AmEx">
			<img class="image-item" src="${JCB}" alt="JCB">
			<img class="image-item" src="${maestro}" alt="Maestro">
			<img class="image-item" src="${mir}" alt="МИР">
   		</div>
		<form class="card-form-widget">
			<div class="control">
			<label for="card-input"></label>
			<input class="input" id="card-input" type="text">
			</div>
			<button class="submit">Click to Validate</button>
		</form>
		`
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
		if(isValidCard(value)) {
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
		cards.forEach((index) => {
			setTimeout(() => {
				index.style.filter = 'grayscale(1)';
				this.input.value = '';
			}, 2000);
		})
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