const username = document.querySelector("#login-username")
const email = document.querySelector("#login-email")
const password = document.querySelector("#login-password")
const confirmPassword = document.querySelector("#login-confirm_password")
const loginBtn = document.querySelector(".btn-login")
const loginForm = document.querySelector("#login_form")

const CSS_CLASS_LIST = {
    LOGIN_ERROR: "login_error",
}

function showError(input, message) {
    const formControl = input.parentNode;
    const errorEle = formControl.querySelector('small');
    formControl.classList.add(CSS_CLASS_LIST.LOGIN_ERROR);
    errorEle.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentNode;
    const errorEle = formControl.querySelector('small');
    formControl.classList.remove(CSS_CLASS_LIST.LOGIN_ERROR);
    errorEle.innerText = '';
}

function resetInput(input) {
    input.value = '';
}

// function validateEmptyError(inputList) {
//     let isValid = true;
//     inputList.forEach(input => {
//         if (!(input.value.trim())) {
//             isValid = false;
//             showError(input, 'Can not be empty');
//         } else {
//             showSuccess(input);
//         }
//     });
//     return isValid;
// }

function validateEmailFormat(input) {
    const emailRegex =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValidEmail = emailRegex.test(input.value.trim());
    if (!isValidEmail) {
        showError(input, "Invalid email address");
    } else {
        showSuccess(input)
    }
    return isValidEmail;
}

function validateLength(input, min, max) {
    let isValid = true;
    const value = input.value.trim();
    console.log(value.length >= min && value.length <= max)
    if (!(value.length >= min && value.length <= max)) {
        isValid = false;
        showError(input, `Must be between ${min} and ${max} characters long`);
    } else {
        showSuccess(input);
    }
    return isValid;
}

function isValidUsername(username) {
    const isValidLength = validateLength(username, 3, 30);
    return isValidLength;
}

function isValidEmail(email) {
    const isValidFormat = validateEmailFormat(email);
    const isValidLength = validateLength(email, 3, 50);

    return isValidFormat && isValidLength;
}

function isValidPassword(password, confirmPassword) {
    const isValidLength = validateLength(password, 6, 30);
    const isMatchPassword = password.value === confirmPassword.value;
    if (!isMatchPassword) {
        showError(confirmPassword, 'Those passwords didn\'t match')
    } else {
        showSuccess(confirmPassword)
    }
    // const isValidPasswordFormat = ... 
    return isMatchPassword && isValidLength;
}

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Check chung sẽ hiện lỗi đồng loạt
    // const isNotEmpty = validateEmptyError([username, email, password, confirmPassword]);

    // Check như này chỉ hiện lỗi từng cái => Có thể là nhược điểm
    if (isValidUsername(username)
        && isValidEmail(email)
        && isValidPassword(password, confirmPassword)
    ) {
        Swal.fire(
            'Login successfully!',
            'Enjoy your journey!',
            'success'
        )
        resetInput(username);
        resetInput(email);
        resetInput(password);
        resetInput(confirmPassword);
    }
});
