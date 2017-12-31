const NUM_LEDS = 100;
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

const ledColor = Color.rgb(255, 255, 255)

// ---- animation-loop
setInterval(function () {
  for (let i = 0; i < NUM_LEDS; i++) {
    pixelData[i] = ledColor.rgbNumber();
  }

  console.log('Setting color: '+ledColor.rgbNumber());

  ws281x.render(pixelData);
}, 500);
