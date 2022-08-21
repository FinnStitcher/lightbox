async function postSubmitHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('#post-text').value.trim();
    // user id will be attached in backend

    if (title && text) {
        const response = await fetch('/api/posts', {
            method: 'post',
            body: JSON.stringify({
                title: title,
                text: text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Your post has been received. Redirecting...');
            document.location.replace('/dashboard');
        } else {
            alert('Error: ' + response.statusText);
        }
    } else {
        alert('Brevity is the soul of wit, but you do need to type something. Fill out both fields.');
    }
};

document.querySelector('#post-form').addEventListener('submit', postSubmitHandler);