const pickHex = (color1, color2, weight) => {
  var w1 = weight
  var w2 = 1 - w1
  var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
      Math.round(color1[1] * w1 + color2[1] * w2),
      Math.round(color1[2] * w1 + color2[2] * w2)]
  return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
}

module.exports = {
  pickHex
}