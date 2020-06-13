let socket;
socket = io.connect('https://bestcodenames.herokuapp.com/')

const words = [
	{"name":"Hi", "status":"blue"},
	{"name":"Test", 'status':'red'},
	{"name":"Aristocrat", 'status':'neutral'},
	{"name":'Baguette', 'status':'blue'},
	{"name":'Chicken', 'status':'blue'},
	{"name":'Canada', 'status':'red'},
	{'name':'Continuum', 'status':'neutral'},
	{'name':'Feudalism', 'status':'red'},
	{'name':'Garbage', 'status':'blue'},
	{'name':'Kosovo', 'status':'red'},
	{'name':'Unity', 'status':'blue'},
	{'name':'Yeet', 'status':'red'},
	{'name':'Flibbertigibbet', 'status':'blue'},
	{'name':'Strategy', 'status':'red'},
	{'name':'Test', 'status':'neutral'},
	{'name':'Pablo', 'status':'blue'},
	{'name':'Archaeologist', 'status':'blue'},
	{'name':'Lunchbox', 'status':'neutral'},
	{'name':'Japan', 'status':'red'},
	{'name':'Helicopter', 'status':'neutral'},
	{'name':'Octogone', 'status':'bomb'},
	{'name':'Plumber', 'status':'blue'},
	{'name':'Reimbursement', 'status':'red'},
	{'name':'Sushi', 'status':'blue'},
	{'name':'Grass', 'status':'neutral'},
];

const cells = document.querySelectorAll(".cell")

/*cells.forEach((cell, index) =>{
	cell.innerHTML = words[index]['name'];
}) 
*/

const cellsContainer = document.getElementById('gametable')
words.forEach((word) =>{
	cellsContainer.insertAdjacentHTML("beforeend", `<div class='cell active' onclick=(triggerClickedCell()) data-word='${word.name}'>${word.name}</div>`);

})

function spymaster(){
	const foundSpy = words.forEach((element, index) => {
		if(element.status == 'red'){
			cells[index].classList.toggle('spyred')
		}

		if(element.status == 'blue'){
			cells[index].classList.toggle('spyblue')
		}

		if(element.status == 'neutral'){
			cells[index].classList.toggle('spyneutral')
		}

		if(element.status == 'bomb'){
			cells[index].classList.toggle('spybomb')
		}
	})
}


function showColor(data) {
    const found = data.word
    let clickedCell = document.querySelector(`[data-word='${found}']`);
    const findName = words.find(element => element.name == clickedCell.innerHTML);
    console.log(clickedCell.classList)

    if (clickedCell.classList.contains('active')){
        if(findName.status == 'red') {
          redPoints--;
          document.getElementById("redPoints").innerHTML = redPoints;
          clickedCell.classList.add('red');
        }else if (findName.status == 'blue') {
          bluePoints--;
          document.getElementById("bluePoints").innerHTML = bluePoints;
          clickedCell.classList.add('blue');
        }else if (findName.status == 'bomb') {
            explosion();
        }else if (findName.status == 'neutral'){
            clickedCell.classList.add('neutral');
        }

        if (redPoints == 0) {
            redPoints++
            alert('red won');
        }
        if (bluePoints == 0) {
            bluePoints++
            alert('blue won');
        }
        clickedCell.classList.remove('active');
    }
    let clickdCell = document.querySelector(`[data-word='${found}']`)
}

function triggerClickedCell(){
	const clickedWord = event.target.innerText
	console.log(clickedWord)


	//Sending json to websocket serv
	let data={
		word: clickedWord
	}
	socket.emit('trigger-clicked-cell', data)
}

socket.on('clickcell', showColor);
