import Synth from 'tone/Tone/instrument/Synth'
// import Tone from 'tone'
import component from "./component";

//create a synth and connect it to the master output (your speakers)
var synth = new Synth().toMaster();
// var synth = new Tone.Synth().toMaster();


document.body.appendChild(component("Tonenode!", () => {
  synth.triggerAttackRelease("c1", "8n");
}));