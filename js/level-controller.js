class LevelController
{
  constructor(game)
  {
    this.game = game;

    this.level = 1;
    this.alpha = 1;
    this.blocks = [];
    this.enemies = [];
  }

  initBlocks()
  {
    const game = this.game;

    _LEVELS[this.level - 1].forEach((row, j) => {
      row.forEach((slot, i) => {
        let x = i * game.tileWidth;
        let y = j * game.tileWidth;

        if(slot === 1) this.blocks.push(new Block(x, y, game.tileWidth, this.alpha, "BLOCK"));
      });
    });
  }

  tick()
  {
    this.blocks.forEach((block) => {
      block.draw();
    });
  }
}
