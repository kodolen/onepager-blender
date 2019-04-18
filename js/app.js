//global variables
let dropDownOpen = false;
let dropDownNoteOpen = false;
let issuesPopUpOpen = false;

let defaultCenter = {
    lat: 52.867452,
    lng: 6.190950
};

let mapeType = 'terrain';
let ndviOverlay;
let ndviOverlayTwo;
let marker = [];
let markers = [];
let check = false;


function closeIssues() {

    $('#issues').removeClass('open');
    issuesPopUpOpen = false;

}

//Dropdown for map type
function dropDown() {

    // let dropDown = document.querySelector('.drop-down');

    if (dropDownOpen === false) {

        $('.drop-down').addClass('open');
        console.log('open');
        dropDownOpen = true;

    }

    else {

        $('.drop-down').removeClass('open');
        dropDownOpen = false;
        console.log('closed');

    }

}

//Dropdown for map type
function dropDownNote() {

    // let dropDown = document.querySelector('.drop-down');

    if (dropDownNoteOpen === false) {

        $('.drop-down-notificiation').addClass('open');
        console.log('open');
        dropDownNoteOpen = true;

    }

    else {

        $('.drop-down-notificiation').removeClass('open');
        dropDownNoteOpen = false;
        console.log('closed');

    }

}

//given controls to add to maps
function setControls(map, markers, infoWindow) {

    let imageBounds = {
        north: 52.888341,
        south: 52.844867,
        east: 6.228442,
        west: 6.153216
    };

    ndviOverlay = new google.maps.GroundOverlay(
        'images/ndvi-place-opacity-0.66-2.png',
        imageBounds);

    ndviOverlayTwo = new google.maps.GroundOverlay(
        'images/ndvi-place-opacity-0.66-1.png',
        imageBounds);

    let toggle = document.getElementById('toggle');
    toggle.addEventListener('click', function(){

       if(toggle.checked === true && check === true){
           ndviOverlayTwo.setMap(map);
       }
       else {
           ndviOverlayTwo.setMap(null);
       }

    });

    let terrain = document.getElementById('terrain');
    terrain.addEventListener('click', function () {
        mapeType = "terrain";
        check = false;
        ndviOverlay.setMap(null);
        map.setMapTypeId(mapeType);
    });

    let satellite = document.getElementById('satellite');
    satellite.addEventListener('click', function () {
        mapeType = 'satellite';
        check = true;
        ndviOverlay.setMap(map);
        map.setMapTypeId(mapeType);

        for (i = 0; i > markers.length; i++) {

            console.log(markers[i]);
        }

    });

    ndviOverlay.addListener('click', function () {
        issuesPopUp();
    });

    let addIssue = document.getElementById('add-issue');
    addIssue.addEventListener('click', function () {
        marker = new google.maps.Marker({
            position: defaultCenter,
            map: map,
            draggable: true,
        });
        marker.addListener('click', function () {
            infoWindow.open(map, marker);
        })

    });


}

function issuesPopUp() {

    console.log('hey');


    if (issuesPopUpOpen === false) {

        $('#issues').addClass('open');
        issuesPopUpOpen = true;

    }

    else {

        $('#issues').removeClass('open');
        issuesPopUpOpen = false;

    }

}

//draw google maps
function initMap() {

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: defaultCenter,
        mapTypeId: mapeType,
        streetViewControl: false,
        fullscreenControl: false,
        mapTypeControl: false,
        zoomControl: false

    });

    let markerPos = {

        "coords": [{lat: 52.873328, lng: 6.188167}, {lat: 52.867629, lng: 6.173239}, {lat: 52.864727, lng: 6.205326}]

    };

    for (i = 0; i < markerPos.coords.length; i++) {

        marker[i] = new google.maps.Marker({
            position: markerPos.coords[i],
            map: map,
            title: 'Hello World!'
        });

        marker[i].addListener('click', function () {
            issuesPopUp();
        });

    }

    let contentString = '<div class="new-issue" xmlns="http://www.w3.org/1999/html">' +
        '<div class="options">' +
        '<span>Cancel</span>' +
        '<span>Nieuw issue</span>' +
        '<span>Done</span>' +
        '</div>'+
        '<input type="text" class="input-issue" placeholder="Title naar issue"><br>'+
        '<input type="text" class="input-issue" placeholder="Eerste notities over dit issue">'
        + '</div>';

    let infoWindow = new google.maps.InfoWindow({
        content: contentString
    });


    map.controls.push(setControls(map, markers, infoWindow));

}

function getValue() {

    let getE = document.querySelectorAll('.issue');

    let i = getE.item(0);
    console.log(i);

    console.log(getE);

    let issueNote = document.getElementById('note-issue');

    let issueDiv = document.getElementById('issues');

    let issue = document.createElement('div');
    issue.className = 'issue';

    let profile = document.createElement('div');
    profile.className = 'profile';
    let pic = document.createElement('div');
    pic.className = 'pic';
    let avatar = document.createElement('img');
    avatar.src = 'images/avatar1.png';
    let title = document.createElement('div');
    title.className = 'title';
    let header = document.createElement('h2');
    header.innerHTML = "Titel van het moment";
    let span = document.createElement('span');
    span.innerHTML = "Saskia Linssen";
    let date = document.createElement('span');
    date.innerHTML = '02-03-2019';
    let text = document.createElement('p');
    text.innerHTML = issueNote.value;

    issueDiv.insertBefore(issue, i);
    issue.appendChild(profile);
    profile.appendChild(pic);
    pic.appendChild(avatar);
    profile.appendChild(title);
    title.appendChild(header);
    title.appendChild(span);
    profile.appendChild(date);
    issue.appendChild(text);

    console.log(issueNote.value);

    issueNote.value = "";

}



