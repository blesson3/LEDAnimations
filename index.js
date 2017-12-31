const NUM_LEDS = 10;
// const GPIO_PIN = 13;

const Color = require('color');

let ws281x = require('rpi-ws281x-native');
ws281x.init(NUM_LEDS);

const pixelData = new Uint32Array(NUM_LEDS);

// ---- trap the SIGINT and reset before exit
process.on('SIGINT', function () {
  ws281x.reset();
  process.nextTick(function () { process.exit(0); });
});

let ledColor = Color.rgb(80, 80, 80)

// ---- animation-loop
let offset = 1;
setInterval(function () {
  for (let i = 0; i < NUM_LEDS; i++) {
    pixelData[i] = ledColor.rgbNumber();
  }

  console.log('Setting color: '+ledColor.rgbNumber());

  ws281x.render(pixelData);

  // rotate
  ledColor = ledColor.rotate(offset);
  offset += 1;
}, 500);
