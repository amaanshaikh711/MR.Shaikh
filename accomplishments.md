# Portfolio Optimization & Particle System Enhancements

## 1. Persistent Background Particle System (`DotField`)
- **Lifecycle Refactor:** Completely decoupled the `DotField` component from section-based mounting/unmounting. It now sits as a persistent, fixed layer behind the portfolio at `z-index: 0`.
- **Flicker & Disappearance Fixed:** Removed `IntersectionObserver` and `ResizeObserver` which were causing the particles to flash, disappear, and reset during ScrollTrigger events. 
- **Continuous RAF Loop:** Implemented a robust `requestAnimationFrame` loop that runs continuously without pausing or stuttering during scrolling, ensuring particles are always visible.
- **Deterministic Coordinate Math:** Replaced `Math.random()` in the grid generation with coordinate-based math so that when the window resizes, the dot phases don't shift or glitch.

## 2. Stacking Context & ScrollReveal Fixes
- **Transparent Sections:** Updated the outermost containers of the middle sections (`FeaturedProjects`, `ProjectArchive`, `ExperienceTimeline`, `TechUniverse`, `AboutSection`) to use `bg-transparent` instead of solid colors. This allows the persistent background layer to shine through correctly.
- **ScrollReveal Correction:** Moved `ScrollReveal` wrappers from the outermost section containers to the individual internal content blocks. This prevents the parent container's opacity animations from masking the `DotField` particles.

## 3. Premium Cursor Interaction Physics
- **Fluid & Smooth Physics (Lerp):** Upgraded the `DotField` mouse interaction by injecting per-particle linear interpolation (lerp) into the animation loop. The particles no longer snap instantly; they smoothly deform and settle back into place.
- **Stronger React Bits Feel:** Increased the influence parameters (`cursorRadius` to 260px, `bulgeStrength` to 55px) so the cursor physically pushes the dots away in a wide, noticeable area.
- **Touch-Device Optimization:** Added a media query check (`pointer: fine`) to prevent expensive mouse-tracking physics on mobile devices, ensuring performance remains high while keeping the base ambient wave effect.

## 4. Mobile Responsiveness & Build
- Verified the portfolio runs seamlessly on mobile device viewports with adapted scaling and layout adjustments.
- Confirmed a successful production build using `npm run build`.
