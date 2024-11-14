// global.d.ts
interface EyeDropper {
    open(): Promise<{ sRGBHex: string }>;
  }
  
  interface Window {
    EyeDropper?: EyeDropper;
  }
  