import * as THREE from 'three';
import { KTX2Loader } from 'three/addons/loaders/KTX2Loader.js';

export class Ktx2Mesh extends THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> {
  constructor(
    private readonly _imagePath: string,
    private readonly _ktx2Loader: KTX2Loader,
  ) {
    super();

    this.setup();
  }

  private async setup() {
    this.visible = false;
    const texture = await this._ktx2Loader.loadAsync(this._imagePath);

    const { width, height } = texture.image;
    this.geometry = this.flipY(new THREE.PlaneGeometry(width, height));
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: texture,
      transparent: true,
    });
  }

  private flipY(geometry: THREE.PlaneGeometry) {
    const uv = geometry.attributes.uv;

    for (let i = 0; i < uv.count; i++) {
      uv.setY(i, 1 - uv.getY(i));
    }

    return geometry;
  }
}
