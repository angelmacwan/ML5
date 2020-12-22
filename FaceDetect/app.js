const detectionOptions = {
  withLandmarks: false,
  withDescriptors: false
};
let faceapi;
let vid;
let data = [];
let faceDetact = false;
let faceFeatures = false;

function setup() {
  createCanvas(640, 480);
  vid = createCapture(VIDEO);
  faceapi = ml5.faceApi(detectionOptions, modelLoaded);
  vid.hide();
  frameRate(10);
}

function draw() {
  faceapi.detect(vid, (err, results) => {
    data = results;
    image(vid, 0, 0);
    if (faceDetact) findFaces();
    if (faceFeatures) findLandmarks();
  });
}

function modelLoaded() {
  console.log("Model Loaded!");
  document.querySelector("#status").innerHTML = `Status = Model Ready`;
  document.querySelector("#status").style.color = "green";
}

function findFaces() {
  console.log(data);
  document.querySelector(
    "#total"
  ).innerHTML = `Total Faces found = ${data.length}`;

  for (let i of data) {
    let x = i.detection.box.x;
    let y = i.detection.box.y;
    let h = i.detection.box.height;
    let w = i.detection.box.width;
    noFill();
    stroke(0, 255, 0);
    rect(x, y, w, h);
  }
}

function findLandmarks() {
  stroke(0, 0, 255);
  for (let i of data) {
    for (let p in i.parts) {
      beginShape();
      for (let l of i.parts[p]) {
        vertex(l.x, l.y);
      }
      endShape();
    }
  }
}

function toggel(option) {
  if (option == "face") {
    faceDetact = !faceDetact;
  } else if (option == "feature") {
    faceFeatures = !faceFeatures;
  }
}
