import * as THREE from 'three';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { Ktx2Mesh } from './ktx2-mesh';
import { PngMesh } from './png-mesh';

export class Viewer {
  private readonly _renderer = new THREE.WebGLRenderer({ antialias: false });
  private readonly _scene = new THREE.Scene();
  private readonly _camera = new THREE.PerspectiveCamera();

  private readonly _imageBitmapLoader = new THREE.ImageBitmapLoader();
  private readonly _ktx2Loader = new KTX2Loader().setTranscoderPath('libs/').detectSupport(this._renderer);

  private readonly _ktx2Mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private readonly _pngMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;

  constructor() {
    this._scene.background = new THREE.Color(0xffffff);
    this._imageBitmapLoader.setOptions({ imageOrientation: 'flipY' });
    this.configureRenderer();
    this.configureCamera();
    //const controls = new OrbitControls(this._camera, this._renderer.domElement);

    //this._ktx2Mesh = new Ktx2Mesh('assets/A-plan1.ktx2', this._ktx2Loader);
    this._ktx2Mesh = new Ktx2Mesh('assets/small-test.ktx2', this._ktx2Loader);
    this._scene.add(this._ktx2Mesh);

    //this._pngMesh = new PngMesh('assets/test.png', this._imageBitmapLoader);
    this._pngMesh = new PngMesh('assets/small-test.png', this._imageBitmapLoader);
    this._scene.add(this._pngMesh);

    const animate = () => {
      requestAnimationFrame(animate);
      //controls.update();
      this._renderer.render(this._scene, this._camera);
    };

    animate();
  }

  public showKTX2() {
    this._pngMesh.visible = false;
    this._ktx2Mesh.visible = true;
  }

  public showPNG() {
    this._ktx2Mesh.visible = false;
    this._pngMesh.visible = true;
  }

  private configureRenderer() {
    const { innerWidth, innerHeight } = window;
    this._renderer.setPixelRatio(window.devicePixelRatio);
    this._renderer.setSize(innerWidth, innerHeight);
    const parent = document.getElementById('app');

    if (!parent) {
      throw new Error('Parent not found');
    }

    parent.appendChild(this._renderer.domElement);
  }

  private configureCamera() {
    this._camera.fov = 60;

    const { innerWidth, innerHeight } = window;
    this._camera.aspect = innerWidth / innerHeight;
    this._camera.near = 0.1;
    this._camera.far = 1_000_000;
    this._camera.position.set(0, 0, 200);

    this._camera.updateProjectionMatrix();

    this._scene.add(this._camera);
  }
}
