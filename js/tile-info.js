const _TILEINFO =
[
  {
    id: "BLOCK",
    img: [
      img.block,
      img.block_tl, img.block_tr, img.block_br, img.block_bl,
      img.block_t, img.block_r, img.block_b, img.block_l,
      img.block_round
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
    img: [img.spike_t, img.spike_r, img.spike_b, img.spike_l],
    solid: false,
    harmful: true
  }
]
