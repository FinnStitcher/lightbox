async function commentSubmitHandler(event) {
    event.preventDefault();

    const urlArray = location.toString().split('/');
    const post_id = urlArray[urlArray.length - 1];
    const comment_text = document.querySelector('#comment_text').value.trim();
    // user id will be attached in backend

    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'post',
            body: JSON.stringify({
                comment_text: comment_text,
                post_id: post_id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            alert('Your comment has been received! Page will now refresh...');
            location.reload();
        } else {
            alert('Error: ' + response.statusText);
        }
    } else {
        alert('Brevity is the soul of wit, but you do need to type something.')
    }
};

document.querySelector('#comment-form').addEventListener('submit', commentSubmitHandler);