import { rand } from '@utils/random';

const PIx2 = Math.PI * 2;
const colors = ['#ffffff', '#e2edf7', '#d8e7f5', '#cfe2f3', '#efefef', '#d6d6d6', '#a6c9e9'];
const shadowColors = ['#FF8066', '#0081CF', '#00C9A7'];

class Snowflake {
  constructor(canvas, i) {
    this.i = i;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    this.x = rand(0, canvas.offsetWidth);
    this.y = rand(0, canvas.offsetHeight);
    this.r = rand(1, 7);

    this.dx = Math.random() > 0.7 ? 0 : rand(1, 4) / 10;
    this.dy = this.dx + rand(3, 10) / 10;
    this.dx *= Math.random() > 0.5 ? 1 : -1;
  }

  update() {
    if (this.y > this.canvas.offsetHeight || this.x < 0 || this.x > this.canvas.offsetWidth) {
      this.reset();
    }
    this.x += this.dx;
    this.y += this.dy;

    this.render();
  }

  reset() {
    this.x = rand(0, this.canvas.offsetWidth);
    this.y = rand(0, 50);
  }

  render() {
    this.ctx.beginPath();

    this.ctx.fillStyle = colors[this.i % colors.length];
    //this.ctx.filter = 'blur(2px)';
    this.ctx.shadowBlur = 15;
    this.ctx.shadowColor = shadowColors[this.i % shadowColors.length];

    this.ctx.arc(this.x, this.y, this.r, 0, PIx2);
    this.ctx.fill();
  }
}

export default Snowflake;
