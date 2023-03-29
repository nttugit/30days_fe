const searchContent = document.querySelector('.search_box-content');
const searchInput = document.querySelector('.search_box-content input');
const removeTagBtns = document.querySelectorAll('.search_box-content li i');
const removeAllBtn = document.querySelector('.search_box-remove_btn');

function removeTag(e) {
    e.target.parentElement.remove();
}

function addTag(text) {
    const newTagEl = document.createElement('li');
    const newRemoveTagEl = document.createElement('i');
    newRemoveTagEl.className = 'fas fa-times';
    // newTagEl.innerHTML = `${text}<i class="fas fa-times"></i>`;
    newRemoveTagEl.addEventListener('click', removeTag);
    newTagEl.textContent = text;
    newTagEl.appendChild(newRemoveTagEl)
    searchContent.insertBefore(newTagEl, searchContent.lastElementChild);
}

searchInput.addEventListener('keydown', function (e) {
    if (e.keyCode === 13) {
        const enteredValue = this.value.trim();
        addTag(enteredValue)
        this.value = ''
        this.focus();
    }
});

// Khởi tạo event lúc đầu, k cần cũng được, vì lúc đầu k có sẵn tags, hoặc vậy cho chắc
removeTagBtns.forEach((removeTagBtn) => {
    removeTagBtn.addEventListener('click', removeTag);
})

removeAllBtn.addEventListener('click', function (e) {
    searchContent.innerHTML = ``;
    searchInput.value = ''
    searchContent.appendChild(searchInput);
})

// Cách 2 như video: tạo list tags[], re-render lại sao mỗi lần thao tác