const CARD_UPDATE_EVENT_NAME = 'cardupdate';

const section = document.querySelector('.form section');
const fileInput = document.querySelector('#file-input');
const profileCard = document.querySelector('.profile-card');
const nameInput = document.querySelector('#name');
const occupationInput = document.querySelector('#occupation');

section.addEventListener('dragover', handleDragOver);
section.addEventListener('dragenter', handleDragEnter);
section.addEventListener('drop', handleDrop);

profileCard.addEventListener(CARD_UPDATE_EVENT_NAME, handleCardUpdate);

fileInput.addEventListener('change', (event) => {
  handleFileUpload(event.target.files[0]);
});

occupationInput.addEventListener('change', (event) => {
  dispatchCardEvent({
    occupation: event.target.value,
  });
});

nameInput.addEventListener('change', (event) => {
  dispatchCardEvent({
    name: event.target.value,
  });
});

function handleDragOver(event) {
  event.preventDefault();

  if (!event.dataTransfer.types.includes("Files")) {
    return;
  }

  event.dataTransfer.dropEffect = "copy";
}

function handleDragEnter(event) {
  event.preventDefault();

  if (!event.dataTransfer.types.includes("Files")) {
    return;
  }
}

function handleDrop(event) {
  event.preventDefault();
  
  const file = event.dataTransfer.files[0];

  if (!file.type.startsWith("image/")) {
    alert("Only image files are allowed.");
    return;
  }

  handleFileUpload(file);
}

function handleFileUpload(file) {
  const fileReader = new FileReader();

  fileReader.addEventListener("load", (event) => {
    dispatchCardEvent({
      image: event.target.result,
    });
  });

  fileReader.readAsDataURL(file);
}

function dispatchCardEvent(data) {
  profileCard.dispatchEvent(
    new CustomEvent(CARD_UPDATE_EVENT_NAME, {
      detail: data,
    })
  );
}

function handleCardUpdate({ detail: { image, name, occupation } }) {
  if (image) {
    profileCard.querySelector('img').src = image;
  } else if (name) {
    profileCard.querySelector('span.name').textContent = name;
  } else if (occupation) {
    profileCard.querySelector('span.occupation').textContent = occupation;
  }
}
