# Rafter J Construction — Color Selection Sheets

Simple, mobile-friendly websites where your customers pick their metal
building's roof, wall, trim, and soffit colors and send their choices
straight to your email. No accounts, no apps, nothing for the customer
to install.

Built to be easy for anyone to use, including customers who aren't
comfortable with computers: one big decision per screen, huge buttons,
a progress bar, a signature line, and a review page before anything is sent.

This repo currently has two selection sites, one per metal supplier:

- **`/` (root)** — Mueller colors: `https://mkenziebrook-boop.github.io/RafterJ/`
- **`/strongtower/`** — Strong Tower colors: `https://mkenziebrook-boop.github.io/RafterJ/strongtower/`

Both work exactly the same way and share the same look — see
**"Adding another supplier"** at the bottom to create more.

## 1. One-time setup: connect your email (5 minutes)

The form uses a free service called **Web3Forms** to deliver submissions
to your inbox. This is already done for both sites in this repo (they
share one access key, so everything lands in the same inbox), but here's
how it works in case you ever need to redo it or point a site at a
different inbox:

1. Go to **https://web3forms.com**
2. Enter the email address where you want selections delivered, and click
   **Create Access Key**.
3. Check that inbox for a confirmation email from Web3Forms and confirm it.
4. Copy the **Access Key** it gives you (a long string of letters/numbers).
5. Open that site's `script.js` (e.g. `script.js` for the root site,
   `strongtower/script.js` for Strong Tower), find this line near the top:

   ```js
   const WEB3FORMS_ACCESS_KEY = "REPLACE_WITH_YOUR_WEB3FORMS_KEY";
   ```

   and replace the placeholder text with your key, keeping the quotes:

   ```js
   const WEB3FORMS_ACCESS_KEY = "abcd1234-your-real-key-here";
   ```

6. Save the file and publish the site (see below).

If a site's key is ever unset or wrong, the site still works end-to-end,
but instead of sending an email it shows the customer a friendly message
asking them to call you instead — so nothing breaks silently.

## 2. Publish it for free with GitHub Pages

1. Push this project to a GitHub repository (already done if you're reading
   this from the repo).
2. On GitHub, go to **Settings → Pages** (left sidebar, under "Code and
   automation").
3. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   pick the branch this code is on (currently
   `claude/metal-building-color-selector-kh44a3` — there's no `main` branch
   yet) and the `/ (root)` folder, then **Save**.
4. After a minute or two, refresh that same Settings → Pages screen — it
   will show your live link near the top, something like:
   `https://mkenziebrook-boop.github.io/RafterJ/`
5. Every subfolder in the repo (like `/strongtower/`) is automatically
   live at that same link plus the folder name — no extra setup needed
   per site.
6. Text or email the relevant link to customers depending on which
   supplier's panels that job is using.

## 3. Customize a site

Each site has its own `index.html` / `styles.css` / `script.js` — edit
the ones inside `strongtower/` to change that site, or the ones in the
repo root to change the Mueller site.

- **Colors offered**: edit the color list near the top of `script.js`
  (`MUELLER_COLORS` at the root, `STRONGTOWER_COLORS` in `strongtower/`).
  Each entry is `{ name, hex, line }`. Add, remove, or re-hex any color —
  every step on the site reads from this one list.
- **What customers select**: edit the `COLOR_STEPS` list in `script.js`
  to add/remove/rename steps (currently Roof, Walls, Trim, Soffit).
- **Logo**: `rjc_logowhite-145w.webp` is your real logo file (copied into
  each site's folder). Swap the file to update it everywhere it's used,
  or edit the `src="rjc_logowhite-145w.webp"` on the `<img class="logo-mark">`
  tag in `index.html` to point somewhere else. `.logo-mark` in `styles.css`
  controls its display size.
- **Brand colors**: the tan/brown header, brick-red buttons, and green
  accents are set as CSS variables at the top of `styles.css` (`:root`).
- **Disclaimer wording**: each `script.js` has a `..._DISCLAIMER_LEAD` and
  `..._DISCLAIMER_NOTE` constant near the top — edit the text there.
- **Phone number**: search for `361) 576-3825` and `13615763825` in
  `index.html` and `script.js` if it ever changes.

## 4. What the customer sees

1. **Your Info** — name, phone, email (at least one of phone/email required)
2. **Roof Color** → **Wall Color** → **Trim Color** → **Soffit Color** —
   one big swatch grid per step, tap to select, with tabs to switch between
   color lines, plus a disclaimer that screen colors can differ from the
   actual painted panel
3. **Review** — a summary of everything with "Edit" links to jump back and
   change any answer, plus a typed signature and confirmation checkbox
4. **Send My Selections** — submits and shows a confirmation screen the
   customer can print or save for their own records

## Adding another supplier

To add a selection site for a new metal supplier/color chart (the same
way `strongtower/` was added):

1. Make a new folder in the repo root, e.g. `newsupplier/`.
2. Copy `index.html`, `styles.css`, `script.js`, and
   `rjc_logowhite-145w.webp` from `strongtower/` into it (it's a closer
   starting point than the root site since it has no special tabs setup
   beyond Standard/Premium).
3. In the new `script.js`:
   - Replace the color list (`STRONGTOWER_COLORS`) with the new
     supplier's colors — `{ name, hex, line }` per color. If you have a
     PDF/image color chart, send it over and the exact colors can be
     sampled from it directly, the same way Mueller's and Strong Tower's
     were.
   - Update `COLOR_LINES` if the new chart's categories differ from
     Standard/Premium (or delete the tabs entirely if there's only one
     list of colors).
   - Update the `..._DISCLAIMER_LEAD` / `..._DISCLAIMER_NOTE` text to
     name the new supplier.
4. In the new `index.html`, update the `<title>`, `<meta description>`,
   and the `<h1>` / intro `<p>` text in the header to name the new
   supplier.
5. Publish (see step 2 above) — it'll be live at
   `https://mkenziebrook-boop.github.io/RafterJ/newsupplier/` with no
   extra Pages configuration needed.

## Files

Repeated per site (root = Mueller, `strongtower/` = Strong Tower):

- `index.html` — page structure
- `styles.css` — all styling (edit brand colors here)
- `script.js` — color list, form steps, and submit logic (edit here)
- `rjc_logowhite-145w.webp` — the Rafter J logo
