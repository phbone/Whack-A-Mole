 var timeCount = 60;
            var scoreCount = 0;
            var opts = {
                chars_preset: 'num',
                align: 'left',
                width: 4
            };

            function moleObj(id, cur, next, wait, stay)
            {
                this.id = id;
                this.cur = cur;
                this.next = next;
                this.wait = wait * 1000;
                this.stay = stay * 1000;
            }


            var mole1 = new moleObj(1, 1, 2, 1, 2);
            var mole2 = new moleObj(2, 2, 4, 2, 3);
            var mole3 = new moleObj(3, 9, 6, 1, 2);


            function updateTime() {
                if (timeCount > 0) {
                    timeCount = timeCount - 1;
                    $("#time").text(timeCount);
                    if (timeCount < 10) {
                        $("#time").css("width", "20px");
                    }
                }
                else {
                    endGame();
                }
            }

            function endGame() {
                $(".mole").css("z-index", "-1");
                $("#endMessage").text("You Saved " + scoreCount + " Moles");
                $("#endMessage").fadeIn();
                $("#playButton").text("Replay?");
                $("#playButton").fadeIn();

            }
            function updateScore(num) {
                return function(id) {
                    var $score = $('input#score');
                    num = num || 0;
                    scoreCount = scoreCount + num;
                    moleDown(id);
                    $score.val(scoreCount).change();
                }
            }
            function rand(min, max)
            {
                return Math.floor(Math.random() * (max - min + 1) + min);
            }
            function moleUp(id, wait) { // 3 moles, pass in id
                // shows mole, waits time then hides
                $("#m" + id).animate({bottom: "-20px"}, 100);
                $("#m" + id).delay(wait).animate({bottom: "-100px"});
            }
            function moleDown(id) { // 3 moles, pass in id
                // overrides any delay and hides mole
                $("#m" + id).stop();
                $("#m" + id).animate({bottom: "-100px"}, 100); // interrupts delay
            }

            function playMole1() {   // moves mole to next position, shows mole for delay, then hides and 
                // calculates next mole move
                var totalWait = mole1.stay + mole1.wait;
                $("#m1").appendTo("#sq" + mole1.next); // move mole into next position
                moleUp(1, mole1.stay); // show mole
                mole1.next = rand(1, 16); // random position next
                mole1.stay = rand(100, 700); // random amount of time it appears next time
                console.log(mole1.stay);
                setTimeout(playMole1, totalWait); // wait for next appearance

            }

            function playMole2() {
                var totalWait = mole2.stay + mole2.wait;
                $("#m2").appendTo("#sq" + mole2.next); // move mole into next position
                moleUp(2, mole2.stay); // show mole
                mole2.next = rand(1, 16); // random position next
                mole2.stay = rand(200, 400); // random amount of time it appears next time
                setTimeout(playMole2, totalWait); // wait for next appearance
            }

            function playMole3() {
                var totalWait = mole3.stay + mole3.wait;
                $("#m3").appendTo("#sq" + mole3.next); // move mole into next position
                moleUp(3, mole3.stay); // show mole
                mole3.next = rand(1, 16); // random position next
                mole3.stay = rand(1000, 2000); // random amount of time it appears next time
                setTimeout(playMole3, totalWait); // wait for next appearance
            }

            var score1 = updateScore(1);

            function startGame() {
                if ($("#playButton").text() == "Begin") {
                    //start clock countdown
                    $("#playButton").fadeOut();
                    window.setInterval(updateTime, 1000);
                    playMole1();
                    playMole2();
                    playMole3();
                }
                else if ($("#playButton").text() == "Replay?") {
                    location.reload();
                }
            }


            $(document).ready(function() {

                // initialize score flapper
                var $score = $('input#score');
                $score.flapper(opts).val(scoreCount).change();
                
            });