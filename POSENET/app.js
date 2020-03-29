let vid;
let poseNet;
let pose;
let skeleton;

let sketPointRad = 20;
let noseRad = 30;
let eyeRad = 20;
let faceRad = 50;
let skelThick = 5;
let facerad;

function setup() {
  createCanvas(640, 480);
  background(0);

  vid = createCapture(VIDEO);

  poseNet = ml5.poseNet(vid, () => {
    console.log("ready");
    createElement("h1", "Model Ready");
  });

  poseNet.on("pose", poses => {
    // console.log(poses);
    if (poses.length > 0) {
      skeleton = poses[0].skeleton;
      pose = poses[0].pose;
    }
  });
}

function draw() {
  image(vid, 0, 0);
  noStroke();
  background(50, 50, 50, 215);

  if (pose) {
    // console.log(pose);
    // console.log(skeleton);

    //face
    fill(240, 148, 86);
    let facex = (pose.rightEar.x + pose.leftEar.x) / 2;
    let facey = (pose.rightEar.y + pose.leftEar.y) / 2;
    facerad = dist(
      pose.rightEar.x,
      pose.rightEar.y,
      pose.leftEar.x,
      pose.leftEar.y
    );
    ellipse(facex, facey, facerad, facerad / 0.85);
    sketPointRad = facerad / 6;
    for (let i = 0; i < pose.keypoints.length; i++) {
      fill(37, 194, 102);
      ellipse(
        pose.keypoints[i].position.x,
        pose.keypoints[i].position.y,
        sketPointRad
      );
    }

    for (let i = 0; i < skeleton.length; i++) {
      let x = skeleton[i][0];
      let y = skeleton[i][1];
      fill(255);
      strokeWeight(2);
      stroke(255);
      line(x.position.x, x.position.y, y.position.x, y.position.y);
      noStroke();
    }

    //eyes
    eyeRad = facerad / 6;
    fill(255);
    ellipse(pose.rightEye.x, pose.rightEye.y, eyeRad, eyeRad / 2);
    ellipse(pose.leftEye.x, pose.leftEye.y, eyeRad, eyeRad / 2);

    //nose
    noseRad = facerad / 4;
    fill(200, 50, 10);
    ellipse(pose.nose.x, pose.nose.y, noseRad);

    beginShape();
    vertex(pose.leftShoulder.x, pose.leftShoulder.y);
    vertex(pose.rightShoulder.x, pose.rightShoulder.y);
    vertex(pose.rightHip.x, pose.rightHip.y);
    vertex(pose.leftHip.x, pose.leftHip.y);
    endShape(CLOSE);

    // noLoop();
  }
}
