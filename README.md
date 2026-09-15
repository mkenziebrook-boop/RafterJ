# Rafter J Construction — Color Selection Sheet

A simple, mobile-friendly website where your customers pick their metal
building's roof, wall, trim, and soffit colors (from Mueller's official
Signature 200 / Signature 300 color chart) and send their choices straight
to your email. No accounts, no apps, nothing for the customer to install.

Built to be easy for anyone to use, including customers who aren't
comfortable with computers: one big decision per screen, huge buttons,
a progress bar, and a review page before anything is sent.

## 1. One-time setup: connect your email (5 minutes)

The form uses a free service called **Web3Forms** to deliver submissions
to your inbox. You only have to do this once.

1. Go to **https://web3forms.com**
2. Enter the email address where you want selections delivered, and click
   **Create Access Key**.
3. Check that inbox for a confirmation email from Web3Forms and confirm it.
4. Copy the **Access Key** it gives you (a long string of letters/numbers).
5. Open the file `script.js` in this project, find this line near the top:

   ```js
   const WEB3FORMS_ACCESS_KEY = "REPLACE_WITH_YOUR_WEB3FORMS_KEY";
   ```

   and replace the placeholder text with your key, keeping the quotes:

   ```js
   const WEB3FORMS_ACCESS_KEY = "abcd1234-your-real-key-here";
   ```

6. Save the file and publish the site (see below).

Until you do this, the site will still work end-to-end, but instead of
sending an email it will show the customer a friendly message asking them
to call you instead — so nothing breaks if you forget this step.

## 2. Publish it for free with GitHub Pages

1. Push this project to a GitHub repository (already done if you're reading
   this from the repo).
2. On GitHub, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to `Deploy from a branch`,
   pick the `main` branch and the `/ (root)` folder, then **Save**.
4. After a minute or two, GitHub will give you a link like:
   `https://yourusername.github.io/RafterJ/`
5. That's the link you text or email to customers.

## 3. Customize it

- **Colors offered**: edit the `MUELLER_COLORS` list near the top of
  `script.js`. Each entry is `{ name, hex, line }`. Add, remove, or
  re-hex any color — every step on the site reads from this one list.
  The colors currently in the list were sampled directly from Mueller's
  official *Mueller Panel Color Chart* (Signature 200 and Signature 300).
- **What customers select**: edit the `COLOR_STEPS` list in `script.js`
  to add/remove/rename steps (currently Roof, Walls, Trim, Soffit).
- **Logo**: the header currently shows a simple circular text badge built
  in CSS (`.logo-badge` in `styles.css` / `index.html`) so the site works
  without any image files. To use your real logo instead, drop an image
  file (e.g. `logo.png`) into this folder and swap the `.logo-badge` div
  in `index.html` for `<img src="logo.png" alt="Rafter J Construction">`.
- **Brand colors**: the tan/brown header, brick-red buttons, and green
  accents are set as CSS variables at the top of `styles.css` (`:root`).
  Change the hex values there to match your site exactly once you send
  over your logo/brand colors.
- **Phone number**: search for `361) 576-3825` and `13615763825` in
  `index.html` and `script.js` if it ever changes.

## 4. What the customer sees

1. **Your Info** — name, phone, email (at least one of phone/email required)
2. **Roof Color** → **Wall Color** → **Trim Color** → **Soffit Color** —
   one big swatch grid per step, tap to select, with tabs to switch between
   the Signature 200 and Signature 300 color lines
3. **Review** — a summary of everything with "Edit" links to jump back and
   change any answer
4. **Send My Selections** — submits and shows a confirmation screen the
   customer can print or save for their own records

## Files

- `index.html` — page structure
- `styles.css` — all styling (edit brand colors here)
- `script.js` — color list, form steps, and submit logic (edit here)
