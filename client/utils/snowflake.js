//const canvas = document.querySelector('canvas');
//const ctx = canvas.getContext('2d');
const PIx2 = Math.PI * 2;
const colors = ['#ffffff', '#e2edf7', '#d8e7f5', '#cfe2f3', '#efefef', '#d6d6d6', '#a6c9e9'];

class Snowflake {
  constructor(canvas, i) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.ctx.fillStyle = colors[i % colors.length];

    this.x = rand(0, canvas.offsetWidth);
    this.y = rand(0, 100);
    this.r = rand(3, 10);

    this.dx = 0;
    //this.dx = rand(1, 2);
    //this.dx *= Math.random() > 0.5 ? 1 : -1;
    this.dy = rand(4, 5);
  }

  update() {
    this.x += this.dx;
    this.y += 3;

    this.render();
  }

  render() {
    this.ctx.beginPath();
    // this.ctx.filter = 'blur(2px)';
    // this.ctx.shadowBlur = 10;
    // this.ctx.shadowColor = '#a8caea';
    this.ctx.arc(this.x, this.y, this.r, 0, PIx2);
    this.ctx.fill();
  }
}

const rand = (min, max) => min + Math.random() * (max - min);

export default Snowflake;
