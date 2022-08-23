async function deletePostHandler() {
	const confirmDelete = confirm(
		"Are you sure you want to delete this post? You can't get it back."
	);

	if (confirmDelete) {
		const urlArray = document.location.toString().split('/');
		const post_id = urlArray[urlArray.length - 1];

		const response = await fetch('/api/posts/' + post_id, {
			method: 'delete'
		});

		if (response.ok) {
			alert('Post has been deleted. Redirecting...');
			document.location.replace('/dashboard');
		} else {
			alert(response.statusText);
		}
	} else {
		return;
	}
}

document
	.querySelector('#delete-btn')
	.addEventListener('click', deletePostHandler);
