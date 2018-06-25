let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds){
	// sometimes interval doesn't work, in iOS when scroll page will pause the interval
	// setInterval(function(){
	// 	seconds--;
	// }, 1000);
	clearInterval(countdown);

	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);

	countdown = setInterval(()=>{
		const secondsLeft = Math.round((then - Date.now()) / 1000);

		//check if we should stop it
		if (secondsLeft < 0) {
			clearInterval(countdown);
			return;
		}
		displayTimeLeft(secondsLeft);

	}, 1000);

}

function displayTimeLeft(seconds){
	const mins = Math.floor(seconds / 60);
	const remainderSeconds = seconds % 60;
	const display = `${mins}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
	document.title = display;
	timerDisplay.textContent = display;
	// console.log({mins, remainderSeconds});
}

function displayEndTime(timestamp){
	const end = new Date(timestamp);
	const hour = end.getHours();
	const mins = end.getMinutes();
	endTime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${mins < 10 ? '0' : ''}${mins}`;
}


buttons.forEach(button => button.addEventListener('click', startTimer));

function startTimer(){
	const seconds = parseInt(this.dataset.time);
	timer(seconds);
	// console.log(seconds);
}

document.customForm.addEventListener('submit', function(e){
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins * 60);
	this.reset();
});