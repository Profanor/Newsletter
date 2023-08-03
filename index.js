function validateForm () {
//grab the mailbox
const eMail = document.querySelector('#email');
const form = document.querySelector('#subscribe');

//email validation
const checkEmail = () => {
    let valid = false;
    const email = eMail.value.trim();

    if (!isRequired(email)) {
        showError(eMail, 'email cannot be blank.');
    }   else if (!isEmailValid(email)) {
        showError(eMail, 'Valid email required');
    }   else {
        showSuccess(eMail);
        valid = true;
    }
        return valid;
}; 

// utility functions
const isRequired = value => value === '' ? false : true;
const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

// error and success classes
const showError = (input, message) => {
    const user = input.parentElement;
    user.classList.remove('success');
    user.classList.add('error');

    //show the error message
    const error = user.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    const user = input.parentElement;
    user.classList.remove('error');
    user.classList.add('success');

    //hide the error message
    const error = user.querySelector('small');
    error.textContent = '';
}

//modified eventlistener
form.addEventListener('subscribe', function (e) {
    //prevent the form from submitting
    e.preventDefault();

    //validate fields
    let  isEmailValid = checkEmail();

    let isFormValid =  isEmailValid;

    //submit to the server if the form is valid
    if (isFormValid) {

    }    
});

//debouncing feature
const debounce = (fn, delay = 500) => {
    let timeoutId;
        return (...args) => {
        //cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        //setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};
//instant feedback feature
form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'email':
            checkEmail();
            break;
    }
}));

}