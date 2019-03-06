class Tile
{
  constructor(x, y, width, height, img, alpha, game)
  {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.img = img;
    this.alpha = alpha;
    this.game = game;
  }

  get hitbox()
  {
    return new SAT.Box(new SAT.Vector(this.x, this.y), this.width, this.height).toPolygon();
  }

  isCollision(target)
  {
    return SAT.testPolygonPolygon(this.hitbox, target.hitbox);
  }

  draw()
  {
    const game = this.game;

    ctx.save();
    ctx.globalAlpha = this.alpha * game.alpha;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.restore();
  }
}

class Block extends Tile
{
  constructor(x, y, width, alpha, id, style, game)
  {
    super(x, y, width, width, img.missing, alpha, game);
    this.id = id;
    this.style = style;
    this.solid;
    this.harmful;
    this.getProperties();
  }

  getProperties()
  {
    let info = _TILEINFO.find((block) => {
      return block.id === this.id;
    });

    this.img = info.img[this.style];
    this.solid = info.solid;
    this.harmful = info.harmful;
  }
}

class Spike extends Block
{
  constructor(x, y, width, alpha, id, style, game)
  {
    super(x, y, width, alpha, id, style, game);
  }

  /*
  get hitbox()
  {

  }
  */
}

class Lava extends Block
{
  constructor(x, y, width, alpha, id, style, game)
  {
    super(x, y, width, alpha, id, style, game);
  }

  /*
  get hitbox()
  {

  }
  */
}
