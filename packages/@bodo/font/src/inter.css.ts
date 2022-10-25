import { globalFontFace } from '@vanilla-extract/css';

export const interFontFamily = 'inter var';

globalFontFace(interFontFamily, {
  fontWeight: '100 900',
  fontDisplay: 'swap',
  fontStyle: 'normal',
  src: `url('../font/inter-roman.var.woff2') format('woff2')`,
});

globalFontFace(interFontFamily, {
  fontWeight: '100 900',
  fontDisplay: 'swap',
  fontStyle: 'italic',
  src: `url('../font/inter-italic.var.woff2') format('woff2')`,
});
