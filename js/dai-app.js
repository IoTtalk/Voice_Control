$(function () {
    //init UI
    $("#not_support").hide();
    var siriwave = new SiriWave({
        style: 'ios9',
        speed: 0.08,
        amplitude: 0.3,
        autostart: true,
    });
    
    function Result (data) {
    }

    function iot_app () {

        if (!('webkitSpeechRecognition' in window)) {
            $("#not_support").show();
            console.log( "not support!" );
        } 
        else {
            var recognition = new webkitSpeechRecognition();
            recognition.continuous = true;
            recognition.interimResults = false;
            recognition.lang="cmn-Hant-TW";
            recognition.onstart=function(){
                console.log("on start");
            };
            recognition.onend=function(){
                console.log("on end");
                recognition.start();
            };
            recognition.onresult=function(event){
                if(event != undefined){
                    console.log(event.result[event.resultIndex][0].transcript);
                    dan.push("Result", [event.result[event.resultIndex][0].transcript]);
                }
            };
            recognition.start();
        }
    }

    var profile = {
        'dm_name': 'Voice_Control',
        'df_list': [Result],
    }

    var ida = {
        'iot_app': iot_app,
    };

    dai(profile, ida);
});
