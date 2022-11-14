var song="";
var rightWristX=0;
var leftWristX=0;
var rightWristY=0;
var leftWristY=0;
var scoreleftWrist=0;
var scorerightWrist=0;

function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded(){
    console.log("posenet is initialized");
}
function gotPoses(results){
if(results.length>0){
    console.log(results);
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX= "+leftWristX+" & leftWristY= "+leftWristY);
    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWristX= "+rightWristX+" & rightWristY= "+rightWristY);
    scoreleftWrist=results[0].pose.keypoints[9].score;
    scorerightWrist=results[0].pose.keypoints[10].score;
    console.log("scoreleftWrist= "+scoreleftWrist);
    console.log("scorerightWrist= "+scorerightWrist);
}

}
function draw(){
    image(video,0,0,600,500);
    fill("#eb1a1a");
    stroke("#eb1a1a");
    if(scoreleftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        innumberleftWristY=Number(leftWristY);
        remove_decimal=floor(innumberleftWristY);
        volume=remove_decimal/500;
        document.getElementById("volume").innerHTML="volume: "+volume;
        console.log("volume:"+volume);
        song.setVolume(volume);
    }
    if(scorerightWrist> 0.2){
        circle(rightWristX,rightWristY,20);
        if(rightWristY > 0 && rightWristY<=100){
            document.getElementById("speed").innerHTML="speed: 0.5x";
            song.rate(0.5);
        }
       else if(rightWristY > 100 && rightWristY<=200){
            document.getElementById("speed").innerHTML="speed: 1.0x";
            song.rate(1);
        }
       else if(rightWristY > 200 && rightWristY<=300){
            document.getElementById("speed").innerHTML="speed: 1.5x";
            song.rate(1.5);
        }
        else if(rightWristY > 300 && rightWristY<=400){
            document.getElementById("speed").innerHTML="speed: 2.0x";
            song.rate(2);
        }
        else if(rightWristY > 400 && rightWristY<=500){
            document.getElementById("speed").innerHTML="speed: 2.5x";
            song.rate(2.5);
        }
        
    }
}
function play(){
song.play();
song.setVolume(1);
song.rate(1);
}
