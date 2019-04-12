class Player extends Tile
{
  constructor(game)
  {
    super(0, 0, game.tileWidth * 0.9, game.tileWidth * 0.9, img.player, 1);
    this.game = game;

    this.xAccel = 0.32;
    this.xMinVel = 0.4;
    this.yJump = -7;
    this.wiggleVel = 0.2;
    this.flipLimit = 1;
    this.fadeSpeed = 0.04;

    this.xVel = 0;
    this.yVel = 0;
    this.airTime = 0;
    this.isFlipped = false;
    this.alive = true;
    this.flipCount = 0;
    this.deathCount = 0;
    this.gemCount = 0;
    this.currentGemCount = 0;
  }

  flip()
  {
    this.isFlipped = !this.isFlipped;
    this.flipCount++;
    this.game.gravity *= -1;
    keyList[32] = false;
  }

  xUpdate()
  {
    const game = this.game;

    this.xVel *= game.friction;
    if(keyList[37]) this.xVel -= this.xAccel;
    if(keyList[39]) this.xVel += this.xAccel;

    if(this.x < 0) this.x = 0;
    if(this.x > canvas.width - this.width) this.x = canvas.width - this.width;

    if(Math.abs(this.xVel) > this.xMinVel)
    {
      this.x += this.xVel;

      this.xCheckCollision();
    }
  }

  xCheckCollision()
  {
    const game = this.game;

    game.levels.blocks.forEach((block) => {
      if(block.solid)
      {
        if(this.isCollision(block))
        {
          this.x -= this.xVel;

          let wiggleVel = this.wiggleVel;
          if(this.xVel < 0) wiggleVel *= -1;

          do
          {
            this.x += wiggleVel;
          } while (!(this.isCollision(block)));
          this.x -= wiggleVel;

          this.xVel = 0;
        }
      }
    });
  }

  yUpdate()
  {
    const game = this.game;

    this.yVel += game.gravity;
    this.y += this.yVel;

    if(this.isFlipped)
    {
      if(this.y > canvas.width - this.height) this.y = canvas.width - this.height;
    } else
    {
      if(this.y < 0) this.y = 0;
    }

    this.yCheckCollision();
  }

  yCheckCollision()
  {
    const game = this.game;

    let isCeil = this.isFlipped ? this.yVel > 0 : this.yVel < 0;
    this.airTime++;

    game.levels.blocks.forEach((block) => {
      if(block.solid)
      {
        while(this.isCollision(block))
        {
          let wiggleVel = this.wiggleVel;
          if(this.isFlipped) wiggleVel *= -1;

          if(isCeil)
          {
            this.y += wiggleVel;
          } else
          {
            this.y -= wiggleVel;
            this.flipCount = 0;
            this.airTime = 0;
          }

          this.yVel = 0;
        }
      }
    });
  }

  jump()
  {
    const game = this.game;

    game.levels.blocks.forEach((block) => {
      if(block.solid)
      {
        if(this.isCollision(block))
        {
          let yJump = this.yJump;
          if(this.isFlipped) yJump *= -1;
          this.yVel = yJump;
        }
      }
    });
  }

  controlJump()
  {
    this.isFlipped ? this.y-- : this.y++; //so player touches ground again
    if(keyList[38] && this.airTime === 0) this.jump();
    this.isFlipped ? this.y++ : this.y--; //resets
  }

  checkDeath()
  {
    const game = this.game;

    if(this.isFlipped)
    {
      if(this.y < 0 - this.height)
      {
        return true;
      }
    } else
    {
      if(this.y > canvas.height)
      {
        return true;
      }
    }

    let death;
    game.levels.blocks.forEach((block) => {
      if(block.harmful)
      {
        if(this.isCollision(block))
        {
          death = true;
        }
      }
    });
    if(death) return true;

    return false;
  }

  checkUniqueBlocks()
  {
    const game = this.game;

    game.levels.blocks.forEach((block) => {
      if(this.isCollision(block))
      {
        if(block.id === "GEM")
        {
          this.currentGemCount++;
          block.active = false;
        }

        if(block.id === "FINISH")
        {
          this.gemCount += this.currentGemCount;
          this.currentGemCount = 0;
          game.nextLevel();
        }
      }
    });
  }

  die()
  {
    this.deathCount++;

    this.alive = false;
    fade(this, -this.fadeSpeed);

    wait(() => this.alpha === 0).then(() => {
      fade(this, this.fadeSpeed);
      this.init();

      wait(() => this.alpha === 1).then(() => {
        this.alive = true;
      });
    });
  }

  init()
  {
    const game = this.game;
    game.levels.addBackBlocks();

    let startBlock = game.levels.blocks.find((block) => {
      return block.id === "START";
    });
    this.x = startBlock.x;
    this.y = startBlock.y;
    this.xVel = 0;
    this.yVel = 0;
    this.airTime = 0;
    this.flipCount = 0;
    this.currentGemCount = 0;

    if(game.gravity < 0)
    {
      this.flip();
    }
  }

  tick()
  {
    let death;

    if(keyList[32] && this.flipCount < this.flipLimit) this.flip();

    this.yUpdate();
    this.xUpdate();
    this.controlJump();
    this.checkUniqueBlocks();

    death = this.checkDeath();
    if(death) this.die();
  }

}
