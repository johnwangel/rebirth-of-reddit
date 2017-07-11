/*jshint esversion: 6 */

const doc = document;
const mainDiv = doc.getElementsByClassName('mainDiv');
const body = doc.getElementsByTagName('body');

console.log(body);
let req = makeXHRReq('GET', getStories, 'https://www.reddit.com/r/TheWayWeWere.json');

let header = doc.createElement('div');
header.setAttribute('class', 'header');
let headImg = doc.createElement('img');
headImg.setAttribute('src', '../assets/header_bg.svg');
headImg.setAttribute('class', 'header_bg');
let headImg2 = doc.createElement('img');
headImg2.setAttribute('src', '../assets/logo.svg');
headImg2.setAttribute('class', 'logo');

header.appendChild(headImg);
header.appendChild(headImg2);
body[0].appendChild(header);

let menuBar = doc.createElement("div");
menuBar.setAttribute('class', 'menuBar');

let unorderedList = doc.createElement('ul');

let li1 = doc.createElement('li');
li1.setAttribute('class', 'menuItem');
li1.addEventListener('click', randomPage);
li1.innerHTML = 'RANDOM';
unorderedList.appendChild(li1);

let li2 = doc.createElement('li');
li2.innerHTML = 'MY BOARDS';
li2.addEventListener('click', myBoards);
li2.setAttribute('class', 'menuItem');
unorderedList.appendChild(li2);

let li3 = doc.createElement('li');
li3.setAttribute('class', 'menuItem');
li3.addEventListener('click', getApp);
li3.innerHTML = 'GET THE APP';
unorderedList.appendChild(li3);

menuBar.appendChild(unorderedList);

body[0].appendChild(menuBar);

function makeXHRReq( method, listenerFunction, url ) {
  let req = new XMLHttpRequest();
  req.addEventListener("load", listenerFunction);
  req.open(method, url);
  req.send();
  return req;
}

function randomPage(e) {
  mainDiv.innerHtML = '';
  let bway = makeXHRReq('GET', getStories, 'https://www.reddit.com/r/Broadway.json');
}

function myBoards(e) {
  mainDiv.innerHtML = '';
  let yorkies = makeXHRReq('GET', getStories, 'https://www.reddit.com/r/Yorkies.json');
}

function getApp(e) {
  mainDiv.innerHtML = '';
  let chess = makeXHRReq('GET', getStories, 'https://www.reddit.com/r/chess.json');
}

li1.addEventListener('click', randomPage);

function getStories() {
  obj = JSON.parse(this.response);
  console.log(obj);
  let myStories = obj.data.children;
  console.log(myStories);
  for (var i = 0; i < 4; i++) {

    let subDiv = doc.createElement('div');
    subDiv.setAttribute('class', 'story' + i);
    subDiv.setAttribute('src', myStories[i].data.url);
    subDiv.addEventListener('click', loadPage);

    let imgDiv = doc.createElement('div');
    imgDiv.setAttribute('class', 'image');

    let image = doc.createElement('img');
    image.setAttribute('class', 'thumbs');

    let myImg;
    if (myStories[i].data.preview){
      myImg = myStories[i].data.preview.images[0].source.url;
    } else if (myStories[i].data.url.includes('jpg')) {
      myImg = myStories[i].data.url;
    } else {
      myImg = '../assets/nophoto.jpg';
    }

    image.setAttribute('src', myImg);
    imgDiv.appendChild(image);

    let caption = doc.createElement('div');
    caption.setAttribute('class', 'caption');
    caption.innerHTML = myStories[i].data.title;

    let subhead = doc.createElement('div');
    subhead.setAttribute('class', 'subhead');

    let date = new Date(Date(Number(myStories[i].data.created)));
    let newDate = formattedDate(date);
    let timeString = moment(newDate, "YYYYMMDD").fromNow();

    let ups = myStories[i].data.ups;
    subhead.innerHTML = 'by ' + myStories[i].data.author + ' &bull; ' + timeString + ' &bull; Ups: ' +  ups;

    let descr = doc.createElement('div');
    descr.setAttribute('class', 'description');

    let descStr = myStories[i].data.selftext.substring(0, 125);

    descr.innerHTML = descStr;

    subDiv.appendChild(imgDiv);
    subDiv.appendChild(caption);
    subDiv.appendChild(subhead);
    subDiv.appendChild(descr);
    mainDiv[0].appendChild(subDiv);
  }
}

function formattedDate(d) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

 if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

 return `${year}${month}${day}`;
}


function loadPage(e) {
  let mySource = e.srcElement.currentSrc;
  console.log(e);
  console.log('source ', mySource);
  window.open(mySource);
}
