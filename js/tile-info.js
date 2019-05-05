const _TILEINFO =
[
  {
    id: "BLOCK",
    img: [
      img.block,
      img.block_tl, img.block_tr, img.block_br, img.block_bl,
      img.block_t, img.block_r, img.block_b, img.block_l,
      img.block_round,
      img.block_grey
    ],
    solid: true,
    harmful: false
  },
  {
    id: "START",
    img: [img.null],
    solid: false,
    harmful: false
  },
  {
    id: "FINISH",
    img: [img.finish],
    solid: false,
    harmful: false
  },
  {
    id: "SPIKE",
    img: [img.spike_t, img.spike_b],
    solid: false,
    harmful: true
  },
  {
    id: "LAVA",
    img: [img.lava_t, img.lava_b],
    solid: false,
    harmful: true
  },
  {
    id: "GEM",
    img: [img.gem],
    solid: false,
    harmful: false
  },
  {
    id: "FLIPUP",
    img: [img.flip_up],
    solid: false,
    harmful: false
  },
  {
    id: "FLIPDOWN",
    img: [img.flip_down],
    solid: false,
    harmful: false
  },
  {
    id: "LOCKED",
    img: [img.locked],
    solid: true,
    harmful: false
  },
  {
    id: "KEY",
    img: [img.key],
    solid: false,
    harmful: false
  }
]
