//The animation and transition of tiles additional feature was implemented
//ID #: 620073652
//WED DEVELOPMENT (INFO 2180)


var number_of_space = 15; 												//Empty tile
var move = "none";											 // direction
var bigContainer;														//Array of tiles
var counter = 0;
var addvar = 0;
var str;
var active = false;								//Is tile still moving..

//Loads tiles when webpage loads
window.onload = function()
{
	var container = document.getElementById('puzzlearea').getElementsByTagName('div');
	bigContainer = container;
	document.getElementById('shufflebutton').addEventListener("click", function(){

       shuffle();

	});

	for(var i = 0; i < container.length; i++)
	{
		container[i].className = 'puzzlepiece';
		container[i].onmouseover = Movable;
		container[i].onmouseout = clear;
		container[i].onclick = moveTile;

		if(i >= 0 && i <= 3)
		{
			container[i].style.left += i * 100 + 'px';
			container[i].style.top = 0 + 'px';
			container[i].style.backgroundPosition = -i * 100 + 'px ' + '0px';
		}
		else if(i >= 4 && i <= 7)
		{
			container[i].style.left += (i - 4) * 100 + 'px';
			container[i].style.top = 100 + 'px';
			container[i].style.backgroundPosition = -(i - 4) * 100 + 'px '+ '-100px';
		}
		else if(i >= 8 && i <= 11)
		{
			container[i].style.left += (i - 8) * 100 + 'px';
			container[i].style.top = 200 + 'px';
			container[i].style.backgroundPosition = -(i - 8) * 100 + 'px '+ '-200px';
		}
		else
		{
			container[i].style.left += (i - 12) * 100 + 'px';
			container[i].style.top = 300 + 'px';
			container[i].style.backgroundPosition = -(i - 12) * 100 + 'px ' + '-300px';
		}
		
	}
	        
}

//Check if tile can move
function Movable()
{
	if(!active)
	{
		if((parseInt(this.style.left) + parseInt(this.offsetWidth)) === parseInt(getX()) && this.style.top === getY())
		{
		this.className = this.className + " movablepiece";
		move = "right";
		}
		else if(parseInt(this.style.left) === (parseInt(getX()) + parseInt(this.offsetWidth)) && this.style.top === getY())
		{
			this.className = this.className + " movablepiece";
			move = "left";
		}
		else if((parseInt(this.style.top) + parseInt(this.offsetHeight)) === parseInt(getY()) && this.style.left === getX())
		{
			this.className = this.className + " movablepiece";
			move = "down";
		}
		else if(parseInt(this.style.top) === (parseInt(getY()) + parseInt(this.offsetHeight)) && this.style.left === getX())
		{
			this.className = this.className + " movablepiece";
			move = "up";
		}
		else
		{
			move = "none";
		}
	}
	

}

//remove .moveablepiece class when mouse exits tile
function clear()
{
	this.className = 'puzzlepiece';
}

//Check method for shuffle
function can_Move(el)
{
	if((parseInt(el.style.left) + parseInt(el.offsetWidth)) === parseInt(getX()) && el.style.top === getY())
	{
		move = "right";
		return "right";
	}
	else if(parseInt(el.style.left) === (parseInt(getX()) + parseInt(el.offsetWidth)) && el.style.top === getY())
	{
		move = "left";
		return "left";
	}
	else if((parseInt(el.style.top) + parseInt(el.offsetHeight)) === parseInt(getY()) && el.style.left === getX())
	{
		move = "down";
		return "down";
	}
	else if(parseInt(el.style.top) === (parseInt(getY()) + parseInt(el.offsetHeight)) && el.style.left === getX())
	{
		move = "up";
		return "up";
	}
	else
	{
		move = "none";
		return "none";
	}

}

//Animates tile movement
function shift()
{
	var indx = 0;
	for(var i = 0; i < bigContainer.length; i++)
	{
		if(bigContainer[i].textContent === str)
		{
			indx = i;	
		}
	}
	
	if(addvar != 100)
	{
		if(move === "left" || move === "right")
		{
			bigContainer[indx].style.left = parseInt(bigContainer[indx].style.left) + counter + 'px';
		}
		else
		{
			bigContainer[indx].style.top = parseInt(bigContainer[indx].style.top) + counter + 'px';
		}
		addvar += 1;
		active = true;
		setTimeout("shift()", "8 * 1000");
	}
	else
	{
		addvar = 0;
		active = false;
		move = "none";
	}	
	
}

//Gets direction and then calls shift() to move tile
function moveTile()
{
	if(!active)
	{
		switch(move)
		{
				case "right":
					counter = 1;
					number_of_space -= 1;
					str = this.textContent;
					shift();
				break;

				case "left":
					counter =- 1;
					number_of_space += 1;
					str = this.textContent;
					shift();
				break;

				case "down":
					counter = 1;
					number_of_space -= 4;
					str = this.textContent;
					shift();
				break;

				case "up":
					counter =- 1;
					number_of_space += 4;
					str = this.textContent;
					shift();
				break;

		}
	}
}

//Move method for shuffle
function move_Tile(el)
{
	
	switch(move)
	{
		case "right":
			el.style.left = parseInt(el.style.left) + 100 + 'px';
			number_of_space -= 1;
		break;

		case "left":
			el.style.left = parseInt(el.style.left) - 100 + 'px';
			number_of_space += 1;
		break;

		case "down":
			el.style.top = parseInt(el.style.top) + 100 + 'px';
			number_of_space -= 4;
		break;

		case "up":
			el.style.top = parseInt(el.style.top) - 100 + 'px';
			number_of_space += 4;
		break;

	}
}

//shuffles tiles
function shuffle()
{
	var num = 100;
	for(var i = 0; i < num; i++)
	{
		var list_A = [];
		for(var p = 0; p < bigContainer.length; p++)
		{
			if(can_Move(bigContainer[p]) != "none")
			{
				list_A.push(p);
			}

		}

		if(list_A.length != 0)
		{
			var n = list_A[Math.floor((Math.random() * list_A.length) + 0)];
			can_Move(bigContainer[n]);
			move_Tile(bigContainer[n]);
		}
	}
	move = "none";
}

//Returns the corresponding X for the empty tile
function getX()
{
		if(number_of_space >= 0 && number_of_space <= 3)
		{
			return number_of_space * 100 + 'px';
		}
		else if(number_of_space >= 4 && number_of_space <= 7)
		{
			return (number_of_space - 4) * 100 + 'px';
		}
		else if(number_of_space >= 8 && number_of_space <= 11)
		{
			return (number_of_space - 8) * 100 + 'px';
		}
		else
		{
			return (number_of_space - 12) * 100 + 'px';
		}
}

//Returns the corresponding Y for the empty tile
function getY()
{
	if(number_of_space >= 0 && number_of_space <= 3)
	{
			return '0px';
	}
	else if(number_of_space >= 4 && number_of_space <= 7)
	{
			return '100px';
	}
	else if(number_of_space >= 8 && number_of_space <= 11)
	{
			return '200px';
	}else
	{
			return '300px';
	}
}