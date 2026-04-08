# Design System Strategy: Editorial Engineering

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Human Craftsman."** 

Unlike sterile, corporate engineering brands, this system balances technical precision with the warmth of a family-run business. We move beyond the "template" look by utilizing **intentional asymmetry**—offsetting headings and using generous, editorial-grade white space to frame content like a high-end architectural magazine. The experience should feel solid and trustworthy, yet approachable and bespoke. By layering warm-toned surfaces and using sophisticated typography scales, we transform a standard trade service into a premium engineering consultancy.

---

## 2. Colors: Tonal Depth & Soul
Our palette transitions from the authority of deep navy to the approachable warmth of sun-kissed neutrals.

*   **Primary (`#001e40`):** Use for "Anchors"—Hero backgrounds, primary navigation, and high-level structural elements. 
*   **Tertiary/Accent (`#ffba20`):** This is our "Focus Point." Use it sparingly for interactive highlights, key CTAs, or a single "brand line" to draw the eye.
*   **The Background (`#fef8f3`):** Notice this is not a stark white. This warm "linen" base prevents a sterile digital feel and creates a more inviting, domestic atmosphere.

### The "No-Line" Rule
**Designers are prohibited from using 1px solid borders for sectioning.** Structural boundaries must be defined solely through:
1.  **Background Color Shifts:** Moving from `surface` to `surface-container-low`.
2.  **Tonal Transitions:** Using padding and vertical space to let color blocks breathe.

### Surface Hierarchy & Nesting
Treat the UI as a series of stacked, physical layers. 
- Use `surface-container-low` for the main content area.
- Nest `surface-container-lowest` cards within that area to create a soft, natural "pop."
- This nesting creates depth without the visual clutter of lines or heavy shadows.

### Signature Textures
To add "soul," use a subtle linear gradient on main CTAs or Hero sections, transitioning from `primary` (`#001e40`) to `primary-container` (`#003366`). This mimic's the light catching a polished tool or a clean installation.

---

## 3. Typography: Authoritative & Approachable
We utilize **Manrope** for its unique geometric-meets-humanist qualities.

*   **Display (Editorial Force):** `display-lg` and `display-md` should be used with tight letter-spacing (-0.02em) to feel like a premium magazine masthead.
*   **Headlines (The Promise):** `headline-lg` is your workhorse for section titles. Pair these with `tertiary` accents for a signature look.
*   **Body (The Dialogue):** `body-lg` provides a comfortable reading experience. The generous x-height of Manrope ensures legibility even when talking about complex technical specifications.
*   **Labels (The Detail):** Use `label-md` in all-caps with increased letter-spacing (+0.05em) for small "over-titles" to add a layer of technical sophistication.

---

## 4. Elevation & Depth: Tonal Layering
We reject the standard "drop shadow" defaults. Hierarchy is achieved through material physics and light.

*   **The Layering Principle:** Stack `surface-container` tiers to create hierarchy. A `surface-container-highest` card on a `surface` background provides all the "lift" required.
*   **Ambient Shadows:** If a floating element (like a mobile FAB or a modal) is necessary, use a "Looming Shadow":
    - Blur: 32px to 64px.
    - Opacity: 4-6%.
    - Color: Use a tinted version of `on-surface` (`#1d1b19`) to ensure the shadow feels like a natural obstruction of light.
*   **Glassmorphism & Depth:** For navigation bars or floating tooltips, use `surface-variant` with a **20px backdrop-blur** and 80% opacity. This allows the warm background tones to bleed through, softening the UI.
*   **The Ghost Border:** If a boundary is vital for accessibility, use `outline-variant` at **15% opacity**. It should be felt, not seen.

---

## 5. Components: Precision Craft

### Buttons: The Weighted Action
- **Primary:** `primary` background with `on-primary` text. Use `ROUND_EIGHT` (0.5rem) corners. No border.
- **Secondary:** `surface-container-high` background. A subtle, tactile feel that invites a secondary click without competing with the main goal.
- **Interaction:** On hover, the button should slightly deepen in tone, never brighten.

### Cards & Lists: Editorial Grouping
- **No Dividers:** Prohibit the use of horizontal rules. Separate list items using `1.5rem` of vertical white space or by alternating background tones (`surface` to `surface-container-low`).
- **Cards:** Use `surface-container-lowest` for cards to make them feel like clean sheets of paper resting on a desk.

### Input Fields: Soft Utility
- Use a `surface-container-highest` background.
- Instead of a heavy border, use a 2px bottom-accent in `outline-variant` that transforms into `primary` on focus.
- Ensure `ROUND_EIGHT` is applied to the top corners for a "filed" look.

### Specialized Component: The "Trust Badge"
Given the father-son nature, create a signature "Badge" component using a `secondary-container` circular shape with a `tertiary` (yellow/orange) icon. This should be used near testimonials or "Years in Business" stats.

---

## 6. Do's and Don'ts

### Do
- **DO** use asymmetrical layouts where the heading is offset to the left and the body text is tucked into a narrower column on the right.
- **DO** use the `tertiary_fixed_dim` (#ffba20) for small, impactful moments like a "Request Quote" button or an active state icon.
- **DO** embrace "breathing room." If you think there is enough padding, add 16px more.

### Don'ts
- **DON'T** use 100% black. Use `on-background` (`#1d1b19`) for text to maintain the "warm engineering" feel.
- **DON'T** use sharp 90-degree corners. Everything must feel handled and "honed" using the `ROUND_EIGHT` (0.5rem) standard.
- **DON'T** use generic icon sets. Select icons with a medium stroke weight (1.5px to 2px) that match the geometry of Manrope.