fetch('/api/users/logout', {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    }
})
.then(() => {
    setTimeout(() => {
        document.location.replace('/');
    }, 1000);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});