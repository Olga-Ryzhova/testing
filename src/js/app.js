import { CardFormWidget } from "./widget";

// получаем контейнер из верстки:
const container = document.querySelector('.container');
const form = new CardFormWidget(container);

// отрисовка виджета
form.bindToDom();