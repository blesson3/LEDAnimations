const NUM_LEDS = 100;
const GPIO_PIN = 13;

let strip = require('rpi-ws281x-native');
strip.init(NUM_LEDS, { gpio: GPIO_PIN });

// Two red pixels
strip.render([ 0xff0000, 0xff0000 ]);
