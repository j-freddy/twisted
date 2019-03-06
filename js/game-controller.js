class GameController
{
  constructor()
  {
    this.row = 18;
    this.col = 18;
    this.noLevels = _LEVELS.length;
    this.alpha = 1;

    this.gravity = 0.23;
    this.friction = 0.9;

    this.levels = new LevelController(this);
    this.player = new Player(this);

    this.freeze = false;
  }

  get tileWidth()
  {
    return canvas.width/this.row;
  }

  wait(condition)
  {
    const promise = (resolve) => {
      if(condition())
      {
        resolve();
      } else
      {
        setTimeout(() => {
          promise(resolve)
        }, 100);
      }
    }

    return new Promise(promise);
  }

  fade(speed)
  {
    let tick = true;

    this.alpha += speed;

    if(speed < 0 && this.alpha < 0)
    {
      this.alpha = 0;
      tick = false;
    }
    if(speed > 0 && this.alpha > 1)
    {
      this.alpha = 1;
      tick = false;
    }

    if(tick)
    {
      window.requestAnimationFrame(() => {
        this.fade(speed);
      });
    }
  }

  nextLevel()
  {
    const levels = this.levels;

    keyList[16] = false;
    keyList[88] = false;

    this.freeze = true;
    this.fade(-0.02);
    this.wait(() => this.alpha === 0).then(() => {
      this.init(false);
      this.fade(0.02);
    });

    return true;
  }

  init(tick = true)
  {
    const levels = this.levels;
    const player = this.player;
    this.freeze = false;

    let endReached;

    endReached = levels.nextLevel();

    if(endReached)
    {
      console.log("You have reached the end of the game!");
    } else
    {
      player.init();
      if(tick) this.tick();
    }
  }

  tick()
  {
    let tick = true;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const levels = this.levels;
    const player = this.player;

    if(!this.freeze)
    {
      levels.tick();
      player.tick();
    }
    levels.draw();
    player.draw();

    if(keyList[16] && keyList[88]) tick = this.nextLevel();

    if(tick)
    {
      window.requestAnimationFrame(() => {
        this.tick();
      });
    }
  }

}
