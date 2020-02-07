# gagtivate-frontend

Frontend of GAGTiv8

-   URL
    http://localhost:8080
-   CDN
    -   JQUERY
        ```
        <script src="https://ajax.googleapis.com/ajax/libs/mootools/1.6.0/mootools.min.js"></script>
        ```
    -   AXIOS
        ```
        <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
        ```
-   THIRD PARTY GOOGLE SIGN UP
    -   integrate google sign in
        -   configure a project
        -   Load the Google Platform Library
        ```
            <script src="https://apis.google.com/js/platform.js" async defer></script>
        ```
        -   Add a Google Sign-In button
        ```
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
        ```
        -   Sign out a user
        ```
            $("button#logout").on("click", () => {
                var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                    localStorage.clear()
                });
                showLoginButton()
            })
        ```
    -   Authenticate with a backend server
        -   Send the ID token to your server
        ```
            function onSignIn(googleUser) {
                let id_token = googleUser.getAuthResponse().id_token;
                showLogoutButton()
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
                        console.log(err, `error OAuth`)
                    })
            }
        ```
        -   Verify the integrity of the ID token
            -   npm install google-auth-library
            ```
                npm install google-auth-library
            ```
            -   validation in controller
            ```javascript
            const { OAuth2Client } = require('google-auth-library')
            const client = new OAuth2Client(process.env.CLIENT_ID)
            class SigninController {
                static signIn(req, res, next) {
                    let token = req.headers.id_token
                    let email
                    client
                        .verifyIdToken({
                            idToken: token,
                            audience: process.env.CLIENT_ID
                        })
                        .then(data => {
                            email = data.payload.email
                            return User.findOne({
                                where: {
                                    email
                                }
                            })
                        })
                        .then(data => {
                            if (!data) {
                                return User.create({
                                    email,
                                    password: process.env.GOOGLE_PASS
                                })
                            } else return data
                        })
                        .then(data => {
                            let token = jwt.sign(
                                data.email,
                                process.env.PRIVATE_KEY
                            )
                            let response = {
                                token,
                                id: data.id
                            }
                            res.status(200).json(response)
                        })
                        .catch(err => {
                            console.log(err)
                            next(err)
                        })
                }
            }
            ```
-   Third party API
    -   gstatic Chart
    ```
        https://www.gstatic.com/charts/loader.js
    ```
    -   Twitter
    ```
        https://api.twitter.com/1.1/trends/place.json?id=1
    ```
    -   imgur
    ```
        https://api.imgur.com/3/image
    ```
