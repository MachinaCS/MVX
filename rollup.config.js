import typescript from 'rollup-plugin-typescript2';
import obfuscator from 'rollup-plugin-obfuscator';

export default {
  input: './lib/mvx.ts',
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
      seed: 312,
      compact: true,
      simplify: true,
      renameProperties: true,
      deadCodeInjection: true,
      renamePropertiesMode: "safe",
      controlFlowFlattening: true,
      identifierNamesGenerator: "mangled-shuffled",
      deadCodeInjectionThreshold: 0.4,
    })
  ]
};
