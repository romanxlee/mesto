const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
    {
      name: 'Нургуш',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
    },
    {
      name: 'Тулиновка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
    },
    {
      name: 'Остров Желтухина',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
    },
    {
      name: 'Владивосток',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
     }
  ];

const cardsContainer = document.querySelector('.places-list');
const addButton = document.querySelector('.user-info__button');
const form = document.forms.new;
const editForm = document.forms.edit;



function loadInitial (name, link) {
    const html = `<div class="place-card">
    <div class="place-card__image" style="background-image: url(${link})">
      <button class="place-card__delete-icon"></button>
    </div>
    <div class="place-card__description">
      <h3 class="place-card__name">${name}</h3>
      <button class="place-card__like-icon"></button>
    </div>
  </div>`;
    cardsContainer.insertAdjacentHTML('beforeend', html);
}

function popUp() {
    document.querySelector('.popup').classList.toggle('popup_is-opened');
    form.reset();
}

function editPopUp() {
  document.querySelector('.popup_edit').classList.toggle('popup_edit_is-opened');
  editForm.reset();
}

function imagePopUp() {
  const popupImage = document.querySelector('.img-popup');
  const popupImg = popupImage.querySelector('.img-popup__place');
  if (event.target.classList.contains('place-card__image')) {
    popupImg.setAttribute('src', `${event.target.style.backgroundImage.slice(5, -2)}`);
    popupImage.classList.add('img-popup_is-opened');
  }
}

function imageClose() {
  document.querySelector('.img-popup').classList.remove('img-popup_is-opened');
}

function createCard(name, link) {
	const placeCard = document.createElement('div');
	cardsContainer.appendChild(placeCard);
	placeCard.classList.add('place-card');
	
	const cardImage = document.createElement('div');
	placeCard.appendChild(cardImage);
	cardImage.classList.add('place-card__image');
	cardImage.style.backgroundImage = 'url(' + link + ')';
	
	const buttonDelete = document.createElement('button');
	cardImage.appendChild(buttonDelete);
	buttonDelete.classList.add('place-card__delete-icon');
	
	const cardDescription = document.createElement('div');
	placeCard.appendChild(cardDescription);
	cardDescription.classList.add('place-card__description');
	
	const cardName = document.createElement('h3');
	cardDescription.appendChild(cardName);
	cardName.classList.add('place-card__name');
	cardName.textContent = name;
	
	const buttonLike = document.createElement('button');
	cardDescription.appendChild(buttonLike);
	buttonLike.classList.add('place-card__like-icon');
}

function addCard(event) {
    event.preventDefault();
    const name = form.elements.name;
    const link = form.elements.link;

	if (name.value.length !== 0 && link.value.length !== 0) {
		createCard(name.value, link.value)
		form.reset();
		popUp();
  };	
}

function deleteCard (event) {
	if (event.target.closest('.place-card__delete-icon')) {
		let card = event.target.closest('.place-card');
		cardsContainer.removeChild(card);
	}
}

function editProfile(event) {
  event.preventDefault();
  let infoName = document.querySelector('.user-info__name');
  let infoDescription = document.querySelector('.user-info__job');
  const nameForm = editForm.elements.name;
  const descriptionForm = editForm.elements.description;
  if (nameForm.value !== 0 && descriptionForm.value !== 0) {
  infoName.textContent = nameForm.value;
  infoDescription.textContent = descriptionForm.value;
  editPopUp(); }
}



addButton.addEventListener('click', popUp);
document.querySelector('.user-info__edit-button').addEventListener('click', editPopUp);
document.querySelector('.popup__close').addEventListener('click', popUp);
document.querySelector('.popup__close_edit').addEventListener('click', editPopUp);
editForm.addEventListener('submit', editProfile);
form.addEventListener('submit', addCard);
cardsContainer.addEventListener('click', function (event) {
    if (event.target.closest('.place-card__like-icon')) {
        event.target.classList.toggle('place-card__like-icon_liked')
    }
})


cardsContainer.addEventListener('click', deleteCard);



initialCards.forEach(function(card) {
    loadInitial(card.name, card.link);
});



cardsContainer.addEventListener('click', imagePopUp);
document.querySelector('.img-popup__close').addEventListener('click', imageClose);