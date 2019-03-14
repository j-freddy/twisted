class Settings extends Tile
{
  constructor(game)
  {
    super(0, canvas.height*0.9, canvas.width, canvas.height*0.1, img.null, 1, game);
    this.volume = new Tile(canvas.width*1/4, canvas.height*0.92, game.tileWidth, game.tileWidth, img.volume, 1, game);
    this.info = new Tile(  canvas.width*2/4, canvas.height*0.92, game.tileWidth, game.tileWidth, img.info, 1, game);
    this.music = new Tile( canvas.width*3/4, canvas.height*0.92, game.tileWidth, game.tileWidth, img.music, 1, game);
    this.icons = [];
    this.addicons();

    this.volumeSpeed = 0.05;
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
  }

  tick()
  {
    const game = this.game;

    if(this.visible)
    {
      this.icons.forEach((icon) => {
        icon.draw();
      });

      if(this.volume.isClicked)
      {
        console.log("Volume clicked!");
      }
      if(this.info.isClicked)
      {
        console.log("Info clicked!");
        //pause by setting game.freeze = true;
      }
      if(this.music.isClicked)
      {
        if(game.music.volume === 0)
        {
          game.music.changeVolume(this.volumeSpeed, 0.9);
        } else
        {
          game.music.changeVolume(this.volumeSpeed * -1, 0);
        }
      }
    }
  }
}
