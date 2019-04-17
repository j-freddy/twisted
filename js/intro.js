class Intro extends Tile
{
  constructor(game)
  {
    super(0, 0, canvas.width, canvas.height, img.intro, 1, game)
  }

  init()
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.draw();

    this.tick();
  }

  tick()
  {
    const game = this.game;

    let toTick = true;
    if(this.isClicked)
    {
      toTick = false;
      game.init();
    }

    if(toTick)
    {
      window.requestAnimationFrame(() => {
        this.tick();
      });
    }
  }
}
