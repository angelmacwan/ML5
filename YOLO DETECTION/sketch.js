let objects = [];
let model;
let video;

let h = 700;  //width
let y = 500;  //height

function setup() {
  createCanvas(h , y);
  video = createCapture(VIDEO);
  video.size(h , y);
  video.hide();
  model = ml5.YOLO(video , modelReady);
}

function modelReady() {
  console.log('MODEL READY!');
  detect();
}

function detect() {
  model.detect(function (err , result){
    //console.log(result)
    objects = result;
    detect();
  })
}

function draw() {
  image(video , 0 , 0 , h , y);

  for (let i = 0; i < objects.length; i++) {
    console.log(objects[i].className);
    noStroke();
    fill(0, 255, 0);
    text(objects[i].className, objects[i].x * width, objects[i].y * height - 5);
    noFill();
    strokeWeight(2);
    stroke(0, 255, 0);
    rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
  }

}
