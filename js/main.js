'use strict';

var avatarNumbers = ['01', '02', '03', '04', '05', '06', '07', '08'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var featuresList = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var typesList = ['palace', 'flat', 'house', 'bungalo'];
var hoursList = ['12:00', '13:00', '14:00'];

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
      rooms: '2',
      guests: '2',
      checkin: getRandomElement(hoursList),
      checkout: getRandomElement(hoursList),
      features: getRandomElements(featuresList),
      description: 'Описание',
      photos: getRandomElements(photos),
    },
    location: {
      x: location.x,
      y: location.y
    }
  };
};

var OFFERS_COUNT = 8;

var getArray = function () {
  var newArray = [];

  for (var i = 0; i < OFFERS_COUNT; i++) {
    var offer = generateOffer();

    newArray.push(offer);
  }

  return newArray;
};

var offers = getArray();

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var createPin = function (offer) {
  var mapPinElement = mapPinTemplate.cloneNode(true);

  mapPinElement.style.left = offer.location.x + 'px';
  mapPinElement.style.top = offer.location.y + 'px';
  mapPinElement.querySelector('img').src = offer.author.avatar;
  mapPinElement.querySelector('img').alt = offer.offer.title;

  return mapPinElement;
};

var pinsBlock = document.querySelector('.map__pins');

var createPins = function (objects) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < objects.length; i++) {
    fragment.appendChild(createPin(offers[i]));
  }
  return fragment;
};

var fragment = createPins(offers);

pinsBlock.appendChild(fragment);
