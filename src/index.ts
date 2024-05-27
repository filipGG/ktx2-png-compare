import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { Viewer } from './viewer';

const viewer = new Viewer();

const panel = new GUI();

const settings = {
  'show png': () => {
    console.log('SHOW PNG');
    viewer.showPNG();
  },
  'show ktx2': () => {
    console.log('SHOW KTX2');
    viewer.showKTX2();
  },
};

panel.add(settings, 'show png');
panel.add(settings, 'show ktx2');

viewer.showPNG();
