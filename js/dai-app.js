$(function () {
    //init UI
    $("#not_support").hide();
    var siriwave = new SiriWave({
        style: 'ios9',
        speed: 0.08,
        amplitude: 0.3,
        autostart: false,
    });
    var id = -1;
    function Response (data) {

    }
    function Script (data) {
        console.log(data);
        data = JSON.parse(data[0]);
        id = data["id"];
        var msg = new SpeechSynthesisUtterance(data["string"]);
        msg.lang = "zh-TW";
        window.speechSynthesis.speak(msg);
        msg.onend = function(){
            var recognition = new webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = true;
            recognition.lang="cmn-Hant-TW";
            recognition.onstart=function(){
                console.log("on start");
                siriwave.start();
                $("#recognizeText").text("");
            };
            recognition.onend=function(){
                console.log("on end");
            };
            recognition.onresult=function(event){
                if(event != undefined){
                    var index = event.results[event.resultIndex].length-1;
                    //console.log(event.results[event.resultIndex][index].transcript);
                    console.log(event);
                    // recognize text animation
                    $("#recognizeText").text(event.results[event.resultIndex][index].transcript);
                    $('#recognizeText').textillate();
                    if(event.results[event.resultIndex].isFinal){
                        dan.push("Response", [JSON.stringify({'id':id, 'string':event.results[event.resultIndex][index].transcript})]);
                        console.log([JSON.stringify({'id':id, 'string':event.results[event.resultIndex][index].transcript})]);
                        siriwave.stop();
                    }
                }
            };
            recognition.start();
        };
    }
    function iot_app () {
        if (!('webkitSpeechRecognition' in window) || !('speechSynthesis' in window)) {
            $("#not_support").show();
            console.log( "not support!" );
        }
    }

    var profile = {
        'dm_name': 'Voice_Control',
        'df_list': [Response,Script],
    }

    var ida = {
        'iot_app': iot_app,
    };

    dai(profile, ida);
});
