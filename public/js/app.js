var draw;
var canvas = document.querySelector('#canvas');
var context = canvas.getContext('2d');
var radius = 10;
var minRadius = 2;
var maxRadius = 30;

function start() {

	pincelSize();

	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	canvas.addEventListener('mousedown', event => {
		draw = true;
		context.moveTo(event.pageX, event.pageY);
		console.log(radius);
	});


	canvas.addEventListener('mousemove', event => {
		if(draw){
			context.lineWidth = radius * 2;
			context.lineTo(event.pageX, event.pageY);
			context.stroke();

			context.beginPath();
			context.arc(event.pageX, event.pageY, radius, 0, 2 * Math.PI);
			context.fill();

			context.beginPath();
			context.moveTo(event.pageX, event.pageY);
		}
	});

	canvas.addEventListener('mouseup', event => {
		draw = false;
	});

	setColors();
	save();
}

function pincelSize(){
	document.querySelector('#increase').addEventListener('click', () => {
		radius ++;
		if(radius >= maxRadius) radius = maxRadius;
		document.querySelector('#pincelVal').innerHTML = radius; 
	});

	document.querySelector('#decrease').addEventListener('click', () => {
		document.querySelector('#pincelVal').innerHTML = radius;
		if(radius <= minRadius) radius = minRadius;
		radius --;
	});
}

function setColors(){
	var colors = ['yellow', 'pink', 'orange', 'gray', 'green', 'blue', 'red'];

	for (let i = 0; i < colors.length; i++) {
		document.querySelector('#changeColor').innerHTML += `<button class="btn mx-1 p-3" id="${colors[i]}" style="background-color: ${colors[i]};"></button>`
	}

	document.querySelectorAll('#changeColor button').forEach((button, index) => {
		button.addEventListener('click', (event) => {
			context.fillStyle = event.target.id;
			context.strokeStyle = event.target.id;
		});
	});
}

function save(){
	document.querySelector('#save').addEventListener('click', () => {
		window.location.href = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
	});
}

window.onload = start();