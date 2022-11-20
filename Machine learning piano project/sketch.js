let video;
let handpose;
let predictions = [];
let thumb;
let key1;
let key2, key3, key4, key5;
let handclap;
let backgroundmusic;
let backgroundImage;
let particles = [];
let scale, theme, themeWidth;
let i = 0;
let gold = false;
let handInDo=false;
let handInRe = false;
let handInMi = false;
let handInFa = false;
let handInSol = false;
let handInStop = false;
let noseX=0;
let noseY=0;
let poseNet;

let slider;


function preload() {
  //计划：five fingers play different musical instruments 或引导用户点击不同的键盘创建不同的音色
//   key1 = loadSound("key01.mp3");
//   key2 = loadSound("key02.mp3");
//   key3 = loadSound("key03.mp3");
//   key4 = loadSound("key06.mp3");
//   key5 = loadSound("key08.mp3");
  // key6=loadSound("key09.mp3");
  // key7=loadSound("key10.mp3");
    key1 = loadSound("music1.mp3");
  key2 = loadSound("music2.mp3");
  key3 = loadSound("music3.mp3");
  key4 = loadSound("music4.wav");
  key5 = loadSound("music5.wav");
  
  backgroundmusic = loadSound("pianobackgroundmusic1.mp3");

  handclap = loadSound("handclap.wav");
//   backgroundmusic.volume(0.1);
}

function setup() {
  backgroundImage = createCanvas(1100, 800);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  handpose = ml5.handpose(video, modelReady);
  poseNet=ml5.poseNet(video, modelReady);

  handpose.on("hand", gotResults);
    poseNet.on("pose", gotPoses);
    // slider = createSlider(0, 255, 100);
    // slider.position(40, 100);
    // slider.style('width', '80px');
    
    backgroundmusic.play();
    //  backgroundmusic.volume(0.2);
      backgroundmusic.loop();

     

    //   backgroundmusic.setVolume(0.2);
    //   backgroundmusic.volume(slider.value());
   
   

}

function draw() {

  background(0);
  //  translate(video.width, 0);
  //then scale it by -1 in the x-axis
  //to flip the image
  //  scale(-1, 1);
  //draw video c
  // push();
  // translate(width,0);
  // scale(-1, 1);
  image(backgroundImage, 0, 0, width, height);
  //  pop();
  // image(backgroundImage, 0, 0);
  // image(video, 0, 0,width,height);

  keys();
  nosekeypoint();
}


function modelReady() {
  console.log("Model is ready");
  createParticles();
  startcolor();
  //if nose position is less than width/2, make volume to 0.2
    //if nose position is greater than width/2, make volume to 0.8
   
 
}





// background color fill with black before start in playing sound( 没成功)
function startcolor() {
  handclap.play();
    // handclap.volume(0.1);


}

function gotResults(results) {
   
  predictions = results;
  if (results.length > 0) {
    console.log(results[0]);
 
    //  drawKeypoints();
    //      index = results[0].annotations.indexFinger[0];
    // thumb = results[0].annotations.thumb[0];
    drawKeypoints();
    i++;
    i = i % 50;
    for (const p of particles) p.update();
    for (const p of particles) p.draw();
  }


}


function gotPoses(poses){
    if(poses.length>0){
        let pose=poses[0].pose;
        noseX=pose.nose.x;
        noseY=pose.nose.y;
        

        //set volume of background music if nose position is less than width/2, make volume to 0.2
        //if nose position is greater than width/2, make volume to 0.8
      
       
    }
    const newnose = poses[0].pose.nose;
    if(newnose<width/2){
        console.log("volume")
        backgroundmusic.setVolume(0.2);
        }
        else{ backgroundmusic.setVolume(1);}
    }


    

function nosekeypoint(){
    fill(255,0,0);
    ellipse(1100-noseX,noseY,30);
}
class Particle {
  constructor(x, y) {
    this.pos = new p5.Vector(
      x || random(-50, width + 50),
      y || random(-50, height + 50)
    );
    this.color = random(theme.colors);
    this.r = random(0.5, 1.9);
  }

  update() {
    const dir = noise(this.pos.x / scale, this.pos.y / scale) * TAU * scale;
    this.pos.add(Math.cos(dir) / 2, Math.sin(dir) / 2);

    if (
      this.pos.x < -50 ||
      this.pos.x > width + 50 ||
      this.pos.y < -50 ||
      this.pos.y > height + 50
    )
      this.pos.set(random(-50, width + 50), random(-50, height + 50));
  }

  draw() {
    backgroundImage.fill(this.color);
    backgroundImage.circle(this.pos.x, this.pos.y, this.r);
  }
}

function mouseClicked() {
  createParticles();
  backgroundmusic.stop();
}

