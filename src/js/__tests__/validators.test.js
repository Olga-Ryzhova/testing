import { isValidCard, definishonPaymentSystem} from '../validators';

test.each([
  ['', false],
  [' ', false],
  ['4526172', false],
  ['4111111111111111', true],
])('проверка на корректный ввод карты', (number, expected) => {
  expect(isValidCard(number)).toBe(expected);
});

test.each([
  ['4556799729554961', 'Visa'],
  ['5483874105838687', 'MasterCard'],
  ['340807467985948', 'American Express'],
  ['3542449645689512', 'JCB'],
  ['6761475891089153', 'Maestro'],
  ['2034009452070352', 'МИР']
])('проверка карты с номером %s на соответствие платежной системы %s', (number, expected) => {
  expect(definishonPaymentSystem(number)).toBe(expected);
});