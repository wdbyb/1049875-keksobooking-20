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
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinsBlock = document.querySelector('.map__pins');

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

map.classList.remove('map--faded');

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

var createCard = function (foo) {
  var PHOTOS_COUNT = 2;
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


  cardOfferTitle.textContent = foo.offer.title;
  cardOfferAddress.textContent = foo.offer.address;
  cardOfferPrice.textContent = foo.offer.price + '₽/ночь';
  cardOfferRoomsAndGuests.textContent = foo.offer.rooms + ' комнаты для ' + foo.offer.guests + ' гостей';
  cardOfferTime.textContent = 'Заезд после ' + foo.offer.checkin + ', выезд до ' + foo.offer.checkout;
  cardOfferFeatures.textContent = foo.offer.features;
  cardOfferDescription.textContent = foo.offer.description;
  cardOfferAvatar.src = foo.author.avatar;

  if (foo.offer.type === 'flat') {
    cardOffferType.textContent = 'Квартира';
  } else if (foo.offer.type === 'bungalo') {
    cardOffferType.textContent = 'Бунгало';
  } else if (foo.offer.type === 'house') {
    cardOffferType.textContent = 'Дом';
  } else if (foo.offer.type === 'palace') {
    cardOffferType.textContent = 'Дворец';
  }

  for (var i = 0; i < PHOTOS_COUNT; i++) {
    var cardOfferPhoto = cardOfferPhotos.querySelector('.popup__photo').cloneNode(true);
    cardOfferPhotos.appendChild(cardOfferPhoto);
  }

  if (foo.offer.photos.length !== 0) {
    if (foo.offer.photos.length <= 1) {
      cardOfferPhotos.children[0].src = foo.offer.photos[0];
      cardOfferPhotos.children[1].classList.add('hidden');
      cardOfferPhotos.children[2].classList.add('hidden');
    } else if (foo.offer.photos.length <= 2) {
      cardOfferPhotos.children[0].src = foo.offer.photos[0];
      cardOfferPhotos.children[1].src = foo.offer.photos[1];
      cardOfferPhotos.children[2].classList.add('hidden');
    } else if (foo.offer.photos.length <= 3) {
      cardOfferPhotos.children[0].src = foo.offer.photos[0];
      cardOfferPhotos.children[1].src = foo.offer.photos[1];
      cardOfferPhotos.children[2].src = foo.offer.photos[2];
    }
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

document.querySelector('.map').appendChild(createCardFragment(offers[0]));
