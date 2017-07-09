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
  let myStories = obj.data.children;
  console.log(myStories);
  for (var i = 0; i < myStories.length; i++) {

    let subDiv = doc.createElement('div');
    subDiv.setAttribute('class', 'story');

    let image = doc.createElement('img');
    image.setAttribute('class', 'thumbs')
    image.setAttribute('src', myStories[i].data.url);

    let caption = doc.createElement('div');
    caption.setAttribute('class', 'caption');
    console.log(myStories[i].data.title);
    caption.innerHTML = myStories[i].data.title;

    let subhead = doc.createElement('div');
    subhead.setAttribute('class', 'subhead');

    let date = Number(myStories[i].data.created);
    console.log(date);
    subhead.innerHTML = 'by ' + myStories[i].data.author + ' &bull; ' + Date(date) + ' &bull; ' +  myStories[i].data.view_count + ' views';

    subDiv.appendChild(image);
    subDiv.appendChild(caption);
    subDiv.appendChild(subhead);
    mainDiv[0].appendChild(subDiv);



  }
}

