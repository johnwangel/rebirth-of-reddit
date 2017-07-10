const doc = document;
const mainDiv = doc.getElementsByClassName('mainDiv');
console.log(mainDiv);
let req = makeXHRReq('GET', getStories, 'https://www.reddit.com/r/TheWayWeWere.json');

function makeXHRReq( method, listenerFunction, url ) {
  let req = new XMLHttpRequest();
  req.addEventListener("load", listenerFunction);
  req.open(method, url);
  req.send();
  return req;
}

function getStories() {
  obj = JSON.parse(this.response);
  console.log(obj);
  let myStories = obj.data.children;
  console.log(myStories);
  for (var i = 0; i < 4; i++) {

    let subDiv = doc.createElement('div');
    subDiv.setAttribute('class', 'story' + i);

    let imgDiv = doc.createElement('div');
    imgDiv.setAttribute('class', 'image');

    let image = doc.createElement('img');
    image.setAttribute('class', 'thumbs');
    image.setAttribute('src', myStories[i].data.url);
    imgDiv.appendChild(image);

    let caption = doc.createElement('div');
    caption.setAttribute('class', 'caption');
    console.log(myStories[i].data.title);
    caption.innerHTML = myStories[i].data.title;

    let subhead = doc.createElement('div');
    subhead.setAttribute('class', 'subhead');

    let date = Date(Number(myStories[i].data.created));
    var today = new Date();

    let ups = myStories[i].data.ups;
    subhead.innerHTML = 'by ' + myStories[i].data.author + ' &bull; ' + date + ' &bull; Ups: ' +  ups;

    subDiv.appendChild(imgDiv);
    subDiv.appendChild(caption);
    subDiv.appendChild(subhead);
    mainDiv[0].appendChild(subDiv);
  }
}

