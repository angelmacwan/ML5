let a;
let video;
let lb = '';
let c;

let addimg01;
let addimg02;
let addimg03;
let trainbtn;


function modelReady() {
  console.log('GOOD TO GO!!!!!!!!!');
  //a.predict(gotResults);
}

function modeelTraining(loss) {
  if (loss == null) {
    c.classify(gotResults);
  } else {
    console.log(loss);
  }
}


function videoReady() {
  console.log('VIDEO READY!!');
}

function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    console.log(result);
    lb = result;
    console.log(lb);
    //a.predict(gotResults);
    c.classify(gotResults)
  }
}

function setup() {
  createCanvas(600, 550);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  //a = ml5.imageClassifier('MobileNet', video, modelReady);
  a = ml5.featureExtractor('MobileNet', modelReady);
  c = a.classification(video, videoReady);

  addimg01 = createButton('OBJECT 1');
  addimg01.mousePressed(function() {
    c.addImage('OBJECT 1');
  })

  addimg02 = createButton('OBJECT 2');
  addimg02.mousePressed(function() {
    c.addImage('OBJECT 2');
  })

  addimg03 = createButton('OBJECT 3');
  addimg03.mousePressed(function() {
    c.addImage('OBJECT 3');
  })


  trainbtn = createButton('TRAIN');
  trainbtn.mousePressed(function() {
    c.train(modeelTraining);
  })

}

function draw() {
  background(0);
  image(video, 0, 0);
  fill(255);
  textSize(32);
  text(lb, 10, height - 20);
}