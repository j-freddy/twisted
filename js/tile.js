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
    return new B(new V(this.x, this.y), this.width, this.height).toPolygon();
  }

  get isHover()
  {
    return SAT.pointInPolygon(cursor.getHitbox(), this.hitbox);
  }

  get isClicked()
  {
    return this.isHover && cursor.clicked;
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

class Writable extends Tile
{
  constructor(x, y, width, height, img, alpha, game)
  {
    super(x, y, width, height, img, alpha, game);
    this.text = "default text";
    this.xOffset = 0;
    this.yOffset = 0;
    this.font = "18px Arial";
    this.colour = "#000";
  }

  setText(text, xOffset, yOffset, font, colour)
  {
    this.text = text;
    this.xOffset = xOffset;
    this.yOffset = yOffset;
    this.font = font;
    this.colour = colour;
  }

  draw()
  {
    const game = this.game;

    ctx.save();
    ctx.globalAlpha = this.alpha * game.alpha;
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    ctx.font = this.font;
    ctx.fillStyle = this.colour;
    ctx.fillText(this.text, this.x+this.xOffset, this.y+this.yOffset);

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
    this.active = true;
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
    this._width = game.tileWidth * 60/64;
    this._height = game.tileWidth * 52/64;
  }

  get hitbox()
  {
    let [blX, blY] = [(this.width - this._width) / 2, this.height];
    let [brX, brY] = [(this.width - this._width) / 2 + this._width, this.height];
    let [cX, cY] = [this.width / 2, this.height - this._height];

    if(this.style === 0)
    {
      [blX, blY] = [blX, this.height - blY];
      [brX, brY] = [brX, this.height - brY];
      [cX, cY] = [cX, this.height - cY];
    }

    return new P(new V(this.x, this.y), [
      new V(blX, blY), new V(brX, brY), new V(cX, cY)
    ]);
  }
}

class Lava extends Block
{
  constructor(x, y, width, alpha, id, style, game)
  {
    super(x, y, width, alpha, id, style, game);
    this._height = this.height/2;
    this.offset = this.height - this._height;
  }

  get hitbox()
  {
    let yOffset;
    if(this.style === 0) yOffset = 0;
    if(this.style === 1) yOffset = this.offset;

    return new B(new V(this.x, this.y + yOffset), this.width, this._height).toPolygon();
  }

}

class Minitile extends Block
{
  constructor(x, y, width, alpha, id, style, game)
  {
    super(x, y, width, alpha, id, style, game);
    this.ratio = 40/64;
  }

  get hitbox()
  {
    let offset = this.width * (1 - this.ratio)/2;
    let x = this.x + offset;
    let y = this.y + offset;
    let width = this.width - offset*2;
    let height = this.height - offset*2;

    return new B(new V(x, y), width, height).toPolygon();
  }
}
