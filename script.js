const { gsap } = window;
const { timeline, to, set } = gsap;

const $RAIN = document.querySelector('.rain');
const $HEARTS = document.querySelector('.hearts');
const $FELIZ = document.querySelector('.feliz');
const $TQUIERO = document.querySelector('.tQuiero');
const $FELICIDAD = document.querySelector('.felicidad');
const $GRACIAS = document.querySelector('.gracias');
const $ROSA = document.querySelector('.rose');
const $backgroundMusic = document.querySelector('.backgroundMusic')
const $BEAR = document.querySelector('.care-bear');
const $BEAR_ARM_LEFT = document.querySelector('.care-bear__arm--left');
const $BEAR_ARM_RIGHT = document.querySelector('.care-bear__arm--right');
const $BEAR_EAR_LEFT = document.querySelector('.care-bear__ear--left');
const $BEAR_EAR_RIGHT = document.querySelector('.care-bear__ear--right');
const $BEAR_MOUTH = document.querySelector('.care-bear__mouth');
const $BEAR_NOSE = document.querySelector('.care-bear__nose');
const $BEAR_CHEEK_LEFT = document.querySelector('.care-bear__cheek--left');
const $BEAR_CHEEK_RIGHT = document.querySelector('.care-bear__cheek--right');
const $BEAR_EYE_LEFT = document.querySelector('.care-bear__eye--left');
const $BEAR_EYE_RIGHT = document.querySelector('.care-bear__eye--right');
const $BEAR_PUPIL_LEFT = document.querySelector('.care-bear__pupil--left');
const $BEAR_PUPIL_RIGHT = document.querySelector('.care-bear__pupil--right');
const $BEAR_BELLY = document.querySelector('.care-bear__belly');
const $BEAR_MUZZLE = document.querySelector('.care-bear__muzzle');
const $BEAR_HEART = document.querySelector('.care-bear__heart');

const SPEEDS = {
  BACKDROP: {
    SCALE: 0.25,
    SPIN: 0.85
  },

  BREATHING: 1.5,
  SWITCH: 0.05
};

const STATE = {
  FIRING: false,
  CLOSING: false
};


set(document.body, { opacity: 1 });

// Set bear to sulking
set($BEAR, { '--hue': Math.floor(Math.random() * 360), '--saturation': 0 });
set($BEAR_ARM_LEFT, {
  transformOrigin: '85% 80%',
  scale: 0.85,
  rotate: -110
});

set($BEAR_ARM_RIGHT, {
  transformOrigin: '15% 80%',
  scale: 0.85,
  rotate: 110
});

set($BEAR_EAR_LEFT, { transformOrigin: '70% 85%', rotate: -60 });
set($BEAR_EAR_RIGHT, { transformOrigin: '30% 85%', rotate: 60 });
set($BEAR_MOUTH, { transformOrigin: '50%, 0', scaleY: 0, y: '+=2' });
set($BEAR_NOSE, { transformOrigin: '50% 50%', y: '+=2' });
set($BEAR_BELLY, { transformOrigin: '50% 50%' });
set($BEAR_MUZZLE, { transformOrigin: '50% 50%' });
set($BEAR_HEART, { transformOrigin: '50% 50%' });
set([$BEAR_CHEEK_LEFT, $BEAR_CHEEK_RIGHT], {
  transformOrigin: '50% 50%',
  opacity: 0,
  y: '+=2'
});

set([$BEAR_EYE_LEFT, $BEAR_EYE_RIGHT], {
  transformOrigin: '50% 50%',
  y: '+=2',
  clipPath: 'inset(50% 0 0 0)'
});

set([$BEAR_PUPIL_LEFT, $BEAR_PUPIL_RIGHT], {
  transformOrigin: '50% 50%',
  z: 1,
  y: '+=1.25'
});

const HEART_SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.258088 6.7122535">
  <path d="M2.56864 1.32292c-.31816 0-.63626.12209-.88005.36587-.48757.48758-.48757 1.27253 0 1.7601l.18035.18035 1.7601 1.7601 1.7601-1.7601.18035-.18035c.48757-.48757.48757-1.27252 0-1.7601-.24379-.24378-.56189-.36587-.88005-.36587-.31815 0-.63626.12209-.88005.36587l-.18035.18035-.18035-.18035c-.24379-.24378-.5619-.36587-.88005-.36587z" fill="red"/>
