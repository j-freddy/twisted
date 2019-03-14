class Music
{
  constructor(title, author, file)
  {
    this.title = title;
    this.author = author;
    this.file = file;
  }

  get info()
  {
    return this.title + " by " + this.author;
  }
}

class MusicController
{
  constructor()
  {
    this.playlist = {};
    this.addMusic();
    this.currentMusic = null;
    this.loop = true;
  }

  get currentFile()
  {
    return this.currentMusic.file;
  }

  get volume()
  {
    return this.currentFile.volume;
  }

  set volume(value)
  {
    this.currentFile.volume = value;
  }

  get isPlaying()
  {
    /*
      NOTE:
      isPlaying: returns true if audio is not stopped
      isPaused: returns true if audio is paused

      If an audio has been paused at the 1:00 mark, isPlaying returns true and isPaused returns true
    */

    return this.currentFile.currentTime !== 0;
  }

  get isPaused()
  {
    return this.currentFile.paused;
  }

  addMusic()
  {
    const playlist = this.playlist;
    playlist.testing = new Music("Testing", "SuperTux", new Audio("audio/testing.wav"));
    playlist.cloud_chaser = new Music("Cloud Chaser", "Felocai", new Audio("audio/music/cloud-chaser.mp3"));
    playlist.spots_canyon = new Music("Spot's Canyon", "celldamage", new Audio("audio/music/spots-canyon.mp3"));
  }

  playMusic()
  {
    if(!this.isPlaying)
    {
      this.volume = 0;
      this.changeVolume(0.05, 0.9);
      this.currentFile.play();
    }
  }

  pauseMusic()
  {
    if(this.isPlaying)
    {
      this.currentFile.pause();
    }
  }

  continueMusic()
  {
    if(this.isPlaying)
    {
      this.currentFile.play();
    }
  }

  stopMusic()
  {
    if(this.isPlaying)
    {
      this.changeVolume(-0.05, 0);

      setTimeout(() => {
        this.currentFile.pause();
        this.currentFile.currentTime = 0;
      }, 1000);
    }
  }

  changeVolume(speed, destination, count = 0)
  {
    if(count < Math.abs(10/speed))
    {
      count++;;

      try
      {
        this.volume += speed;
      } catch (e)
      {
        this.volume = 0;
      }

      if(speed > 0)
      {
        if(this.volume < destination)
        {
          window.requestAnimationFrame(() => {
            this.changeVolume(speed, destination, count);
          });
        }
      } else
      {
        if(this.volume > destination)
        {
          window.requestAnimationFrame(() => {
            this.changeVolume(speed, destination, count);
          });
        }
      }
    }
  }

  tick()
  {
    const music = this.currentFile;

    if(music.ended)
    {
      music.pause();
      music.currentTime = 0;

      if(this.loop) this.playMusic();
    }
  }
}
