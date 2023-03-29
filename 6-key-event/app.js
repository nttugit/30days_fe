const alert = document.querySelector('.alert');
const box = document.querySelector('.box');
const result = document.querySelector('.result');
const eKey = document.querySelector('.card.key p:last-child');
const eLocation = document.querySelector('.card.location p:last-child');
const eWhich = document.querySelector('.card.which p:last-child');
const eCode = document.querySelector('.card.code p:last-child');

document.addEventListener('keydown', function (e) {
    result.innerText = e.which;

    eKey.innerText = e.key;
    eLocation.innerText = e.location;
    eWhich.innerText = e.which;
    eCode.innerText = e.code;

    if (box.classList.contains('hide')) {
        alert.classList.add('hide');
        box.classList.remove('hide');
    }
});