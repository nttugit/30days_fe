const searchBox = document.querySelector('.search-box');
const searchBoxInput = document.querySelector('.search-box__input');
const searchBoxBtn = document.querySelector('.search-box__btn');

// Cách 1: Arrow function không dùng this được, cẩn thận khi dùng class
// searchBoxBtn.addEventListener('click', () => {
//     searchBox.classList.add('open');
//     searchBoxInput.focus();
// });

function closeSearchBoxInput() {
    searchBox.classList.remove('open');
    searchBoxInput.value = ""
}

// Cách 2
searchBoxBtn.addEventListener('click', function () {
    if (!searchBox.classList.contains('open')) {
        searchBox.classList.add('open');
        this.previousElementSibling.focus();
    } else {
        closeSearchBoxInput();
    }
});

document.addEventListener('keyup', function (e) {
    if (e.keyCode === 13) {
        closeSearchBoxInput();
    }
})