</svg>
`;
const fireHearts = () => {
  const newHeart = document.createElement('div');
  newHeart.className = 'heart';
  newHeart.style.setProperty(
    '--size',
    Math.floor(Math.random() * 30 - 10 + 1) + 5);


  newHeart.style.setProperty('--hue', Math.floor(Math.random() * 360));
  newHeart.innerHTML = HEART_SVG;
  const svg = newHeart.querySelector('svg');
  $HEARTS.appendChild(newHeart);
  set(newHeart, { rotate: 'random(0, 360)', transformOrigin: '50% 50%' });
  to(svg, {
    y: '-100vmax',
    duration: 'random(0.5, 1.5)',
    onComplete: () => {
      newHeart.remove();
    }
  });

  if (STATE.FIRING && !STATE.CLOSING) {
    requestAnimationFrame(fireHearts);
  } else {
    $HEARTS.innerHTML = '';
  }
};

const RAISE_TL = new timeline().
  add(
    to([$BEAR_ARM_LEFT, $BEAR_ARM_RIGHT], {
      duration: SPEEDS.SWITCH,
      scale: 1,
      rotate: 0
    })).


  add(
    to([$BEAR_EAR_LEFT, $BEAR_EAR_RIGHT], {
      duration: SPEEDS.SWITCH,
      rotate: 0
    }),

    0).

  add(
    to($BEAR_HEART, {
      duration: SPEEDS.SWITCH,
      scale: 1.1
    }),

    0).

  add(to($BEAR_NOSE, { duration: SPEEDS.SWITCH, y: 0 }), 0).
  add(to($BEAR_MOUTH, { duration: SPEEDS.SWITCH, y: 0, scaleY: 1 })).
  add(
    to([$BEAR_CHEEK_LEFT, $BEAR_CHEEK_RIGHT], {
      duration: SPEEDS.SWITCH,
      opacity: 1,
      y: 0
    }),

    0).

  add(
    to([$BEAR_EYE_LEFT, $BEAR_EYE_RIGHT], {
      duration: SPEEDS.SWITCH,
      clipPath: 'inset(0 0 0 0)',
      y: 0
    }),

    0).

  add(
    to([$BEAR_PUPIL_LEFT, $BEAR_PUPIL_RIGHT], {
      duration: SPEEDS.SWITCH,
      y: 0
    }),

    0).

  add(to($BEAR_HEART, { duration: SPEEDS.SWITCH, '--saturation': 100 }), 0).
  add(to($BEAR, { duration: SPEEDS.SWITCH, '--saturation': 100 }), 0);
RAISE_TL.pause();

const BREATHING_TL = new timeline({ repeat: -1, yoyo: true }).
  add(to($BEAR_BELLY, { scale: 1.025, duration: SPEEDS.BREATHING })).
  add(to($BEAR_ARM_RIGHT, { rotate: 108, duration: SPEEDS.BREATHING }), 0).
  add(to($BEAR_ARM_LEFT, { rotate: -108, duration: SPEEDS.BREATHING }), 0).
  add(to($BEAR_NOSE, { y: '-=0.4', duration: SPEEDS.BREATHING }), 0).
  add(
    to([$BEAR_EYE_LEFT, $BEAR_EYE_RIGHT], {
      y: '-=0.4',
      duration: SPEEDS.BREATHING
    }),

    0).

  add(
    to([$BEAR_EAR_LEFT, $BEAR_EAR_RIGHT], {
      y: '-=0.4',
      duration: SPEEDS.BREATHING
    }),

    0).

  add(to($BEAR_MUZZLE, { y: '-=0.4', duration: SPEEDS.BREATHING }), 0);

let BLINKING_TL;
const blink = () => {
  const DELAY = Math.floor(Math.random() * 5 - 1 + 1) + 1;
  BLINKING_TL = new timeline().add(
    to([$BEAR_EYE_LEFT, $BEAR_EYE_RIGHT], {
      delay: DELAY,
      scaleY: 0,
      duration: SPEEDS.SWITCH,
      repeat: 1,
      yoyo: true,
      onComplete: blink
    }));


};
blink();

const MOUTH_TL = new timeline({ paused: true })
  .to($BEAR_MOUTH, { scaleY: 1, y: 0, duration: 0.2, ease: 'power1.inOut' })
  .to($BEAR_MOUTH, { scaleY: 0, y: '+=2', duration: 0.2, ease: 'power1.inOut' })
  .repeat(-1);

const start = () => {

  if (STATE.CLOSING) return;
  RAISE_TL.play();
  BREATHING_TL.pause();
  BLINKING_TL.pause();
  BLINKING_TL.seek(0);
  $backgroundMusic.play();
  anime({
    easing: 'easeInOutQuad',
    duration: 1500,
    complete: () => {
      MOUTH_TL.play();
      anime({
        targets: $FELIZ,
        easing: 'easeInOutQuad',
        duration: 1000,
        opacity: 1
      });
    }
  });
  anime({
    easing: 'linear',
    duration: 8000,
    complete: () => {
      anime({
        targets: $ROSA,
        easing: 'linear',
        duration: 10000,
        opacity: 1
      });
    }
  });
  anime({
    easing: 'easeInOutQuad',
    duration: 4000,
    complete: () => {
      anime({
        targets: $TQUIERO,
        easing: 'easeInOutQuad',
        duration: 2000,
        opacity: 1,
        complete: () => {
          anime({
            targets: $FELICIDAD,
            easing: 'easeInOutQuad',
            duration: 2000,
            opacity: 1,
            complete: () => {
              anime({
                targets: $GRACIAS,
                easing: 'easeInOutQuad',
                duration: 2000,
                opacity: 1
              });
            }
          });
        }
      });
      anime({
        targets: $BEAR,
        easing: 'easeInOutQuad',
        duration: 12000,
        marginTop: '500px',
        complete: () => {
          try {
            $RAIN.style.display = 'none';
          } catch (error) {
            set($BEAR, { '--hue': Math.floor(Math.random() * 360), '--saturation': 0, opacity: 1, marginTop: '500px' });
            fireHearts();
          }
        }
      });
    }
  });
  anime({
    easing: 'easeInOutQuad',
    duration: 28000,
    complete: () => {
      MOUTH_TL.pause();
    }
  });

};


$BEAR.addEventListener('mousedown', start);
$BEAR.addEventListener('touchstart', start);
