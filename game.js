var theDojo = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];


var dojoDiv = document.querySelector("#the-dojo");
var bombsCount = 10;
var uncheckedSquares = 100

function init(ninjaCount) {
  bombsCount = ninjaCount
  uncheckedSquares = 100
  let placed = 0;
  while (placed < 10) {
    let i = Math.floor(Math.random() * 10)
    let j = Math.floor(Math.random() * 10)
    if (theDojo[i][j] == 0) {
      theDojo[i][j] = 1
      placed++
    }
  }

}

// Creates the rows of buttons for this game
function render(theDojo) {
  var result = "";
  for (var i = 0; i < theDojo.length; i++) {
    for (var j = 0; j < theDojo[i].length; j++) {
      result += `<button class="tatami" onclick="howMany(${i}, ${j}, this)" oncontextmenu="flag(event, this, ${i}, ${j})"></button>`;
    }
  }
  return result;
}

function flag(event, element, i, j) {
  event.preventDefault(); //this prevents the default behavior of "oncontextmenu" (opening context menu)
  if (element.innerText === "X"){
    element.innerText = "";
    if (theDojo[i][j] == 1) {
      bombsCount++;
    }
    return
  }
  if (theDojo[i][j] == 1) {
    bombsCount--;
  }
  element.innerText = "X";
  if (bombsCount === 0) {
    alert("You win!! Resetting")
    reset()
  }
}

// TODO - Make this function tell us how many ninjas are hiding 
//        under the adjacent (all sides and corners) squares.
//        Use i and j as the indexes to check theDojo.
function howMany(i, j, element) {
  console.log({ i, j });
  let count = 0;
  console.log(count)
  if (theDojo[i][j] == 1) {
    alert("BOOM! Resetting")
    reset()
    return "game over, man"
  }

  for (let row = i - 1; row <= i + 1; row++) {
    if (!theDojo[row]) continue;
    for (let col = j - 1; col <= j + 1; col++) {
      if (row === i && col === j) continue;
      if (!theDojo[row][col]) continue;
      count += theDojo[row][col]
    }
  }

  element.innerText = count;
  uncheckedSquares--;
  if (uncheckedSquares === bombsCount) {
    alert("You win! Resetting");
    reset()
  }
}

function reset() {
  theDojo = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]];

  dojoDiv.innerHTML = render(theDojo);
  init(10);
}

// BONUS CHALLENGES
// 1. draw the number onto the button instead of alerting it
// 2. at the start randomly place 10 ninjas into theDojo with at most 1 on each spot
// 3. if you click on a ninja you must restart the game 
//    dojoDiv.innerHTML = `<button onclick="location.reload()">restart</button>`;

// start the game
// message to greet a user of the game
var style = "color:cyan;font-size:1.5rem;font-weight:bold;";
console.log("%c" + "IF YOU ARE A DOJO STUDENT...", style);
console.log("%c" + "GOOD LUCK THIS IS A CHALLENGE!", style);
// shows the dojo for debugging purposes
// adds the rows of buttons into <div id="the-dojo"></div> 
dojoDiv.innerHTML = render(theDojo);
init(10);
console.table(theDojo);