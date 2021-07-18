import "./styles.css";
var col, row;
var w = 20;
let grid = [];
let stack = [];
let current;
let canvas = document.getElementById("app");
var ctx = canvas.getContext("2d");
ctx.beginPath();

function Maxcanvas(width, height) {
  col = Math.floor(width / w);
  row = Math.floor(height / w);

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[0];

  createCanvas(width, height);
  drawCell();
}

function createCanvas(width, height, color) {
  let canvas = document.getElementById("app");
  canvas.width = width;
  canvas.height = height;
  canvas.style.backgroundColor = "rgb(211,211,211)";
}

function drawCell() {
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  RedrawCell();

  current.visited = true;
  createRect(current);
  nextCell(current);

  // var next = current.checkNeighbours()[0];
  // var length = current.checkNeighbours()[1].length;
}
function RedrawCell() {
  //console.log(grid[0]);
  console.log("redraw");
  ctx.clearRect(0, 0, 400, 400);
  // RedrawLines(grid[0]);
  for (let i = 0; i < grid.length; i++) {
    grid[i].show();
  }
}
function removeWalls(a, b) {
  var x = a.i - b.i;
  if (x === 1) {
    a.wall[3] = false;
    b.wall[1] = false;
    RedrawCell();
  } else if (x === -1) {
    a.wall[1] = false;
    b.wall[3] = false;
    RedrawCell();
  }

  var y = a.j - b.j;
  if (y === 1) {
    a.wall[0] = false;
    b.wall[2] = false;
    RedrawCell();
  } else if (y === -1) {
    a.wall[2] = false;
    b.wall[0] = false;
    RedrawCell();
  }
}

function nextCell(current) {
  console.log(current);
  setTimeout(() => {
    var next = current.checkNeighbours();
    console.log(next);
    if (next) {
      next.visited = true;
      removeWalls(current, next);
      createRect(current);

      current = next;
      stack.push(next);

      nextCell(current);
    } else {
      nextCell(stack.pop());
    }
  }, 1000 / 1000);

  // nextCell(current);
}
function index(i, j) {
  if (i < 0 || j < 0 || i > col - 1 || j > row - 1) {
    return -1;
  } else return j + i * col;
}
function createRect(current) {
  let canvas = document.getElementById("app");
  var ctx = canvas.getContext("2d");
  ctx.beginPath();
  var x = current.i * w;
  var y = current.j * w;
  if (current.visited) {
    ctx.rect(x, y, w, w);
    ctx.fillStyle = "white";
    ctx.fill();
    current.show();
  }
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.visited = false;
  this.neighbour = [];

  //Top -->> right -->> bottom -->> left
  this.wall = [true, true, true, true];

  this.checkNeighbours = function () {
    //Top Neighbour
    let top = grid[index(i, j - 1)];
    //Right Neighbour
    let right = grid[index(i + 1, j)];
    //Bottom Neighbhour
    let bottom = grid[index(i, j + 1)];
    //Left Neighbour
    let left = grid[index(i - 1, j)];

    if (top && !top.visited) {
      this.neighbour.push(top);
    }
    if (right && !right.visited) {
      this.neighbour.push(right);
    }
    if (bottom && !bottom.visited) {
      this.neighbour.push(bottom);
    }
    if (left && !left.visited) {
      this.neighbour.push(left);
    }

    if (this.neighbour.length > 0) {
      var min = Math.ceil(0);
      var max = Math.floor(this.neighbour.length);
      var random = Math.floor(Math.random() * (max - min) + min);
      return this.neighbour[random];
    } else {
      return undefined;
    }
  };
  this.show = function () {
    var x = this.i * w;
    var y = this.j * w;

    let canvas = document.getElementById("app");
    var ctx = canvas.getContext("2d");
    ctx.beginPath();

    // top line
    function MakeLine(from_x, from_y, to_x, to_y) {
      this.from_x = from_x;
      this.from_y = from_y;
      this.to_x = to_x;
      this.to_y = to_y;
      ctx.moveTo(this.from_x, this.from_y);
      ctx.lineTo(this.to_x, this.to_y);
    }
    if (this.wall[0]) {
      let top = new MakeLine(x, y, x + w, y);
      ctx.stroke();
    }
    if (this.wall[1]) {
      let right = new MakeLine(x + w, y, x + w, y + w);
      ctx.stroke();
    }
    if (this.wall[2]) {
      let bottom = new MakeLine(x, y + w, x + w, y + w);
      ctx.stroke();
    }
    if (this.wall[3]) {
      let left = new MakeLine(x, y, x, y + w);
      ctx.stroke();
    }
    // //top line
    //   ctx.moveTo(x, y);
    //   ctx.lineTo(x+w, y);

    //   //bottom line
    //   ctx.moveTo(x,y+w);
    //   ctx.lineTo(x+w,y+w)

    //   // left line
    //   ctx.moveTo(x,y);
    //   ctx.lineTo(x,y+w)
    //   //right line

    //     ctx.moveTo(x+w,y);
    //     ctx.lineTo(x+w,y+w)
  };
}

Maxcanvas(400, 400);
