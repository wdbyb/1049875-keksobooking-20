'use strict';

var OFFERS_COUNT = 8;
var avatarNumbers = ['01', '02', '03', '04', '05', '06', '07', '08'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var typesList = ['palace', 'flat', 'house', 'bungalo'];
var hoursList = ['12:00', '13:00', '14:00'];
var rooms = ['1', '2', '3'];
var guests = ['1', '2', '3'];
var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsBlock = document.querySelector('.map__pins');
var filtersContainer = document.querySelector('.map__filters-container');

var getRandom = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomElement = function (array) {
  return array[getRandom(0, array.length - 1)];
};

var getRandomElements = function (array) {
  var randomLength = getRandom(0, array.length);
  var randomElements = [];
  for (var i = 0; i < randomLength; i++) {
    randomElements.push(array[i]);
  }
  return randomElements;
};

var generateOffer = function () {
  var location = {
    x: getRandom(160, 980),
    y: getRandom(130, 630)
  };

  return {
    author: {
      avatar: 'img/avatars/user' + getRandomElement(avatarNumbers) + '.png'
    },
    offer: {
      title: 'Заголовок',
      address: location.x + ', ' + location.y,
      price: '3500',
      type: getRandomElement(typesList),
      rooms: getRandomElement(rooms),
      guests: getRandomElement(guests),
      checkin: getRandomElement(hoursList),
      checkout: getRandomElement(hoursList),
      features: getRandomElements(featuresList),
      description: 'Описание',
      photos: getRandomElements(photos),
    },
    location: location,
  };
};

var generateOffers = function () {
  var newArray = [];

  for (var i = 0; i < OFFERS_COUNT; i++) {
    var offer = generateOffer();

    newArray.push(offer);
  }

  return newArray;
};

var offers = generateOffers();

var createPin = function (offer) {
  var mapPinElement = mapPinTemplate.cloneNode(true);

  mapPinElement.style.left = offer.location.x + 'px';
  mapPinElement.style.top = offer.location.y + 'px';
  mapPinElement.querySelector('img').src = offer.author.avatar;
  mapPinElement.querySelector('img').alt = offer.offer.title;

  return mapPinElement;
};

var createPins = function (objects) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < objects.length; i++) {
    fragment.appendChild(createPin(offers[i]));
  }
  return fragment;
};

var fragment = createPins(offers);

pinsBlock.appendChild(fragment);

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var createPhotos = function (ticket, cardOfferPhotos) {
  var photoTemplate = cardOfferPhotos.querySelector('.popup__photo');
  for (var i = 0; i < ticket.offer.photos.length; i++) {
    var cardOfferPhoto = photoTemplate.cloneNode(true);
    cardOfferPhotos.appendChild(cardOfferPhoto);
    cardOfferPhoto.src = ticket.offer.photos[i];
  }
  photoTemplate.classList.add('hidden');
};

var createCard = function (ticket) {
  var cardTemplateElement = cardTemplate.cloneNode(true);
  var cardOfferTitle = cardTemplateElement.querySelector('.popup__title');
  var cardOfferAddress = cardTemplateElement.querySelector('.popup__text--address');
  var cardOfferPrice = cardTemplateElement.querySelector('.popup__text--price');
  var cardOffferType = cardTemplateElement.querySelector('.popup__type');
  var cardOfferRoomsAndGuests = cardTemplateElement.querySelector('.popup__text--capacity');
  var cardOfferTime = cardTemplateElement.querySelector('.popup__text--time');
  var cardOfferFeatures = cardTemplateElement.querySelector('.popup__features');
  var cardOfferDescription = cardTemplateElement.querySelector('.popup__description');
  var cardOfferPhotos = cardTemplateElement.querySelector('.popup__photos');
  var cardOfferAvatar = cardTemplateElement.querySelector('.popup__avatar');


  cardOfferTitle.textContent = ticket.offer.title;
  cardOfferAddress.textContent = ticket.offer.address;
  cardOfferPrice.textContent = ticket.offer.price + '₽/ночь';
  cardOfferRoomsAndGuests.textContent = ticket.offer.rooms + ' комнаты для ' + ticket.offer.guests + ' гостей';
  cardOfferTime.textContent = 'Заезд после ' + ticket.offer.checkin + ', выезд до ' + ticket.offer.checkout;
  cardOfferFeatures.textContent = ticket.offer.features;
  cardOfferDescription.textContent = ticket.offer.description;
  cardOfferAvatar.src = ticket.author.avatar;

  if (ticket.offer.type === 'flat') {
    cardOffferType.textContent = 'Квартира';
  } else if (ticket.offer.type === 'bungalo') {
    cardOffferType.textContent = 'Бунгало';
  } else if (ticket.offer.type === 'house') {
    cardOffferType.textContent = 'Дом';
  } else if (ticket.offer.type === 'palace') {
    cardOffferType.textContent = 'Дворец';
  }

  if (ticket.offer.photos.length !== 0) {
    createPhotos(ticket, cardOfferPhotos);
  } else {
    cardOfferPhotos.classList.add('hidden');
  }

  return cardTemplateElement;
};

