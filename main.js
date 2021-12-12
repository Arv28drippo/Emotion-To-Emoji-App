Prediction_1 = "";
Prediction_2 = "";

Webcam.set({
width: 350,
height: 300,
image_format: 'png',
png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function Snapshot()
{
    Webcam.snap(function(data_uri){
    document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>';
    });
}

console.log("ml5 version", ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/i2Ze3e2KS/model.json', modelLoaded);

function modelLoaded()
{
    console.log("Model Loaded");
}

function Speak()
{
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + Prediction_1;
    speak_data_2 = "And the second prediction is " + Prediction_2;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}

function Check()
{
   img = document.getElementById("capture_image");
   classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
   if (error) {
       console.error(error);
   }
   else  {
       console.log(results);
       document.getElementById("result_emotion_name").innerHTML = results[0].label;
       document.getElementById("result_emotion_name_2").innerHTML = results[1].label;
       Prediction_1 = results[0].label;
       Prediction_2 = results[1].label;
       Speak();

       if (results[0].label == "Happy") {
         document.getElementById("update_emoji").innerHTML = "&#128512;";
       }
       if (results[0].label == "Sad") {
        document.getElementById("update_emoji").innerHTML = "&#128546;";
      }
       if (results[0].label == "Angry") {
        document.getElementById("update_emoji").innerHTML = "&#128548;";
      }
      if (results[1].label == "Happy") {
        document.getElementById("update_emoji_2").innerHTML = "&#128512;";
      }
      if (results[1].label == "Sad") {
       document.getElementById("update_emoji_2").innerHTML = "&#128546;";
     }
     if (results[1].label == "Angry") {
       document.getElementById("update_emoji_2").innerHTML = "&#128548;";
     }
   }
}