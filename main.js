song1="music.mp3";
song2="music2.mp3";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreLeftWrist=0;
songOn="";

function preload() {
    song1=loadSound("music.mp3");
    song2=loadSound("music2.mp3");
}

function setup() {
    canvas=createCanvas(600, 500);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide()

    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    songOn=song_variable.isPlaying();

    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        song2.isPlaying(false);
     }
}

function modelLoaded() {
    console.log("Posenet is initialized");
}

function gotPoses(results) {
    if (results.length>0) {
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;

        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);

        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY);
    }

    if (song1.isPlaying(false)) {
        song1.isPlaying(true);
        document.getElementById("song").innerHTML=song1;
    }
}