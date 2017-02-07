'use strict';

// Показ карточки объявления

var pins = document.querySelectorAll('.pin');
pins.forEach(function (pin, i) {
  pin.addEventListener('click', function () {
    document.querySelector('.dialog').style.display = 'block';
    var activePin = document.querySelector('.pin--active');
    if (activePin) {
      activePin.classList.remove('pin--active');
    }
    pin.classList.add('pin--active');
  });
});

// Закрытие карточки объявления

var dialog = document.querySelector('.dialog');
var dialogClose = document.querySelector('.dialog__close');
dialogClose.addEventListener('click', function () {
  dialog.style.display = 'none';
  var activePin = document.querySelector('.pin--active');
  if (activePin) {
    activePin.classList.remove('pin--active');
  }
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

console.log(countPlaces);

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
