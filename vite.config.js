import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
export default {
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'FloorPlanLib',
      fileName: 'floor-plan-lib',
    },
    outDir: '../Client/wwwroot/floor-plan-lib',
  },
};
