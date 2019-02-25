class GameController
{
  constructor()
  {
    this.row = 18;
    this.col = 18;
    this.noLevels = 10;

    this.gravity = 0.23;
    this.friction = 0.9;

    this.levels = new LevelController(this);
    this.player = new Player(this);
  }

  get tileWidth()
  {
    return canvas.width/this.row;
  }

  init()
  {
    const levels = this.levels;
    const player = this.player;

    levels.initBlocks();
    player.init();

    this.tick();
  }

  tick()
  {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const levels = this.levels;
    const player = this.player;

    player.tick();
    levels.tick();

    window.requestAnimationFrame(() => {
      this.tick();
    });
  }

}
