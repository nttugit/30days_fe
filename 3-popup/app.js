const openModalBtn = document.querySelector('.open-modal-btn');
const modal = document.querySelector('.modal');
const closeModalBtn = document.querySelector('.close-modal-btn');
const closeModalIcon = document.querySelector('.close-modal-icon');

function toggleModal() {
    modal.classList.toggle('hide');
}

openModalBtn.addEventListener('click', toggleModal)
modal.addEventListener('click', (e) => {
    // check if current target is the modal body
    if (e.target == e.currentTarget) {
        toggleModal()
    }
})
closeModalBtn.addEventListener('click', toggleModal)
closeModalIcon.addEventListener('click', toggleModal)
