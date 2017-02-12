'use strict';



var pins = document.querySelectorAll('.pin');
var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');
var pinActive = document.querySelector('.pin--active');

// функция удаления класс "активности" элемента.
var pinDeactivation = function () {
  pinActive.classList.remove('pin--active');
};

// функция добавления класс "активности" элемента.
var pinActivation = function (pin) {
  pinActive = pin;
  console.log('---------');
  console.log(pin);
  pinActive.classList.add('pin--active');
};

// Переключение класса "активности" на элемент на который кликнули.
var toggleActive = function (pin) {
  pin.addEventListener('click', function () {
    pinDeactivation();
    pinActivation(pin);
    dialog.style.display = 'block';
  });
};

// Показ карточки объявления.
for (var i = 0; i < pins.length; i++) {
  toggleActive(pins[i]);
}

// Закрытие карточки объявления.
dialogClose.addEventListener('click', function () {
  pinDeactivation();
  dialog.style.display = 'none';
});



// Проверка правильности введенных данных

var titleLimits = document.querySelector('#title');
titleLimits.setAttribute('minlength', 30);
titleLimits.setAttribute('maxlength', 100);
titleLimits.setAttribute('required', true);

var priceNeed = document.querySelector('#price');
priceNeed.setAttribute('required', true);
priceNeed.setAttribute('type', 'number');
priceNeed.setAttribute('min', 1000);
priceNeed.setAttribute('max', 1000000);

var addressNeed = document.querySelector('#address');
addressNeed.setAttribute('required', true);

// Автоматическая корректировка полей в форме.
    // Поля «время заезда» и «время выезда» синхронизированы

var checkinTime = document.querySelector('#time');
var checkoutTime = document.querySelector('#timeout');

var checkinTimeChanged = function () {
  checkoutTime.value = checkinTime.value;

};
var checkoutTimeChanged = function () {
  checkinTime.value = checkoutTime.value;
};

checkinTime.addEventListener('change', checkinTimeChanged);
checkoutTime.addEventListener('change', checkoutTimeChanged);

    // Значение поля «Тип жилья» синхронизировано с минимальной ценой

var housingType = document.querySelector('#type');
var minPrice = document.querySelector('#price');

var housingTypeChanged = function () {
  switch (housingType.value) {
    case 'flat':
      minPrice.setAttribute('min', 1000);
      minPrice.setAttribute('placeholder', 1000);
      break;
    case 'hovel':
      minPrice.setAttribute('min', 0);
      minPrice.setAttribute('placeholder', 0);
      break;
    case 'palace':
      minPrice.setAttribute('min', 10000);
      minPrice.setAttribute('placeholder', 10000);
      break;
  }
};

var minPriceChanged = function () {
  if (minPrice.value < 1000) {
    housingType.value = 'hovel';
  } else if (minPrice.value >= 1000 && minPrice.value < 10000) {
    housingType.value = 'flat';
  } else if (minPrice.value >= 10000) {
    housingType.value = 'palace';
  }
};

housingType.addEventListener('change', housingTypeChanged);
minPrice.addEventListener('change', minPriceChanged);

    // Количество комнат связано с количеством гостей: 2 или 100 комнат — «для 3 гостей»; 1 комната — «не для гостей

var countRooms = document.querySelector('#room_number');
var countPlaces = document.querySelector('#capacity');

var countRoomsChanged = function () {
    switch (countRooms.value) {
      case ('1_room' || '2_rooms'):
        countPlaces.value = '3_guests';
        break;
      case '100_rooms':
        countPlaces.value = 'not_guests';
        break;
    }
};

var countPlacesChanged = function () {
     if (countPlaces.value === '3_guests') {
       countRooms.value = '1_room';
     }
     else {
       countRooms.value = '100_rooms';
     }
};

countRooms.addEventListener('change', countRoomsChanged);
countPlaces.addEventListener('change', countPlacesChanged);
