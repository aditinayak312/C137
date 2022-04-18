video="";
stat="";
objects=[];

function preload(){
    video=createVideo("cricket.mp4");
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video.hide();
}

function draw(){
    image(video,0,0,480,380);
    if(stat !=""){
        objectDetect.detect(video,gotResults);
        for(i=0 ; i <objects.length ; i++ ){

         document.getElementById("NoOfObjects").innerHTML= "NO. OF OBJECTS : " + objects.length;
         document.getElementById("status").innerHTML= "STATUS : Object Detected ";

         fill("black");
         percent=floor(objects[i].confidence*100);
         text(objects[i].label + " " + percent + "%" , objects[i].x+15  , objects[i].y+15);
         noFill();
         stroke("black");
         rect(objects[i].x , objects[i].y , objects[i].width , objects[i].width);

        }
    }
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
}

function start(){
    objectDetect=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML= "STATUS : OBJECT DETECTING";
}
function modelLoaded(){
    console.log("modelLoaded");
    stat=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
