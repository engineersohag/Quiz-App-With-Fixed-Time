const myBtn = document.querySelector('.myBtn button');
const rulesBox = document.querySelector('.rulesBox');

// Time Counter part

const timeCount = document.querySelector(".timeCount .seconds");
const timeLine = document.querySelector(".questionHeader .timeLine");

// console.log(queText);


myBtn.onclick = () => {
	rulesBox.classList.add("activeInfo");
}

	// -- Rules Page --
const exitBtn = document.querySelector('.exitBtn');

exitBtn.onclick = () => {
	rulesBox.classList.remove("activeInfo");
}

	// -- questions page --
const continueBtn = document.querySelector('.buttons .continueBtn');
const ques = document.querySelector('.questions');

continueBtn.onclick = () => {
	rulesBox.classList.remove("activeInfo");
	ques.classList.add("activeQue");
	showQue(0);
	startTimer(15);
	startTimerLine(0);
}

const nextBtn = document.querySelector('.nextBtn');

// -- Result part --
const resultBox = document.querySelector(".result_box");
const restartQuiz = document.querySelector(".buttons .restart1");
const quitQuiz = document.querySelector(".buttons .quit");

restartQuiz.onclick = () => {
	window.location.reload();
}

quitQuiz.onclick = () => {
	window.location.reload();
}

let que_count = 0;

// Time Count Part 
let counter;
let timeValue = 15;
let counterLine;
let widthValue = 0;
let userScore = 0;

nextBtn.onclick = () => {
	if (que_count < Questions.length -1) {
		que_count++;
		showQue(que_count);
		clearInterval(counter);
		startTimer(timeValue);

		clearInterval(counterLine);
		startTimerLine(widthValue);

		nextBtn.style.display = "none";
	}else{
		console.log("You have completed your Task.");
		showResultBox();
	}
}

	// questions Show Part

function showQue(index) {
	const queText = document.querySelector("#text");
	const option_list = document.querySelector(".myOptions");
	let option_tag = '<div class="options">'+Questions[index].options[0]+'</div>'+'<div class="options">'+Questions[index].options[1]+'</div>'+'<div class="options">'+Questions[index].options[2]+'</div>'+'<div class="options">'+Questions[index].options[3]+'</div>';

    let queTag = "<span>" +Questions[index].numb+ '.'+Questions[index].q+"</span>";
    queText.innerHTML = queTag;	
    option_list.innerHTML = option_tag;

    const total_que = document.querySelector(".total_que");
    let total_queTag = "<p>"+Questions[index].numb+" of 5 Questions"+"</p>";
    total_que.innerHTML = total_queTag;

    const option = option_list.querySelectorAll(".myOptions .options");
    for (let i=0; i<option.length; i++){
    	option[i].setAttribute("onclick", "optionSelected(this)");
    }
}


// -- Answer Correction Check --

let tickIcon = `<div class="tick icon"><i class='bx bx-check'></i></div>`;
let crossIcon = `<div class="cross icon"><i class='bx bx-x'></i></div>`;

function optionSelected(answer) {
	clearInterval(counter);
	clearInterval(counterLine);
	let userAns = answer.textContent;
	let correctAns = Questions[que_count].answer;
	let alloptions = answer.parentNode.children.length;
	if(userAns == correctAns) {
		userScore +=1;
		console.log(userScore);
		answer.classList.add("correct");
		console.log("Answer is correct");
		answer.insertAdjacentHTML("beforeend",tickIcon);
	}else{
		answer.classList.add("incorrect");
		console.log("Wrong answer");
		answer.insertAdjacentHTML("beforeend",crossIcon);
		for(let i=0; i<alloptions; i++){
			if(answer.parentNode.children[i].textContent == correctAns){
				answer.parentNode.children[i].setAttribute("class", "options correct");
				answer.parentNode.children[i].insertAdjacentHTML("beforeend",tickIcon);
			}
		}
	}

	for(let i=0; i<alloptions; i++){
		answer.parentNode.children[i].classList.add("disabled");
	}
	nextBtn.style.display = "block";

}


// -- Result part --
function showResultBox(){
	rulesBox.classList.remove("activeInfo");
	ques.classList.remove("activeQue");

	resultBox.classList.add("activeResult");
	
	const scoreText = document.querySelector(".score_text");
	if(userScore > 3){
		let scoreTag = '<span>Congratulations 🎉 You Got <p>'+ userScore +'</p> Out of <p>'+ Questions.length +'</p></span>';
		scoreText.innerHTML = scoreTag;
	}
	else if(userScore > 1){
		let scoreTag = '<span>Carry On👍 You Got <p>'+ userScore +'</p> Out of <p>'+ Questions.length +'</p></span>';
		scoreText.innerHTML = scoreTag;
	}
	else{
		let scoreTag = '<span>I am sorry😢 You Got <p>'+ userScore +'</p> Out of <p>'+ Questions.length +'</p></span>';
		scoreText.innerHTML = scoreTag;
	}
}

// Time Counter Part

function startTimer(time){
	counter = setInterval(timer, 1000);
	function timer(){
		timeCount.textContent = time;
		time--;
		if(time < 9){
			let addZero = timeCount.textContent;
			timeCount.textContent = 0+ addZero;
		}
		if(time < 0){
			clearInterval(counter);
			timeCount.textContent = "00";
		}
	}
}

// Counter Line
function startTimerLine(time){
	counterLine = setInterval(timer, 50);
	function timer(){
		time += 1;
		timeLine.style.width = time + "px";
		if(time > 319){
			clearInterval(counterLine);
		}
	}
}