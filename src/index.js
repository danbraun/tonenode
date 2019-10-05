import Synth from 'tone/Tone/instrument/MembraneSynth'
import MetalSynth from 'tone/Tone/instrument/MetalSynth'
import AMSynth from 'tone/Tone/instrument/AMSynth'
import FMSynth from 'tone/Tone/instrument/FMSynth'
import PluckSynth from 'tone/Tone/instrument/PluckSynth'
import Loop from 'tone/Tone/event/Loop'
import Transport from 'tone/Tone/core/Transport'
// import Tone from 'tone'
import { startButton, stopButton } from './component'

//create a synth and connect it to the master output (your speakers)
let synth = new Synth().toMaster()
let cymbalSynth = new MetalSynth({
    frequency: 250,
    envelope: {
        attack: 0.0001,
        decay: 0.1,
        release: 0.01,
    },
    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 8000,
    octaves: 1.5,
}).toMaster()

let amSynth = new AMSynth({
    harmonicity: 1.04, // 3/1 modulation/carrier
    detune: 0,
    oscillator: {
        type: 'sine',
    },
    envelope: {
        attack: 0.0001,
        decay: 0.01,
        sustain: 1,
        release: 0.5,
    },
    modulation: {
        type: 'square',
    },
    modulationEnvelope: {
        attack: 0.0005,
        decay: 0,
        sustain: 1,
        release: 0.5,
    },
}).toMaster()

let fmSynth = new FMSynth({
    harmonicity: 2/3,
    modulationIndex: 10,
    detune: 0,
    oscillator: {
        type: "sine",
    },
    envelope: {
        attack: 0.0001,
        decay: 0.01,
        sustain: 1,
        release: 0.5,
    },
    modulation: {
        type: "square",
    },
    modulationEnvelope: {
        attack: 0.0005,
        decay: 0,
        sustain: 1,
        release: 0.5,
    },
}).toMaster()

let pluckSynth = new PluckSynth().toMaster();

let counter = 0

const song = time => {
    if (counter % 4 === 0) {
        synth.triggerAttackRelease(30, '8n', time, 1)
    }
    if (counter % 4 !== 1) {
        if (counter % 3 === 0) {
            cymbalSynth.envelope.decay = 0.5
        } else {
            cymbalSynth.envelope.decay = 0.01
        }
        cymbalSynth.triggerAttackRelease('16n', time, 0.3)
    }
    counter = (counter + 1) % 16
    console.log('counter:', counter)

    if (counter === 0) {
        amSynth.triggerAttackRelease('A2', '16n', time, 1)
    }
    if (counter === 1) {
      fmSynth.triggerAttackRelease('A2', '16n', time, 1)
  }
    if (counter === 10) {
        amSynth.triggerAttackRelease('Bb1', '8n', time, 1)
    }
    if (counter === 11) {
        fmSynth.triggerAttackRelease('Bb1', '4n', time, 1)
    }
    if (counter%2 === 0) {
      pluckSynth.triggerAttackRelease('b6', '16n', time, 0.4);
    } else {
      pluckSynth.triggerAttackRelease('G#6', '16n', time, 0.4);
    }
}

let loopBeat = new Loop(song, '16n')

document.body.appendChild(
    startButton('Tonenode!', () => {
        Transport.start().bpm.value = 140
        loopBeat.start(0)
    })
)

document.body.appendChild(
    stopButton('STOP!', () => {
        Transport.stop()
    })
) 
