import typescript from 'rollup-plugin-typescript2';
import obfuscator from 'rollup-plugin-obfuscator';

export default {
  input: './source/mvx.ts',
  output: {
    file: './dist/mvx.js',
    format: 'umd',
    name: 'MVX',
    sourcemap: false
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true
    }),
    obfuscator({
      compact: true,
      controlFlowFlattening: true,
      deadCodeInjection: true,
      stringArray: true,
      stringArrayThreshold: 0.75
    })
  ]
};
