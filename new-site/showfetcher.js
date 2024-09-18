const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsA8WweuIqAmaLf9oY38_ezsd_LCOrgTrGEh7eXQBy91d2xwD-NqBlFdc6GvBkay8ZgRCWbwzjHAZM/pub?output=csv';
let rows = [];
let counter = 0;
let lazy = false;
let allShows = [];
let showSection = '';

function addShow(show, lazy) {
    let showName = show[0];
    let showWeekday = show[1];
    let showTime = show[2];
    let showDate = show[3];
    let showDesc = show[4];
    let showImage = show[5];
    let showAltText = show[6];
    let lazyTag = '';
    if (lazy) {
        lazyTag = 'loading="lazy"';
    }
    let showTemplate = `
        <figure class="show">
            <img class="show-pic" src="/images/music/${showImage}" ${lazyTag} alt="${showAltText}" />
            <figcaption class="show-info">
                <section class="music-bio">
                    <h2>${showName}</h2>
                    <h6>${showDesc}</h6>
                </section>
                <section class="showtime">
                    <h6>${showWeekday}, ${showDate}<br>${showTime}</h6>
                </section>
            </figcaption>
        </figure>
    `;
    allShows.push(showTemplate);
}

function fetchShowSheet(url) {
    fetch(url)
    .then(response => response.text())
    .then(data => {
        Papa.parse(data, {
            complete: function(results) {
                rows = results.data;
                for (let show of rows) {
                    if (counter > 3 && !lazy) {
                        lazy = true;
                    }
                    if (show[7] && show[7].trim() === 'TRUE') {
                        addShow(show, lazy);
                    }
                    counter++;
                }

                showSection = `
                <h1>MUSIC</h1>
                ${allShows.join('\n')}
                    <!-- <figure class="soon">
                        <br>
                        <h3>A L S O</h3><br>
                        <h4>The White Ducks</h4>
                        <h5>August 20</h5><br>
                    </figure> -->

                    <figure class="previously">
                        <h3>P R E V I O U S L Y</h3>
                        <h5>
                        Raggedly Adler<br>
                        Brooke Bates<br>
                        Tad Kroening<br>
                        Ludlings<br>
                        Towse<br>
                        Channing Waage<br>
                        Matney Cook<br>
                        Ivan Sandomire<br>
                        Roger Thorne<br>
                        Shannon Patiño<br>
                        Louis Ledford<br>
                        Norah McLaughlin<br>
                        Cullen Gray<br>
                        Morgan McHugh<br>
                        Pete Irving & Mickey Stylin<br>
                        Tenderpile's Smile Aisle</br>
                        Lucas Warford<br>
                        Free Harmony<br>
                        Sarah Goodin<br>
                        Sam Chue<br>
                        Chuck and Carr<br>
                        The House Wrens<br>
                        Octavia McAloon<br>
                        David Donohue<br>
                        Ron Hardesty<br>
                        Paige Woods<br>
                        The Moving Hats<br>
                        Blue Collar Grass Band<br>
                        Emily Freudenberger<br>
                        Badd Dogg Howl-O-Ween<br>
                        Russell Thompson</h5>
                    </figure>
                `;

                document.getElementById('music-wrapper').innerHTML = showSection;
            }
        });
    })
    .catch(error => console.error('Error fetching the Google Sheet:', error));
}

fetchShowSheet(url);