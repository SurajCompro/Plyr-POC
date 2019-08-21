


// import Plyr from 'plyr';

const controls = `
<div class="plyr__controls">
    <button type="button" class="plyr__control" data-plyr="restart" style="Position: absolute; top: 100px; left: 300px;">


        <i class="glyphicon glyphicon-euro"></i>




        <span class="plyr__tooltip" role="tooltip">Restart</span>
    </button>
    <button type="button" class="plyr__control" data-plyr="rewind">


        <i class="glyphicon glyphicon-pencil" style="color:red;"></i>


        <span class="plyr__tooltip" role="tooltip">Rewind {seektime} secs</span>
    </button>
    <button type="button" class="plyr__control" aria-label="Play, {title}" data-plyr="play">


        <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
        <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>

        
        <span class="label--pressed plyr__tooltip" role="tooltip">Pause</span>
        <span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span>
    </button>
    <button type="button" class="plyr__control" data-plyr="fast-forward">

        <i class="glyphicon glyphicon-star"></i>

        <span class="plyr__tooltip" role="tooltip">Forward {seektime} secs</span>
    </button>
    <button type="button" class="plyr__control" data-plyr="captions">
    <svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-captions-on"></use></svg>
    <svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-captions-off"></use></svg>
    <span class="label--pressed plyr__tooltip" role="tooltip">Disable captions</span>
    <span class="label--not-pressed plyr__tooltip" role="tooltip">Enable captions</span>
</button>
</div>
`;



const player = new Plyr('#myPlayer', {
    controls: ["play"],
    i18n: {play: "Get it going"},
    controls,
    loop : [] 
});
player.on('play', event => {
    player.controls = ['play-large', 'play', 'volume', 'fullscreen', 'progress'];
});

//player.fullscreen.enter()


// const player = new Plyr('#myPlayer');



// player.toggleControls(false);

// player.setup({
//     controls: ["play", "volume"],
//     i18n: {play: "Get it going", volume: "Let's get loud"}
//   })

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


var ctrls = document.querySelector(".controls");



var btnfastfwd = document.getElementById('btnfastfwd');





function togglePlayPause() {

    if(player.playing) {
        player.pause();
        play_pause_glyph.classList.remove('glyphicon-pause');
        play_pause_glyph.classList.add('glyphicon-play');
    }

    else {
        player.play();
        play_pause_glyph.classList.add('glyphicon-pause');
        play_pause_glyph.classList.remove('glyphicon-play');
    }


    // else if (player.paused){
    //     player.play();
    //     play_pause_glyph.classList.add('glyphicon-play');
    //     play_pause_glyph.classList.remove('glyphicon-pause');
    // }

    // else {
    //     play_pause_glyph.classList.remove('glyphicon-play');
    //     play_pause_glyph.classList.remove('glyphicon-pause');
    //     play_pause_glyph.classList.add('glyphicon-repeat');
    //     // player.restart();
    // }
}

play_pause.addEventListener("click", mySecondFunction);

function mySecondFunction() {
    togglePlayPause();
}

console.log('abc', player);

player.on("timeupdate", event => {

    currTime.innerHTML = player.currentTime+'/'+player.duration;
    //console.log(player.currentTime);
    var pos = player.currentTime / player.duration;
    progress.style.width = pos*100 + '%';

    slider.value = pos*100;

    slider.style.background = 'linear-gradient(to right, #82CFD0 0%, #82CFD0 '+slider.value +'%, #fff ' + slider.value + '%, white 100%)';


    console.log(slider.value, pos);
    //console.log(pos);
});

btn_back.addEventListener("click", function() {
    player.rewind(5);
});

btn_fwd.addEventListener("click", function() {
    player.forward(5);
});

slidecontainer.addEventListener('mousemove', function() {

    console.log( 'mousemove' );
    
    console.log( event.pageX - slidecontainer.offsetLeft - video_container.offsetLeft);

});

slider.oninput = function() {
    this.style.background = 'linear-gradient(to right, #82CFD0 0%, #82CFD0 '+this.value +'%, #fff ' + this.value + '%, white 100%)';
    player.currentTime = player.duration * slider.value / 100;
    console.log(slider.value);
  }



progress_bar.addEventListener("click", function() {

    console.log("click");

});



btn_loop_specific.addEventListener("click", function() {

    startTime = 120;
    endTime = 125;

    if(player.loop){

        player.on('timeupdate', event => {
            if((player.currentTime === endTime) && player.loop) {
                player.currentTime = startTime;
                player.play();
            }

            if((player.currentTime > endTime) && player.loop) {
                player.currentTime = startTime;
                player.play();
            }

            if((player.currentTime < startTime) && player.loop) {
                player.currentTime = startTime;
                player.play();
            }

        });

    }

});



btn_loop.addEventListener( 'click', function() {

    player.loop = !player.loop;
    console.log(player.loop);

});


btnfastfwd.addEventListener( 'click' , function() {

    player.toggleCaptions();
    console.log(player.captions);
    console.log(player.currentTrack);

});

btnstepfwd.addEventListener( 'click' , function() {

    console.log('click');
    player.currentTime = 16.767;
    player.pause();

});