function createParticles() {
  console.log("createParticles");

  scale = random(8e2, 2e3);

  theme = random([
    {
      //主色调（黑金+克莱因蓝+中国传统色调）
      colors: [
        "#eacc22",
        //   "#FFFFFF",
        "#d4af37",
        //麒麟色
        "#12264f",
        "#334F5B",
        //玄色
        "#8f6c64",
        "#002199",
      ],
      //獭见色
      background: "#161c28",
    },
  ]);
  for (let i = 0; i < 150; i++) particles.push(new Particle());

  backgroundImage = createGraphics(1100, 800);
  backgroundImage.background(theme.background);
  backgroundImage.noStroke();
}

function keys() {

  //ellipse1
  // fill(255);
  // noFill();
  // noFill();
  // fill(255,255,255,70);
  fill(234, 204, 34, 70);
  stroke(255);
  ellipse(90, 650, 100, 100);

  //ellipse2
  // fill(255);
  // noFill();
  fill(234, 204, 34, 70);
  stroke(255);
  ellipse(300, 650, 100, 100);

  //ellipse3
  fill(234, 204, 34, 70);

  stroke(255);
  ellipse(500, 650, 100, 100);

  //ellipse4
  fill(234, 204, 34, 70);
  stroke(255);
  ellipse(700, 650, 100, 100);

  //ellipse5
  fill(234, 204, 34, 70);
  stroke(255);
  ellipse(900, 650, 100, 100);

  //first row(8-6)
  //ellipse6
  // fill(255);
  // stroke(255);
  // ellipse(990, 500, 100, 100);

  // //ellipse7
  // fill(255);
  // stroke(255);
  // ellipse(600, 500, 100, 100);

  // //ellipse8
  // fill(255);
  // stroke(255);
  // ellipse(190, 500, 100, 100);

  //stop ellipse
  fill(234, 204, 34, 80);
  // stroke(234, 204, 34);
  ellipse(50, 60, 50, 50);
  stroke(0);
  fill(0);
  text("stop", 35, 60);
}

