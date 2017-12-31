const NUM_LEDS = 10;
// const GPIO_PIN = 13;

const parseRGB = require("pure-color/parse");
const hsl2rgb = require("pure-color/convert/hsl2rgb");
const rgb2hex = require("pure-color/convert/rgb2hex");

let ws281x = require('rpi-ws281x-native');
ws281x.init(NUM_LEDS);

const pixelData = new Uint32Array(NUM_LEDS);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});

let hue = 0;

// ---- animation-loop
setInterval(function () {
  let color = rgb2hex(hsl2rgb([hue, 360, 180]));
  let rgbNumber = parseInt(color.slice(1), 16);
  for (let i = 0; i < NUM_LEDS; i++) {
    pixelData[i] = rgbNumber;
  }

  console.log('Setting color: '+rgbNumber+' hue: '+hue+' color: '+color);

  ws281x.render(pixelData);

  // rotate
  hue += 10;
  hue = hue % 361;
}, 50);
