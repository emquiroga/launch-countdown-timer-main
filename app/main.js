//Setting today as default starting date:
let todayDate = new Date();
//Setting date
let dd  = String(todayDate.getDate()).padStart(2, '0');
let mm  = String(todayDate.getMonth() + 1).padStart(2, '0');
let yyyy = todayDate.getFullYear();
todayDate = yyyy + '-' + mm + '-' + dd;
//Getting data from submit form
let countdownDate = document.getElementById("dateId");
let countdownTime = document.getElementById("timeId");
countdownDate.min = todayDate;
countdownDate.value = todayDate;
//Buttons
let countdownBtn = document.getElementById("submit-button");
let resetBtn = document.getElementById("reset-button");
//Sections & display
let formSection = document.getElementById("form-section");
let countdownSection = document.getElementById("countdown-section");
let mainTitle = document.getElementById("title");
//Date array
let countdownElements = ["days", "hours", "minutes", "seconds"];
//Reset
let resetDate = false;
console.log(resetDate);

//Displaying sections and starting app
countdownBtn.addEventListener('click', (e) => {
    e.preventDefault();//Prevent default reload page behavior
        if (countdownDate.value && countdownTime.value) {
            formSection.style.display = 'none';//Hides the form section until reset
            countdownSection.style.display = 'inherit';//Shows the countdown section after setting the date
            resetBtn.style.display = 'visible';
            let selectedTime = new Date(`${countdownDate.value}T${countdownTime.value}:00`).getTime();
            mainTitle.textContent = `WE'RE LAUNCHING SOON`;
            startCountdown (selectedTime);
        }
})
//Countdown function
function startCountdown (date) {
    let x = setInterval(() => {countDown(date)}, 1000);
    let w = setInterval(() => {
        expired (x)
        if (resetDate) {
            clearInterval(x);
            resetDate = false;
            console.log(resetDate);
            clearInterval(w);
        }
    }, 1000);
}
//Calc card value function
function countDown(date) {
    now = new Date().getTime();//First, we get today's date and time
    distance = date - now;//Find the distance between the selected date and now
    days = Math.floor(distance / (1000 * 60 * 60 * 24));
    hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
    time=[days,hours, minutes, seconds];
    //Calling the fillcard function
    fillCard();
    //Calling the animation function
    //animation();
    return time, distance;
};
//Filling cards
function fillCard() {
    for(let i = 0; i < countdownElements.length; i++) {
        document.getElementById (countdownElements[i]).innerHTML=time[i];
    }
    //Adding a "0" before seconds, minutes and hours if they're < 10
    for (let j = 1; j < countdownElements.length; j++) {
        if (time [j] < 10) {
            document.getElementById (countdownElements[j]).innerHTML="0"+time[j];
        };
    };
}
//Reset app
resetBtn.addEventListener('click', () => {
    resetDate = true;
    console.log(resetDate);
    formSection.style.display = 'inherit';//Show again the form section
    countdownSection.style.display = 'none';//Hide the countdown
    return resetDate;
})
//Time expired
function expired(x){
    if (distance <= 0) {
        clearInterval(x);//Finish countdown

        //Fill cards with 00s
        document.getElementById(countdownElements[0]).innerHTML = '0'; //Days
        for (let i = 1; i < countdownElements.length; i++){
            document.getElementById(countdownElements[i]).innerHTML = '00'; //Hours, minutes, seconds
        }
        //Change title content
        mainTitle.textContent = `EXPIRED`;
    }
};
