class GUI extends Tile
{
  constructor(game)
  {
    super(0, canvas.height*0.9, canvas.width, canvas.height*0.1, img.null, 1, game);
    this.volume = new Tile(canvas.width*1/4, canvas.height*0.92, game.tileWidth    , game.tileWidth    , img.volume, 1, game);
    this.info = new Tile(  canvas.width*2/4, canvas.height*0.92, game.tileWidth    , game.tileWidth    , img.info, 1, game);
    this.music = new Tile( canvas.width*3/4, canvas.height*0.92, game.tileWidth    , game.tileWidth    , img.music, 1, game);
    this.gems = new Writable(game.tileWidth, game.tileWidth    , game.tileWidth*1.4, game.tileWidth*1.4, img.gem_icon, 1, game);

    this.icons = [];
    this.addicons();

    this.volumeSpeed = 0.05;
    this.disabledAlpha = 0.3;

    this.instructions = new Tile(0, 0, canvas.width, canvas.height, img.instructions, 1, game);
    this.showInfo = false;
  }

  get visible()
  {
    return this.isHover;
  }

  addicons()
  {
    this.icons.push(this.volume);
    this.icons.push(this.info);
    this.icons.push(this.music);
    this.icons.push(this.gems);
  }

  updateGemText()
  {
    const game = this.game;

    this.gems.setText(
      "= " + (game.player.gemCount + game.player.currentGemCount),
      this.gems.width*1.2,
      this.gems.height/1.5,
      "24px Arial",
      "#00a0b4"
    );
  }

  tick()
  {
    const game = this.game;

    if(this.showInfo) this.instructions.draw();

    if(this.visible)
    {
      this.icons.forEach((icon) => {
        icon.draw();
      });

      if(this.volume.isClicked)
      {
        game.volume = 1 - game.volume;
        if(game.volume === 1)
        {
          this.volume.alpha = 1
        } else
        {
          this.volume.alpha = this.disabledAlpha;
        }
      }
      if(this.info.isClicked)
      {
        game.freeze = !game.freeze;
        this.showInfo = !this.showInfo;
      }
      if(this.music.isClicked)
      {
        if(game.music.volume === 0)
        {
          game.music.changeVolume(this.volumeSpeed, 0.9);
          this.music.alpha = 1;
        } else
        {
          game.music.changeVolume(this.volumeSpeed * -1, 0);
          this.music.alpha = this.disabledAlpha;
        }
      }
    }
  }
}
