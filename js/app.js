const doc = document;
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
    image.setAttribute('src', myStories[i].data.url);
    console.log(image);




  }
}

