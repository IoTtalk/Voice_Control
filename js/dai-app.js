$(function () {

    function Result (data) {
    }

    function iot_app () {
        if (!('webkitSpeechRecognition' in window)) {
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
