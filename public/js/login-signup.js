async function loginHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({username, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            console.log(response);
        } else {
            console.log(response);
        }
    }
};

async function signupHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({username, email, password}),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response.ok) {
            console.log(response);
        } else {
            console.log(response);
        }
    }
};

document.querySelector('#login').addEventListener("submit", loginHandler);
document.querySelector('#signup').addEventListener("submit", signupHandler);