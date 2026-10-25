import { useEffect, useRef } from 'react'

// Harvard crimson (#A51C30) shades, darkest to lightest.
const PALETTE = ['#2e060c', '#4f0b16', '#7a1424', '#a51c30', '#b9343f']
// Only snow caps can reach this one, so the peaks catch the light.
const SNOW = '#d9676b'

// 4x4 ordered-dither (Bayer) matrix — the classic early-computer look.
const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => v / 16 - 0.5)

const PIXEL = 6 // screen px per pattern pixel
const FPS = 12 // stepped on purpose, like old hardware
const SPEED = 0.5 // slow, calm drift

// Packs a hex color into one Uint32 pixel (little-endian RGBA, opaque).
// A sharp-peaked wave: 1 at the peaks. Squaring narrows the peaks into points.
const ridge = (t) => (1 - Math.abs(Math.sin(t))) ** 2

// Static Himalaya-style backdrop, as a brightness offset per pattern pixel.
// Positions are fractions of the canvas height; x is scaled to a fixed
// reference width so peaks keep their shape on any screen size.
function buildMountains(w, h) {
  const out = new Float32Array(w * h)
  for (let x = 0; x < w; x++) {
    const u = x / 240
    // Far range: tall, jagged, three octaves of ridged peaks.
    const far =
      h * (0.86 - 0.15 * ridge(u * 7.3 + 1.1) - 0.07 * ridge(u * 17.9 + 0.4) - 0.03 * ridge(u * 41 + 2) - 0.03 * Math.sin(u * 3.1 + 0.6))
    // Near range: lower, rounder, in front.
    const near = h * (0.95 - 0.08 * ridge(u * 5.1 + 3.2) - 0.04 * ridge(u * 13.7 + 1.9) - 0.015 * ridge(u * 37 + 0.7))
    // Snow sits on anything taller than a slightly ragged snowline.
    const snowline = h * (0.75 + 0.012 * Math.sin(u * 61) + 0.008 * Math.sin(u * 23 + 1))
    for (let y = Math.max(0, Math.floor(far)); y < h; y++) {
      let o = y < snowline ? 0.08 : -0.075
      if (y >= near) o = -0.125
      out[y * w + x] = o
    }
  }
  return out
}

function pack(hex) {
  const n = parseInt(hex.slice(1), 16)
  return (255 << 24) | ((n & 255) << 16) | (((n >> 8) & 255) << 8) | ((n >> 16) & 255)
}

export default function PixelBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d', { alpha: false })
    const colors = Uint32Array.from([...PALETTE, SNOW], pack)
    const top = PALETTE.length - 1
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let w, h, img, px, radial, mountains, colX, rowY, diag
    let raf = 0
    let last = 0
    let visible = true

    function resize() {
      w = Math.max(1, Math.ceil(canvas.clientWidth / PIXEL))
      h = Math.max(1, Math.ceil(canvas.clientHeight / PIXEL))
      canvas.width = w
      canvas.height = h
      img = ctx.createImageData(w, h)
      px = new Uint32Array(img.data.buffer)
      colX = new Float32Array(w)
      rowY = new Float32Array(h)
      diag = new Float32Array(w + h)
      // Distance from center never changes between frames, so compute it once.
      radial = new Float32Array(w * h)
      for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) radial[y * w + x] = Math.hypot(x - w / 2, y - h / 2) * 0.05
      mountains = buildMountains(w, h)
    }

    // Slow-drifting plasma. The three straight waves only depend on x, y, or
    // x+y, so they're tabulated per frame; only the ring needs a per-pixel sin.
    function draw(t) {
      for (let x = 0; x < w; x++) colX[x] = Math.sin(x * 0.045 + t * 0.6)
      for (let y = 0; y < h; y++) rowY[y] = Math.sin(y * 0.06 - t * 0.4)
      for (let k = 0; k < w + h; k++) diag[k] = Math.sin(k * 0.03 + t * 0.3)
      const ring = t * 0.8

      for (let y = 0, i = 0; y < h; y++) {
        const row = rowY[y]
        const bayerRow = (y & 3) * 4
        for (let x = 0; x < w; x++, i++) {
          const v = (colX[x] + row + diag[x + y] + Math.sin(radial[i] - ring)) / 8 + 0.5 + mountains[i]
          const level = Math.round(v * top + BAYER[bayerRow + (x & 3)])
          const max = mountains[i] > 0 ? top + 1 : top
          px[i] = colors[level < 0 ? 0 : level > max ? max : level]
        }
      }
      ctx.putImageData(img, 0, 0)
    }

    function loop(now) {
      raf = requestAnimationFrame(loop)
      if (now - last < 1000 / FPS) return
      last = now
      draw((now / 1000) * SPEED)
    }

    function start() {
      if (!reduced && visible && !raf) raf = requestAnimationFrame(loop)
    }

    function stop() {
      cancelAnimationFrame(raf)
      raf = 0
    }

    resize()
    draw(0)
    start()

    const resizeObserver = new ResizeObserver(() => {
      resize()
      draw((last / 1000) * SPEED)
    })
    resizeObserver.observe(canvas)

    // Stop animating once the hero is scrolled out of view.
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
      else stop()
    })
    io.observe(canvas)

    return () => {
      stop()
      resizeObserver.disconnect()
      io.disconnect()
    }
  }, [])

  return (
    <div aria-hidden="true" className="vignette pointer-events-none absolute inset-0">
      <canvas ref={ref} className="h-full w-full [image-rendering:pixelated] [will-change:transform]" />
    </div>
  )
}
