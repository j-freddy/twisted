class Cloud extends Tile
{
  constructor(x, y, width, alpha, game)
  {
    super(x, y, width, width * 512/640, img.cloud, alpha, game);
    this.speed = 60/width;
    this.active = true;
  }

  animate()
  {
    this.x += this.speed;
    if(this.x > canvas.width)
    {
      this.active = false;
    }
  }
}

class Background
{
  constructor(game)
  {
    this.game = game;
    this.colourSky = "#e6f7ff";
    this.clouds = [];
  }

  get cloudSpawnDelay()
  {
    return Math.random() + 1;
  }

  createCloud()
  {
    waitSeconds(this.cloudSpawnDelay).then(() => {
      let width = Math.random()*100 + 50;
      let y = Math.random() * (canvas.height - width);
      let alpha = Math.random()*40 + 30;
      alpha *= 0.01;

      this.clouds.push(new Cloud(-width, y, width, alpha, this.game));

      window.requestAnimationFrame(() => {
        this.createCloud();
      });
    });
  }

  removeInactiveClouds()
  {
    this.clouds.forEach((cloud, i) => {
      if(!cloud.active)
      {
        this.clouds.splice(i, 1);
      }
    });
  }

  drawSky()
  {
    const game = this.game;

    ctx.save();
    ctx.globalAlpha = game.alpha;
    ctx.fillStyle = this.colourSky;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
  }

  draw()
  {
    this.drawSky();

    this.clouds.forEach((cloud) => {
      cloud.animate();
      cloud.draw();
    });
    this.removeInactiveClouds();
  }
}