function drawKeypoints() {
  // for (let i = 0; i < predictions.length; i += 1) {

  let prediction = predictions[0];
  for (let j = 0; j < prediction.landmarks.length; j++) {
    // const keypoint = prediction.landmarks[j];
    //   fill(0, 255, 0);
    //   noStroke();
    //   ellipse(keypoint[0], keypoint[1], 10, 10);
    let keypoint1 = prediction.landmarks[4];
    let keypoint2 = prediction.landmarks[8];
    let keypoint3 = prediction.landmarks[12];
    let keypoint4 = prediction.landmarks[16];
    let keypoint5 = prediction.landmarks[20];

    fill(255, 255, 255, 70);
    noStroke(0);
    ellipse(1100 - (keypoint1[0] / 640) * 1100, (keypoint1[1] / 480) * 800, 20, 20);
    ellipse(1100 - (keypoint2[0] / 640) * 1100, (keypoint2[1] / 480) * 800, 20, 20);
    ellipse(1100 - (keypoint3[0] / 640) * 1100, (keypoint3[1] / 480) * 800, 20, 20);
    ellipse(1100 - (keypoint4[0] / 640) * 1100, (keypoint4[1] / 480) * 800, 20, 20);
    ellipse(1100 - (keypoint5[0] / 640) * 1100, (keypoint5[1] / 480) * 800, 20, 20);

    //     w=dist(keypoint1[0], keypoint1[1],keypoint2[0], keypoint2[1]);

    //   h=dist(keypoint2[0], keypoint2[1],keypoint3[0], keypoint3[1]);

    w = dist(
      (keypoint1[0] / 640) * 1100,
      (keypoint1[1] / 480) * 800,
      (keypoint2[0] / 640) * 1100,
      (keypoint2[1] / 480) * 800
    );

    h = dist(
      (keypoint2[0] / 640) * 1100,
      (keypoint2[1] / 480) * 800,
      (keypoint3[0] / 640) * 1100,
      (keypoint3[1] / 480) * 800
    );

    //Do note
    const tokey1 = dist(
     1100- (keypoint1[0] / 640) * 1100,
      (keypoint1[1] / 480) * 800,
      90,
      650
    );
    const tokey2 = dist(
     1100- (keypoint2[0] / 640) * 1100,
      (keypoint2[1] / 480) * 800,
      90,
      650
    );
    const tokey3 = dist(
     1100- (keypoint3[0] / 640) * 1100,
      (keypoint3[1] / 480) * 800,
      90,
      650
    );

    // if (tokey1 && tokey2 < 100 && tokey3 < 100 && !key1.isPlaying()) {
    
      // fill(30,60,80);
      // ellipse(90, 650, 100, 100);
     


    if (tokey1 < 100 || tokey2 < 100 || tokey3 < 100) {
       
        if (handInDo == false) {
           
          key1.stop();
          key1.play();
        //   key1.volume(0.5);
        }
  
        handInDo = true;

        push();
        fill(0);
        stroke(255);
        ellipse(90, 650, 100, 100);
        pop();
        //1. set variable(false) 2. set timeout and variable(true) 3. variable(false)
      } else {
        handInDo = false;
      }



    //re note

    const re = dist(
        1100 - (keypoint2[0] / 640) * 1100,
      (keypoint2[1] / 480) * 800,
      300,
      650
    );
    const re2 = dist(
        1100 - (keypoint2[0] / 640) * 1100,
      (keypoint2[1] / 480) * 800,
      300,
      650
    );
    const re3 = dist(
        1100 - (keypoint3[0] / 640) * 1100,
      (keypoint3[1] / 480) * 800,
      300,
      650
    );
    if (re < 100 || re2 < 100 || re3 < 100) {
      if (handInRe == false) {
        key2.stop();
        key2.play();
        // key2.volume(0.5);
      }

      handInRe = true;
      push();
      fill(0);
      stroke(255);
      ellipse(300, 650, 100, 100);
        pop();
      //1. set variable(false) 2. set timeout and variable(true) 3. variable(false)
    } else {
      handInRe = false;
    }

    //mi note
    const mi = dist(
     1100- (keypoint3[0] / 640) * 1100,
      (keypoint3[1] / 480) * 800,
      500,
      650
    );
    const mi2 = dist(
     1100- (keypoint2[0] / 640) * 1100,
      (keypoint2[1] / 480) * 800,
      500,
      650
    );
    const mi3 = dist(
     1100- (keypoint3[0] / 640) * 1100,
      (keypoint3[1] / 480) * 800,
      500,
      650
    );
    if (mi < 100 || mi2 < 100 || mi3 < 100) {
        if (handInMi == false) {
          key3.stop();
          key3.play();
        //   key3.volume(0.5);
        }
  
        handInMi = true;
        push();
        fill(0);
        stroke(255);
        ellipse(500, 650, 100, 100);
          pop();
        //1. set variable(false) 2. set timeout and variable(true) 3. variable(false)
      } else {
        handInMi = false;
      }
  
    // fa note
    const fa = dist(
     1100- (keypoint4[0] / 640) * 1100,
      (keypoint4[1] / 480) * 800,
      700,
      650
    );
    const fa2 = dist(
     1100- (keypoint2[0] / 640) * 1100,
      (keypoint2[1] / 480) * 800,
      700,
      650
    );
    const fa3 = dist(
     1100- (keypoint3[0] / 640) * 1100,
      (keypoint3[1] / 480) * 800,
      700,
      650
    );
    if (fa < 100 || fa2 < 100 || fa3 < 100) {
        if (handInFa == false) {
          key3.stop();
          key3.play();
        //   key3.volume(0.5);
        }
  
        handInFa = true;
        push();
        fill(0);
        stroke(255);
        ellipse(700, 650, 100, 100);
          pop();
        //1. set variable(false) 2. set timeout and variable(true) 3. variable(false)
      } else {
        handInFa = false;
      }

    //sol note
    const sol = dist(
     1100- (keypoint5[0] / 640) * 1100,
      (keypoint5[1] / 480) * 800,
      900,
      650
    );
    const sol2 = dist(
     1100- (keypoint2[0] / 640) * 1100,
      (keypoint2[1] / 480) * 800,
      900,
      650
    );
    const sol3 = dist(
     1100- (keypoint3[0] / 640) * 1100,
      (keypoint3[1] / 480) * 800,
      900,
      650
    );
    if (sol < 100 || sol2 < 100 || sol3 < 100) {
        if (handInSol == false) {
          key4.stop();
          key4.play();
        //   key4.volume(0.5);
        }
  
        handInSol = true;
        push();
        fill(0);
        stroke(255);
        ellipse(900, 650, 100, 100);
          pop();
        //1. set variable(false) 2. set timeout and variable(true) 3. variable(false)
      } else {
        handInSol = false;
      }

    //stop ellipse
    const stop = dist(
     1100- (keypoint5[0] / 640) * 1100,
      (keypoint5[1] / 480) * 800,
      50,
      60
    );
    const stop2 = dist(
    1100-  (keypoint2[0] / 640) * 1100,
      (keypoint2[1] / 480) * 800,
      50,
      60
    );
    const stop3 = dist(
    1100-  (keypoint3[0] / 640) * 1100,
      (keypoint3[1] / 480) * 800,
      50,
      60
    );
    const stop4 = dist(
     1100- (keypoint4[0] / 640) * 1100,
      (keypoint4[1] / 480) * 800,
      50,
      60
    );

    if (stop < 100 || stop2 < 100 || stop3 < 100 || stop4 < 100) {
        if (handInStop == false) {
          backgroundmusic.play();
            backgroundmusic.stop();

        
        }
  
        handInStop = true;
        push();
        fill(0);
        stroke(255);
        ellipse(50, 60, 50, 50);
        stroke(255);
          pop();
        //1. set variable(false) 2. set timeout and variable(true) 3. variable(false)
      } else {
        handInStop = false;
      }

    }}
    

