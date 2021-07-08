import "./styles.css";
var col, row;
var w = 20;
let grid = [];
let current;
let canvas = document.getElementById("app");
var ctx = canvas.getContext("2d");
ctx.beginPath();

let array = [0, 1, 3, 4];
console.log(array.length);

function Maxcanvas(width, height) {
  col = Math.floor(width / w);
  row = Math.floor(height / w);

  for (var i = 0; i < row; i++) {
    for (var j = 0; j < col; j++) {
      var cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  current = grid[index(10, 10)];

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

  current.visited = true;
  createRect(current);
  nextCell(current);

  // var next = current.checkNeighbours()[0];
  // var length = current.checkNeighbours()[1].length;
}

function nextCell(current) {
  setTimeout(() => {
    var next = current.checkNeighbours();

    if (next) {
      next.visited = true;
      createRect(next);
      current = next;

      nextCell(current);
    }
  }, 1000 / 5);

  // nextCell(current);
}
function index(i, j) {
  if (i < 0 || j < 0 || i > col - 1 || j > row - 1) {
    return -1;
  } else return j + i * col;
}
function createRect(current) {
  var x = current.i * w;
  var y = current.j * w;
  if (current.visited) {
    ctx.rect(x, y, w, w);
    ctx.fillStyle = "black";
    ctx.fill();
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
    }
    if (this.wall[1]) {
      let right = new MakeLine(x + w, y, x + w, y + w);
    }
    if (this.wall[2]) {
      let bottom = new MakeLine(x, y + w, x + w, y + w);
    }
    if (this.wall[3]) {
      let left = new MakeLine(x, y, x, y + w);
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

    ctx.stroke();
  };
}

Maxcanvas(400, 400);
