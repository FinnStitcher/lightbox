async function editSubmitHandler(event) {
    event.preventDefault();

    const urlArray = document.location.toString().split('/');
    const post_id = urlArray[urlArray.length - 1];
    const title = document.querySelector('#post-title').value.trim();
    const text = document.querySelector('#post-text').value.trim();

    if (title && text) {
        const response = await fetch('/api/posts/' + post_id, {
            method: 'put',
            body: JSON.stringify({
                title: title,
                text: text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Your edit has been made. Redirecting...');
            document.location.replace('/posts/' + post_id);
        } else {
            alert('Error: ' + response.statusText);
        }
    } else {
        alert('Brevity is the soul of wit, but you do need to type something. Fill out both fields.');
    }
}

document.querySelector('#post-form').addEventListener('submit', editSubmitHandler);