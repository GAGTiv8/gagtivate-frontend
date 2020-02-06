function showLoginButton() {
    $(".g-signin2").show()
    $("button#logout").hide()
}

function showLogoutButton(){
    $(".g-signin2").hide()
    $("button#logout").show()
}

function initialInterface() {
    let token = localStorage.getItem('token')
    if(token) {
        showLogoutButton()
    }
    else showLoginButton()
}

$(document).ready(function() {
    // initialInterface()

    $("button#logout").on("click", () => {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            localStorage.clear()
        });
        // initialInterface()
    })
})