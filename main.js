const baseUrl = `http://localhost:3000`

function uploadImage() {
    const titleImage = $('#uploadTitle')
    const urlImage = $('#uploadImage')
    const tagImage = $('#uploadTag')

    $.ajax({
        url: `${baseUrl}/posts`,
        method: `POST`,
        data: {
            titleImage, urlImage, tagImage
        },
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(response => {
        console.log(`upload success!`)
        fetchImage()
    })
    .fail(err => {
        console.log(err)
    })
}

function fetchAll() {
    $.ajax(`${baseUrl}/posts`, {
        method: 'GET',
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(images => {
        //belum tau format hasil images nya, coba console log dulu biar ga kegulung
        console.log(images)
        $('#title-image').empty()
    })
    .fail(err => {
        console.log(err)
    })
}

function fetchOne(id) {
    $.ajax(`${baseUrl}/posts/${id}`, {
        method: 'GET',
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(image => {
        //mau cek isi result image dulu
        console.log(image)
    })
    .fail(err => {
        console.log(err)
    })
}

function updateImage(id) {
    const editTitle = $('#editTitle')
    const editTag = $('#editTag')

    $.ajax(`${baseUrl}/posts/${id}`, {
        method: 'PUT',
        data: {
            editTitle, editTag
        },
        headers: {
            access_token: localStorage.access_token
        }
    })
    .done(image => {
        console.log(image)
    })
    .fail(err => {
        console.log(err)
    })
}

function deleteImage(id) {
    $.ajax({
        url: `${baseUrl}/posts/${+id}`,
        method: 'DELETE',
        headers: {access_token: localStorage.access_token}
    })
    .done((data) => {
        console.log(`post with ${id} deleted!`)
        fetchAll()
    })
    .fail((err) => {
        console.log(err)
    })
}

// // OPTIONAL
// function fetchByTag(tag) {
// }    
    //findAll Images by UserId --> setelah login berhasil
    //findOneImage by specific Tag
    //updateImage by Id
    //deleteImage by Id
function showLoginButton() {
    $(".g-signin2").show()
    $("main").hide()
    $("header").hide()
}

function showLogoutButton(){
    $(".g-signin2").hide()
    $("main").show()
    $("header").show()
}

function initialInterface() {
    $("div.container").hide()
    $("div#findAll-container").hide()
    let token = localStorage.getItem('token')
    if(token) {
        showLogoutButton()
    }
    else showLoginButton()
}

$(document).ready(function() {
    initialInterface()
    //upload image
    $('#uploadAll').on("submit", (e) => {
        e.preventDefault()
        uploadImage()
    })

    $("button#logout").on("click", () => {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            localStorage.clear()
        });
        showLoginButton()
    })
    
    // MEMUNCULKAN CHARTS-------------------
    $("#show-charts").on("click", () => {
        $("div.container").show()
        $("div#findAll-container").hide()
        $("div.w3-container").hide()
    })

    // BALIK KE HOME------------------------
    $("#show-home").on("click", () => {
        $("div#findAll-container").hide()
        $("div.container").hide()
        $("div.w3-container").show()
    })

    $("#show-post").on("click", () => {
        $("div.container").hide()
        $("div#findAll-container").show()
        $("div.w3-container").hide()
    })

})