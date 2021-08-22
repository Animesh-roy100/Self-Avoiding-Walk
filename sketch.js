let grid;
let spacing = 5;
let cols, rows;
let path = [];
let spot;

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function setup() {
  createCanvas(400, 400);
  cols = floor(width / spacing);
  rows = floor(height / spacing);
  background(51);
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Spot(i, j);
    }
  }
  spot = grid[0][0];
  path.push(spot);
  spot.visited = true;
}

function isValid(i, j) {
  if (i < 0 || i >= cols || j < 0 || j >= rows) {
    return false;
  }
  return !grid[i][j].visited;
}

function draw() {
  background(0);
  translate(spacing * 0.5, spacing * 0.5);

  spot = spot.nextSpot();
  if (!spot) {
    let stuck = path.pop();
    stuck.clear();
    spot = path[path.length - 1];
  } else {
    path.push(spot);
    spot.visited = true;
  }

  if (path.length === cols * rows) {
    console.log("Solved!");
    noLoop();
  }

  stroke(255);
  strokeWeight(spacing * 0.25);
  noFill();
  beginShape();
  for (let spot of path) {
    vertex(spot.x, spot.y);
  }
  endShape();

  stroke(255);
  strokeWeight(spacing * 0.5);
  point(spot.x, spot.y);
}
