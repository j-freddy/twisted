class Tile
{
  constructor(x, y, width, height, img, alpha)
  {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.img = img;
    this.alpha = alpha;
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
    ctx.save();

    ctx.globalAlpha = this.alpha;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);

    ctx.restore();
  }
}

class Block extends Tile
{
  constructor(x, y, width, alpha, id)
  {
    super(x, y, width, width, img.missing, alpha);
    this.id = id;
    this.solid;
    this.harmful;
    this.getProperties();
  }

  getProperties()
  {
    let info = _TILEINFO.find((block) => {
      return block.id === this.id;
    });

    this.img = info.img;
    this.solid = info.solid;
    this.harmful = info.harmful;
  }
}
