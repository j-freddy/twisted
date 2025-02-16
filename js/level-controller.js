class LevelController
{
  constructor(game)
  {
    this.game = game;

    this.level = 0;
    this.alpha = 1;
    this.blocks = [];
    this.enemies = [];
    this.inactiveBlocks = [];
  }

  initBlocks()
  {
    const game = this.game;

    this.blocks = [];
    this.enemies = [];

    _LEVELS[this.level - 1].forEach((row, j) => {
      row.forEach((slot, i) => {
        let x = i * game.tileWidth;
        let y = j * game.tileWidth;

        if(slot >= 1 && slot <= b) this.blocks.push(new Block(x, y, game.tileWidth, this.alpha, "BLOCK", slot-1, this.game));
        if(slot === c) this.blocks.push(new Block(x, y, game.tileWidth, this.alpha, "START", 0, this.game));
        if(slot === d) this.blocks.push(new Minitile(x, y, game.tileWidth, this.alpha, "FINISH", 0, this.game));
        if(slot >= e && slot <= f) this.blocks.push(new Spike(x, y, game.tileWidth, this.alpha, "SPIKE", slot-e, this.game));
        if(slot >= g && slot <= h) this.blocks.push(new Lava(x, y, game.tileWidth, this.alpha, "LAVA", slot-g, this.game));
        if(slot === k) this.blocks.push(new Minitile(x, y, game.tileWidth, this.alpha, "GEM", 0, this.game));
        if(slot === l) this.blocks.push(new Block(x, y, game.tileWidth, this.alpha, "FLIPUP", 0, this.game));
        if(slot === m) this.blocks.push(new Block(x, y, game.tileWidth, this.alpha, "FLIPDOWN", 0, this.game));
        if(slot === n) this.blocks.push(new Block(x, y, game.tileWidth, this.alpha, "LOCKED", 0, this.game));
        if(slot === o) this.blocks.push(new Minitile(x, y, game.tileWidth, this.alpha, "KEY", 0, this.game));
      });
    });
  }

  removeInactiveBlocks()
  {
    this.blocks.forEach((block, i) => {
      if(!block.active)
      {
        let inactive = this.blocks.splice(i, 1);
        this.inactiveBlocks.push(inactive[0]);
      }
    });
  }

  addBackBlocks()
  {
    this.inactiveBlocks.forEach((block) => {
      block.active = true;
      this.blocks.push(block);
    });
    this.inactiveBlocks = [];
  }

  nextLevel()
  {
    const game = this.game;

    this.addBackBlocks();
    let endReached = false;
    if(this.level < game.noLevels - 1)
    {
      this.level++;
      this.initBlocks();
    } else
    {
      endReached = true;
    }
    return endReached;
  }

  tick()
  {
    this.removeInactiveBlocks();
  }

  draw()
  {
    this.blocks.forEach((block) => {
      block.draw();
    });
  }
}
