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

$(document).ready(() => {
    //login
    //logout

    //upload image
    $('#uploadAll').on("submit", (e) => {
        e.preventDefault()
        uploadImage()
    })
    
    //findAll Images by UserId --> setelah login berhasil
    //findOneImage by specific Tag
    //updateImage by Id
    //deleteImage by Id
})