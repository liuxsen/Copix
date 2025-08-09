// uno.config.ts
import { defineConfig } from 'unocss'

export default defineConfig({
  presets: [],
  rules: [
    [/^m-(\d+)$/, ([, d]) => ({ margin: `${+d}px` })],
    [/^ml-(\d+)$/, ([, d]) => ({ 'margin-left': `${d}px` })],
    [/^mr-(\d+)$/, ([, d]) => ({ 'margin-right': `${d}px` })],
    [/^mb-(\d+)$/, ([, d]) => ({ 'margin-bottom': `${d}px` })],
    [/^mt-(\d+)$/, ([, d]) => ({ 'margin-top': `${d}px` })],

    [/^-m-(\d+)$/, ([, d]) => ({ margin: `-${+d}px` })],
    [/^-ml-(\d+)$/, ([, d]) => ({ 'margin-left': `-${d}px` })],
    [/^-mr-(\d+)$/, ([, d]) => ({ 'margin-right': `-${d}px` })],
    [/^-mb-(\d+)$/, ([, d]) => ({ 'margin-bottom': `-${d}px` })],
    [/^-mt-(\d+)$/, ([, d]) => ({ 'margin-top': `-${d}px` })],

    [/^p-(\d+)$/, ([, d]) => ({ padding: `${d}px` })],
    [/^pl-(\d+)$/, ([, d]) => ({ 'padding-left': `${d}px` })],
    [/^pr-(\d+)$/, ([, d]) => ({ 'padding-right': `${d}px` })],
    [/^pt-(\d+)$/, ([, d]) => ({ 'padding-top': `${d}px` })],
    [/^pb-(\d+)$/, ([, d]) => ({ 'padding-bottom': `${d}px` })],
    [/^br-(\d+)$/, ([, d]) => ({ 'border-radius': `${d}px` })],
    [
      /^px-(\d+)$/,
      ([, d]) => ({ 'padding-left': `${d}px`, 'padding-right': `${d}px` }),
    ],
    [/^h-(\d+)$/, ([, d]) => ({ height: `${d}px` })],
    [/^lh-(\d+)$/, ([, d]) => ({ 'line-height': `${d}px` })],
    [/^w-(\d+)$/, ([, d]) => ({ width: `${d}px` })],

    [/^hp-(\d+)$/, ([, d]) => ({ height: `${d}%` })],
    [/^wp-(\d+)$/, ([, d]) => ({ width: `${d}%` })],

    [/^fs-(\d+)$/, ([, d]) => ({ 'font-size': `${d}px` })],
    [/^l-(\d+)$/, ([, d]) => ({ left: `${d}px` })],
    [/^t-(\d+)$/, ([, d]) => ({ top: `${d}px` })],
    [/^r-(\d+)$/, ([, d]) => ({ right: `${d}px` })],
    [/^b-(\d+)$/, ([, d]) => ({ bottom: `${d}px` })],
    [/^-l-(\d+)$/, ([, d]) => ({ left: `-${d}px` })],
    [/^-t-(\d+)$/, ([, d]) => ({ top: `-${d}px` })],
    [/^-r-(\d+)$/, ([, d]) => ({ right: `-${d}px` })],
    [/^-b-(\d+)$/, ([, d]) => ({ bottom: `-${d}px` })],

    [/^gap-(\d+)$/, ([, d]) => ({ gap: `${d}px` })],
  ],
})
