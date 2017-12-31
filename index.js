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
  let color = ledColor.rotate(offset);
  for (let i = 0; i < NUM_LEDS; i++) {
    pixelData[i] = color.rgbNumber();
  }

  console.log('Setting color: '+color.rgbNumber()+' offset: '+offset);

  ws281x.render(pixelData);

  // rotate
  offset += 10;
}, 500);
