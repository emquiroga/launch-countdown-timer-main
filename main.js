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
//Sections & display
let formSection = document.getElementById("form-section");
let countdownSection = document.getElementById("countdown-section");
//Date array
let countdownElements = ["days", "hours", "minutes", "seconds"];
//Reset
let resetDate = false;
console.log(resetDate);

//Displaying sections and starting app
countdownBtn.addEventListener('click', (e) => {
    e.preventDefault();//Prevent default reload page behavior
    if (countdownDate.value && countdownTime.value) {
        let selectedTime = new Date(`${countdownDate.value}T${countdownTime.value}:00`).getTime();
        startCountdown (selectedTime);
    }
})
//Countdown function
function startCountdown (date) {
    let x = setInterval(() => {countDown(date)}, 1000);
    let w = setInterval(() => {
        //expired (x)
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
            document.getElementById (countdownElement.length[j]).innerHTML="0"+time[j];
        };
    };
}
