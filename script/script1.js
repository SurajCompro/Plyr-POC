const controls = `
<button type="button" class="plyr__control" data-plyr="play" aria-label="Play">
</button>
`;

const player = new Plyr('#myPlayer', {
    controls: ["play-large"],
    controls
});
player.on('play', event => {
    player.controls = ['play-large'];
});

var progress = document.querySelector(".actual-progress");
var play_pause = document.getElementById("play_pause");
var play_pause_glyph = document.getElementById("play_pause_glyph");
var btn_fwd = document.getElementById("btnfwd");
var btn_back = document.getElementById("btnback");
var btn_loop_specific = document.getElementById("btnloopspecific");
var btn_loop = document.getElementById("btnloop");
var currTime = document.getElementById("currTime");
var btnstepfwd = document.getElementById("btnstepfwd");
var progress_bar = document.getElementById("progress_bar");
var slider = document.getElementById("myRange");
var slidecontainer = document.getElementById('slidecontainer');
var video_container = document.getElementById('video-container');
var btnfullscr = document.getElementById('btnfullscr');
var currentTimeDisplay = document.getElementById('currentTimeDisplay');
var totalTimeDisplay = document.getElementById('totalTimeDisplay');
var play_large = document.getElementById('play_large');


var ctrls = document.querySelector(".controls");
var isLoopEnabled = false;



var btnfastfwd = document.getElementById('btnfastfwd');

btn_loop.addEventListener("click", function() {
    isLoopEnabled = !isLoopEnabled;
    if(isLoopEnabled) {
        player.currentTime = 10;
    }
});

var timetomin = function (num){

    // num = num.toFixed(0)
    // min = num/60;
    // min = min.toFixed(0);
    // sec = num%60;
    // console.log(num, min, sec);

    var date = new Date(null);
    date.setSeconds(num); // specify value for SECONDS here
    var result = date.toISOString().substr(11, 8);
    result = result.substring(3,8);
    //console.log(result);
    return result;
    

}



function togglePlayPause() {

    if(player.playing) {
        player.pause();
        play_pause_glyph.classList.add('fa-play-circle');
        play_pause_glyph.classList.remove('fa-pause-circle');
        play_large.classList.add('fa-play')

    }

    else{
        player.play();
        play_pause_glyph.classList.add('fa-pause-circle');
        play_pause_glyph.classList.remove('fa-play-circle');
        play_large.classList.remove('fa-play')
    }

}

play_pause.addEventListener("click", mySecondFunction);
play_large.addEventListener("click", mySecondFunction);

function mySecondFunction() {
    togglePlayPause();
}


player.on("timeupdate", event => {

    //console.log(player.currentTime);
    var pos = player.currentTime / player.duration;

    slider.value = pos*100;

    slider.style.background = 'linear-gradient(to right, #fff 0%, #fff '+slider.value +'%, #8c8c8c ' + slider.value + '%, #8c8c8c 100%)';


    if(isLoopEnabled && player.currentTime >= 15) {
        player.currentTime = 10;
    }

    currentTimeDisplay.innerHTML = timetomin(player.currentTime);
    totalTimeDisplay.innerHTML = timetomin(player.duration);









    //console.log(timetomin(player.currentTime), player.duration);
    //console.log(slider.value, pos);
    //console.log(pos);
});

btn_back.addEventListener("click", function() {
    player.rewind(15);
});

btn_fwd.addEventListener("click", function() {
    player.forward(15);
});

// slidecontainer.addEventListener('mousemove', function() {

//     console.log( 'mousemove' );
    
//     console.log( event.pageX - slidecontainer.offsetLeft - video_container.offsetLeft);

// });

slider.oninput = function() {
    this.style.background = 'linear-gradient(to right, #fff 0%, #fff '+this.value +'%, #8c8c8c ' + this.value + '%, #8c8c8c 100%)';
    player.currentTime = player.duration * slider.value / 100;
    console.log(slider.value);
  }


btn_loop.addEventListener( 'click', function() {

    player.loop = !player.loop;
    console.log(player.loop);

});

btnfullscr.addEventListener('click' , function () {

    player.fullscreen.enter()
})

