const baseUrl = `http://localhost:3000`

function hFetchAll() {
    const token = localStorage.token
    const config = {
        headers: {
            token
        }
    }

    axios
        .get(baseUrl, config)
        .then(({ data }) => {
            const posts = data.data
            console.log(posts)
            $('#find-all-container').empty()
            for (let i = 0; i < posts.length; i++) {
                $('#find-all-container').append(`
                <div class="w3-card-4" style="width:50%">
                    <div class="w3-container w3-center">
                        <p>${posts[i].title}</p>
                    </div>
                    <img
                        src="${posts[i].url}"
                        style="width:100%"
                    />
                    <center>
                        <p>${posts[i].tags}</p>
                    </center>
                </div>
                `)
            }
        })
        .catch(err => {
            console.log('err', err)
        })
}

function createNewPost() {
    const formData = new FormData()
    const imagefile = document.querySelector('#gambar')
    const UserId = localStorage.id
    console.log(imagefile)
    // const title = document.querySelector('#create-title')
    // const tags = document.querySelector('#create-tags')
    const title = $('#create-title').val()
    const tags = $('#create-tags').val()
    formData.append('title', title)
    formData.append('UserId', UserId)
    formData.append('tags', tags)
    formData.append('image', imagefile.files[0])
    axios
        .post('http://localhost:3000', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(result => {
            console.log(result)
        })
        .catch(err => {
            console.log(err)
        })
}

function hFetchTrends() {
    const token = localStorage.token
    const config = {
        headers: {
            token
        }
    }

    axios
        .get(baseUrl + '/trends', config)
        .then(({ data }) => {
            const posts = data.data
            console.log(posts)
            $('#trends-section').empty()
            console.log(posts[0])
            for (let i = 0; i < posts.length; i++) {
                $('#trends-section').append(`
                <div class="w3-card-4" style="width:50%">
                    <div class="w3-container w3-center">
                        <a href="${posts[i].url}">${posts[i].name}</a>
                    </div>
                    <center>
                        <p>Total Tweets: ${posts[i].tweet_volume}</p>
                    </center>
                </div>
                `)
            }
        })
        .catch(err => {
            console.log('err', err)
        })
}

// END OF HERI


function deleteImage(id) {
    $.ajax({
        url: `http://localhost:3000/${+id}`,
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

function showLoginButton() {
    $('#login-element').show()
    $('main').hide()
    $('header').hide()
    $('div.container').hide()
}

function showLogoutButton() {
    // $('.g-signin2').hide()
    $('#login-element').hide()
    $('main').show()
    $('header').show()
    $('#find-all-container').show()
    hFetchAll()
}

function initialInterface() {
    $('div.container').hide()
    // $('div#findAll-container').hide()
    $('#find-all-container').hide()
    let token = localStorage.getItem('token')
    if (token) {
        showLogoutButton()
    } else showLoginButton()
}

function drawChart() {
    axios
        .get('http://localhost:3000/charts')
        .then(result => {
            console.log(result)

            const charts = result.data.data

            const newchart = charts.map(el => {
                return [el.date, +el.count]
            })

            newchart.unshift(['Date', 'Count'])

            console.log(newchart)

            var data = google.visualization.arrayToDataTable(newchart)

            var options = {
                title: 'Daily Uploads',
                curveType: 'function',
                legend: { position: 'bottom' }
            }

            var chart = new google.visualization.LineChart(
                document.getElementById('curve_chart')
            )

            chart.draw(data, options)
        })
        .catch(err => {
            console.log(err)
        })
}

$(document).ready(function() {
    initialInterface()

    // HERI

    hFetchAll()

    $('#upload-file').on('submit', function(event) {
        event.preventDefault()
        // console.log('cki')
        createNewPost()
    })

    // END OF HERI

    //upload image
    // $('#uploadAll').on("submit", (e) => {
    //     e.preventDefault()
    //     console.log('hehehhe')
    //     uploadImage()
    // })

    $('#show-new-post').on('click', function() {
        // $('#form-new-post').show()

        // $('#form-new-post').show()
        $('#form-new-post').hide()
        $('#find-all-container').hide()
        $('#w3-container').show()
        $('#trends-section').hide()
        $('div.container').hide()

        // $('#w3-container').show()
        // $('#find-all-container').hide()
        // $('#trends-section').hide()
    })

    $('#show-trends').on('click', function() {
        $('#form-new-post').hide()
        $('#find-all-container').hide()
        $('#w3-container').hide()
        $('#trends-section').show()
        hFetchTrends()
    })

    $('#addImage').submit(function(event) {
        event.preventDefault()
        console.log('cki')
        uploadImage()
    })

    $('button#logout').on('click', () => {
        var auth2 = gapi.auth2.getAuthInstance()
        auth2.signOut().then(function() {
            localStorage.clear()
        })

        showLoginButton()
    })

    // MEMUNCULKAN CHARTS-------------------
    $('#show-charts').on('click', () => {
        $('div.container').show()
        $('#find-all-container').hide()
        $('#w3-container').hide()
        $('#trends-section').hide()
        drawChart()
    })

    // BALIK KE HOME------------------------
    $('#show-home').on('click', () => {
        $('#find-all-container').show()
        // $('div.container').hide()
        $('#w3-container').hide()
        $('#trends-section').hide()
        hFetchAll()
    })

    $('#show-post').on('click', () => {
        $('div.container').hide()
        $('#find-all-container').show()
        $('#w3-container').hide()
        $('#trends-section').hide()
    })

    google.charts.load('current', { packages: ['corechart'] })
    google.charts.setOnLoadCallback(drawChart)
})
