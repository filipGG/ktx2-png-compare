import * as THREE from 'three';

export class PngMesh extends THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> {
  constructor(
    private readonly _imagePath: string,
    private readonly _imageBitmapLoader: THREE.ImageBitmapLoader,
  ) {
    super();

    this.setup();
  }

  private async setup() {
    this.visible = false;
    const bitmap = await this._imageBitmapLoader.loadAsync(this._imagePath);
    const texture = new THREE.CanvasTexture(bitmap);
    const { width, height } = texture.image;
    this.geometry = new THREE.PlaneGeometry(width, height);
    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      map: texture,
      transparent: true,
    });
  }
}