var createCardFragment = function (array) {
  var cardFragment = document.createDocumentFragment();
  cardFragment.appendChild(createCard(array));

  return cardFragment;
};

document.querySelector('.map').insertBefore(createCardFragment(offers[0]), filtersContainer);

var housingType = document.querySelector('#housing-type');
var housingPrice = document.querySelector('#housing-price');
var housingRooms = document.querySelector('#housing-rooms');
var housingGuests = document.querySelector('#housing-guests');
var housingFeatures = document.querySelector('#housing-features');

housingType.setAttribute('disabled', 'disabled');
housingPrice.setAttribute('disabled', 'disabled');
housingRooms.setAttribute('disabled', 'disabled');
housingGuests.setAttribute('disabled', 'disabled');
housingFeatures.setAttribute('disabled', 'disabled');

var mapPinMain = document.querySelector('.map__pin--main');

mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  if (evt.button === 0) {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    housingType.removeAttribute('disabled', 'disabled');
    housingPrice.removeAttribute('disabled', 'disabled');
    housingRooms.removeAttribute('disabled', 'disabled');
    housingGuests.removeAttribute('disabled', 'disabled');
    housingFeatures.removeAttribute('disabled', 'disabled');
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  evt.preventDefault();
  if (evt.key === 'Enter') {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    housingType.removeAttribute('disabled', 'disabled');
    housingPrice.removeAttribute('disabled', 'disabled');
    housingRooms.removeAttribute('disabled', 'disabled');
    housingGuests.removeAttribute('disabled', 'disabled');
    housingFeatures.removeAttribute('disabled', 'disabled');
  }
});

var formPrice = document.querySelector('#price');
var formType = document.querySelector('#type');
var formTimeIn = document.querySelector('#timein');
var formTimeOut = document.querySelector('#timeout');
var formRoomNumber = document.querySelector('#room_number');
var formCapacity = document.querySelector('#capacity');

formType.addEventListener('change', function (evt) {
  evt.preventDefault();
  if (formType.value === 'bungalo') {
    formPrice.setAttribute('min', '0');
    formPrice.setAttribute('placeholder', '0');
  } else if (formType.value === 'flat') {
    formPrice.setAttribute('min', '1000');
    formPrice.setAttribute('placeholder', '1000');
  } else if (formType.value === 'house') {
    formPrice.setAttribute('min', '5000');
    formPrice.setAttribute('placeholder', '5000');
  } else if (formType.value === 'palace') {
    formPrice.setAttribute('min', '10000');
    formPrice.setAttribute('placeholder', '10000');
  }
});

formTimeIn.addEventListener('change', function () {
  fillTimeInputs(formTimeIn, formTimeOut);
});

formTimeOut.addEventListener('change', function () {
  fillTimeInputs(formTimeOut, formTimeIn);
});

var fillTimeInputs = function (arg1, arg2) {
  arg2.value = arg1.value;
};

var compareRoomsAndCapacity = function () {
  if (formRoomNumber.value < formCapacity.value) {
    formCapacity.setCustomValidity('Error');
  } else {
    formCapacity.setCustomValidity('');
  }
};

formRoomNumber.addEventListener('change', compareRoomsAndCapacity);

formCapacity.addEventListener('change', compareRoomsAndCapacity);

compareRoomsAndCapacity();
