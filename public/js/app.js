/*jshint esversion: 6 */
const mainDiv = document.getElementsByClassName('mainDiv');
const body = document.getElementsByTagName('body');

let req = makeXHRReq('GET', getStories, 'https://www.reddit.com/r/TheWayWeWere.json');

function makeXHRReq( method, listenerFunction, url ) {
  let req = new XMLHttpRequest();
  req.addEventListener("load", listenerFunction);
  req.open(method, url);
  req.send();
  return req;
}

function clearStories(){
  let theDiv = mainDiv[0];
  while (theDiv.hasChildNodes()) {
    theDiv.removeChild(theDiv.lastChild);
  }
}

function randomPage(e) {
  clearStories();
  let bway = makeXHRReq('GET', getStories, 'https://www.reddit.com/r/Broadway.json');
}

function myBoards(e) {
  clearStories();
  let yorkies = makeXHRReq('GET', getStories, 'https://www.reddit.com/r/Yorkies.json');
}

function getApp(e) {
  clearStories();
  let chess = makeXHRReq('GET', getStories, 'https://www.reddit.com/r/chess.json');
}

function getStories() {
  obj = JSON.parse(this.response);
  let myStories = obj.data.children;
  console.log(myStories);
  for (var i = 0; i < 4; i++) {

    let subDiv = document.createElement('div');
    subDiv.setAttribute('class', 'story' + i);
    subDiv.setAttribute('src', myStories[i].data.url);

    let imgDiv = document.createElement('div');
    imgDiv.setAttribute('class', 'image');

    let image = document.createElement('img');
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

    let caption = document.createElement('div');
    caption.setAttribute('class', 'caption');
    caption.innerHTML = myStories[i].data.title;

    let subhead = document.createElement('div');
    subhead.setAttribute('class', 'subhead');

    let date = new Date(Date(Number(myStories[i].data.created)));
    let newDate = formattedDate(date);
    let timeString = moment(newDate, "YYYYMMDD").fromNow();

    let ups = myStories[i].data.ups;
    subhead.innerHTML = 'by ' + myStories[i].data.author + ' &bull; ' + timeString + ' &bull; Ups: ' +  ups;

    let descr = document.createElement('div');
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
