function onSignIn(googleUser) {
    let id_token = googleUser.getAuthResponse().id_token;
    axios({
        method: "POST",
        url: "http://localhost:3000/signin",
        headers: {id_token}
    })
        .then((response) => {
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('id', response.data.id)
        })
        .catch((err) => {
            console.log(err)
        })
}