/* =======================================================================
   Rafter J Construction — Color Selection Sheet
   =======================================================================
   SETUP REQUIRED before this form can email you selections:
   1. Go to https://web3forms.com, enter the email you want selections
      sent to, and copy the Access Key it gives you (free, no account
      needed).
   2. Paste that key below in place of "REPLACE_WITH_YOUR_WEB3FORMS_KEY".
   See README.md for full step-by-step instructions.
   ======================================================================= */
const WEB3FORMS_ACCESS_KEY = "b04a8faf-0c65-41f8-8bd7-c8f66238788c";

/* Colors sampled directly from Mueller, Inc.'s official 2026 "Mueller
   Panel Color Chart" (Signature 200 and Signature 300 lines). Swap or
   extend this list any time — every step on the site reads from it. */
const MUELLER_COLORS = [
  // Signature 200 — Silicone Modified Polyester
  { name: "Polar White", hex: "#f7fafb", line: "Signature 200" },
  { name: "High Gloss White", hex: "#ffffff", line: "Signature 200" },
  { name: "White", hex: "#fbfbf7", line: "Signature 200" },
  { name: "Bright White", hex: "#fbfbf7", line: "Signature 200" },
  { name: "Hawaiian Blue", hex: "#496d83", line: "Signature 200" },
  { name: "Cobalt Blue", hex: "#26446a", line: "Signature 200" },
  { name: "Light Stone", hex: "#dbcbb3", line: "Signature 200" },
  { name: "Saddle Tan", hex: "#b59480", line: "Signature 200" },
  { name: "Desert Sand", hex: "#9f9181", line: "Signature 200" },
  { name: "Coffee Brown", hex: "#4f3936", line: "Signature 200" },
  { name: "Burnished Slate", hex: "#504541", line: "Signature 200" },
  { name: "Ash Gray", hex: "#cbc6bf", line: "Signature 200" },
  { name: "Deep Gray", hex: "#4a4d56", line: "Signature 200" },
  { name: "Charcoal Gray", hex: "#615b5d", line: "Signature 200" },
  { name: "Evergreen", hex: "#324b40", line: "Signature 200" },
  { name: "Ivy Green", hex: "#1a4339", line: "Signature 200" },
  { name: "Scarlet Red", hex: "#a12324", line: "Signature 200" },
  { name: "Rustic Red", hex: "#873f39", line: "Signature 200" },
  { name: "Wine Red", hex: "#4e2d30", line: "Signature 200" },
  { name: "True Black", hex: "#100f0f", line: "Signature 200" },
  { name: "Matte Black", hex: "#26262a", line: "Signature 200" },
  { name: "Smokey Pewter", hex: "#8c8487", line: "Signature 200" },
  { name: "Dark Charcoal", hex: "#4c4949", line: "Signature 200" },
  { name: "Dark Bronze", hex: "#3a3232", line: "Signature 200" },
  { name: "Orange", hex: "#f36c23", line: "Signature 200" },
  // Signature 300 — Polyvinylidene Fluoride (PVDF), Low Gloss
  { name: "Snow White", hex: "#ebeced", line: "Signature 300" },
  { name: "Bone White", hex: "#ddddd7", line: "Signature 300" },
  { name: "Pacific Blue", hex: "#385a6b", line: "Signature 300" },
  { name: "Harbor Blue", hex: "#1c4c61", line: "Signature 300" },
  { name: "Almond", hex: "#d0c7b4", line: "Signature 300" },
  { name: "Brownstone", hex: "#a4927e", line: "Signature 300" },
  { name: "Medium Bronze", hex: "#544a40", line: "Signature 300" },
  { name: "Midnight Bronze", hex: "#3f3b38", line: "Signature 300" },
  { name: "Tundra", hex: "#989796", line: "Signature 300" },
  { name: "Slate Gray", hex: "#777571", line: "Signature 300" },
  { name: "Storm Gray", hex: "#505356", line: "Signature 300" },
  { name: "Classic Green", hex: "#30493c", line: "Signature 300" },
  { name: "Brite Red", hex: "#ac202a", line: "Signature 300" },
  { name: "Colonial Red", hex: "#6b3a33", line: "Signature 300" },
  { name: "Midnight Black", hex: "#1f2122", line: "Signature 300" },
  { name: "Copper Metallic", hex: "#9f6241", line: "Signature 300" },
  { name: "Silver Metallic", hex: "#ccd0d7", line: "Signature 300" },
];

const COLOR_LINES = ["Signature 200", "Signature 300"];

const COLOR_STEPS = [
  {
    key: "roof",
    title: "Roof Color",
    intro: "Tap the roof color you'd like. This is usually the color people notice first.",
  },
  {
    key: "walls",
    title: "Wall Color",
    intro: "Now choose the main color for the walls (siding) of your building.",
  },
  {
    key: "trim",
    title: "Trim Color",
    intro: "Trim is the color used around corners, edges, and openings. It's often a contrasting color.",
  },
  {
    key: "soffit",
    title: "Soffit Color",
    intro: "Soffit is the underside of the roof overhang. Many customers match this to the trim or walls. This one is optional — skip it if you're not sure.",
    optional: true,
  },
];

const MUELLER_DISCLAIMER_LEAD = "These colors are from Mueller's official Signature 200 / Signature 300 panel color chart.";
const MUELLER_DISCLAIMER_NOTE =
  "Colors shown here are a digital representation only. Screen displays and lighting conditions can render colors differently than the actual painted metal panel. Final color selections should be verified against a physical Mueller color chip prior to placing your order.";

function buildDisclaimer() {
  return el("p", { class: "disclaimer" }, [
    MUELLER_DISCLAIMER_LEAD + " ",
    el("strong", {}, "Please note: "),
    MUELLER_DISCLAIMER_NOTE,
  ]);
}

const TOTAL_STEPS = 3 + COLOR_STEPS.length; // info + color steps + review + success

const state = {
  name: "",
  phone: "",
  email: "",
  selections: { roof: null, walls: null, trim: null, soffit: null },
  filters: { roof: "Signature 200", walls: "Signature 200", trim: "Signature 200", soffit: "Signature 200" },
  signature: "",
  signatureAgreed: false,
  submitting: false,
};

let currentStep = 1; // 1-indexed

const wizardEl = document.getElementById("wizard");
const progressFill = document.getElementById("progressFill");
const progressLabel = document.getElementById("progressLabel");
const progressWrap = document.getElementById("progressWrap");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");
const bottomNav = document.getElementById("bottomNav");

function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([key, val]) => {
    if (key === "class") node.className = val;
    else if (key === "html") node.innerHTML = val;
    else if (key.startsWith("on") && typeof val === "function") node.addEventListener(key.slice(2), val);
    else node.setAttribute(key, val);
  });
  (Array.isArray(children) ? children : [children]).forEach((child) => {
    if (child == null) return;
    node.appendChild(typeof child === "string" ? document.createTextNode(child) : child);
  });
  return node;
}

/* ---------------- Step 1: Info ---------------- */
function buildInfoStep() {
  const section = el("section", { class: "step", "data-step": "1" });
  section.append(
    el("h2", { class: "step__title" }, "Let's Start With Your Info"),
    el("p", { class: "step__intro" }, "So we know whose selections these are. We need your name and at least one way to reach you.")
  );

  const nameField = el("div", { class: "field", id: "field-name" }, [
    el("label", { for: "input-name" }, "Your Name"),
    el("input", {
      type: "text",
      id: "input-name",
      autocomplete: "name",
      placeholder: "e.g. John Smith",
      value: state.name,
      oninput: (e) => { state.name = e.target.value; clearError("field-name"); updateNavState(); },
    }),
    el("p", { class: "field-error" }, "Please enter your name."),
  ]);

  const phoneField = el("div", { class: "field", id: "field-phone" }, [
    el("label", { for: "input-phone" }, "Phone Number"),
    el("input", {
      type: "tel",
      id: "input-phone",
      autocomplete: "tel",
      placeholder: "e.g. (361) 555-1234",
      value: state.phone,
      oninput: (e) => { state.phone = e.target.value; clearError("field-email"); updateNavState(); },
    }),
  ]);

  const emailField = el("div", { class: "field", id: "field-email" }, [
    el("label", { for: "input-email" }, "Email Address"),
    el("input", {
      type: "email",
      id: "input-email",
      autocomplete: "email",
      placeholder: "e.g. name@email.com",
      value: state.email,
      oninput: (e) => { state.email = e.target.value; clearError("field-email"); updateNavState(); },
    }),
    el("p", { class: "field-hint" }, "Please fill in your phone, your email, or both."),
    el("p", { class: "field-error", id: "contact-error" }, "Please enter a phone number or an email address."),
  ]);

  section.append(nameField, phoneField, emailField);
  return section;
}

function clearError(fieldId) {
  const f = document.getElementById(fieldId);
  if (f) f.classList.remove("has-error");
}

/* ---------------- Color steps ---------------- */
function buildColorStep(config, stepNumber) {
  const section = el("section", { class: "step", "data-step": String(stepNumber) });
  const titleChildren = [config.title];
  if (config.optional) titleChildren.push(el("span", { class: "step__optional" }, "Optional"));
  section.append(
    el("h2", { class: "step__title" }, titleChildren),
    el("p", { class: "step__intro" }, config.intro),
    buildDisclaimer()
  );

  const tabs = el("div", { class: "line-tabs" });
  COLOR_LINES.forEach((line) => {
    const tab = el(
      "button",
      {
        type: "button",
        class: "line-tab" + (state.filters[config.key] === line ? " is-active" : ""),
        onclick: () => {
          state.filters[config.key] = line;
          renderSwatchGrid(config, grid);
          tabs.querySelectorAll(".line-tab").forEach((t) => t.classList.remove("is-active"));
          tab.classList.add("is-active");
        },
      },
      line
    );
    tabs.appendChild(tab);
  });

  const grid = el("div", { class: "swatch-grid" });
  section.append(tabs, grid);
  renderSwatchGrid(config, grid);
  return section;
}

function renderSwatchGrid(config, grid) {
  grid.innerHTML = "";
  const colors = MUELLER_COLORS.filter((c) => c.line === state.filters[config.key]);
  colors.forEach((color) => {
    const selected = state.selections[config.key] && state.selections[config.key].name === color.name;
    const btn = el(
      "button",
      {
        type: "button",
        class: "swatch",
        "aria-pressed": selected ? "true" : "false",
        onclick: () => {
          state.selections[config.key] = color;
          grid.querySelectorAll(".swatch").forEach((s) => s.setAttribute("aria-pressed", "false"));
          btn.setAttribute("aria-pressed", "true");
          updateNavState();
        },
      },
      [
        el("span", { class: "swatch__color", style: `background:${color.hex}` }, [
          el("span", { class: "swatch__check" }, "✓"),
        ]),
        el("span", { class: "swatch__name" }, [color.name, el("span", { class: "swatch__line" }, color.line)]),
      ]
    );
    grid.appendChild(btn);
  });
}

/* ---------------- Review step ---------------- */
function buildReviewStep(stepNumber) {
  const section = el("section", { class: "step", "data-step": String(stepNumber), id: "review-step" });
  section.append(
    el("h2", { class: "step__title" }, "Review Your Selections"),
    el("p", { class: "step__intro" }, "Please double-check everything below. When it looks right, press “Send My Selections”.")
  );
  const content = el("div", { id: "review-content" });
  section.appendChild(content);
  const status = el("div", { class: "submit-status", id: "submit-status" });
  section.appendChild(status);
  return section;
}

function reviewRow(label, value, onEdit, swatch) {
  const valueParts = [];
  if (swatch) valueParts.push(el("span", { class: "review-swatch", style: `background:${swatch}` }));
  valueParts.push(document.createTextNode(value));
  return el("div", { class: "review-row" }, [
    el("span", { class: "review-row__label" }, label),
    el("span", { class: "review-row__value" }, valueParts),
    el("button", { type: "button", class: "review-edit", onclick: onEdit }, "Edit"),
  ]);
}

function renderReview() {
  const content = document.getElementById("review-content");
  content.innerHTML = "";

  const infoCard = el("div", { class: "review-card" }, [
    el("h3", {}, "Your Information"),
    reviewRow("Name", state.name || "—", () => goToStep(1)),
    reviewRow("Phone", state.phone || "—", () => goToStep(1)),
    reviewRow("Email", state.email || "—", () => goToStep(1)),
  ]);

  const colorCard = el("div", { class: "review-card" }, [el("h3", {}, "Colors")]);
  COLOR_STEPS.forEach((config, idx) => {
    const sel = state.selections[config.key];
    colorCard.appendChild(
      reviewRow(config.title.replace(" Color", ""), sel ? sel.name : "—", () => goToStep(idx + 2), sel ? sel.hex : null)
    );
  });

  const signatureCard = el("div", { class: "review-card" }, [
    el("h3", {}, "Confirm & Sign"),
    buildDisclaimer(),
    el("div", { class: "field", id: "field-signature" }, [
      el("label", { for: "input-signature" }, "Type Your Full Name to Sign"),
      el("input", {
        type: "text",
        id: "input-signature",
        class: "signature-input",
        autocomplete: "name",
        placeholder: "Your Name",
        value: state.signature,
        oninput: (e) => { state.signature = e.target.value; clearError("field-signature"); updateSendState(); },
      }),
      el("p", { class: "field-error" }, "Please type your name to sign."),
    ]),
    el("div", { class: "field", id: "field-agree" }, [
      el("label", { class: "agree-row" }, [
        el("input", {
          type: "checkbox",
          id: "input-agree",
          ...(state.signatureAgreed ? { checked: "checked" } : {}),
          onchange: (e) => { state.signatureAgreed = e.target.checked; clearError("field-agree"); updateSendState(); },
        }),
        el("span", {}, "I confirm the colors above are my final selections and I understand the note about digital color representation."),
      ]),
      el("p", { class: "field-error" }, "Please check the box to confirm before sending."),
    ]),
  ]);

  content.append(infoCard, colorCard, signatureCard);
  content.appendChild(
    el(
      "button",
      { type: "button", class: "btn btn--green btn--big", id: "sendBtn", disabled: "disabled", onclick: handleSubmit },
      state.submitting ? "Sending…" : "Send My Selections"
    )
  );
  updateSendState();
}

function isSignatureValid() {
  return state.signature.trim().length > 0 && state.signatureAgreed;
}

function updateSendState() {
  const sendBtn = document.getElementById("sendBtn");
  if (sendBtn) sendBtn.disabled = !isSignatureValid();
}

async function handleSubmit() {
  const sendBtn = document.getElementById("sendBtn");
  const status = document.getElementById("submit-status");
  status.className = "submit-status";
  status.textContent = "";

  if (!isSignatureValid()) {
    if (state.signature.trim().length === 0) document.getElementById("field-signature").classList.add("has-error");
    if (!state.signatureAgreed) document.getElementById("field-agree").classList.add("has-error");
    return;
  }

  if (WEB3FORMS_ACCESS_KEY === "REPLACE_WITH_YOUR_WEB3FORMS_KEY") {
    status.className = "submit-status submit-status--error is-visible";
    status.textContent =
      "This form isn't fully set up yet, so we can't send it online. Please call us at (361) 576-3825 and we'll take your selections over the phone.";
    return;
  }

  state.submitting = true;
  sendBtn.disabled = true;
  sendBtn.textContent = "Sending…";

  const summaryLines = COLOR_STEPS.map((c) => {
    const sel = state.selections[c.key];
    return `${c.title.replace(" Color", "")}: ${sel ? `${sel.name} (${sel.hex}, ${sel.line})` : "Not selected"}`;
  }).join("\n");

  const signedAt = new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    subject: `New Color Selection — ${state.name || "Unnamed Customer"}`,
    from_name: "Rafter J Construction Color Selector",
    name: state.name,
    phone: state.phone,
    email: state.email || undefined,
    message: `Customer: ${state.name}\nPhone: ${state.phone || "—"}\nEmail: ${state.email || "—"}\n\n${summaryLines}\n\nSigned: ${state.signature} (confirmed ${signedAt})`,
  };

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    const result = await response.json();
    if (result.success) {
      state.signedAt = signedAt;
      goToStep(TOTAL_STEPS);
    } else {
      throw new Error(result.message || "Unknown error");
    }
  } catch (err) {
    status.className = "submit-status submit-status--error is-visible";
    status.textContent =
      "Sorry, something went wrong sending your selections. Please check your internet connection and try again, or call us at (361) 576-3825.";
  } finally {
    state.submitting = false;
    sendBtn.disabled = false;
    sendBtn.textContent = "Send My Selections";
  }
}

/* ---------------- Success step ---------------- */
function buildSuccessStep(stepNumber) {
  const section = el("section", { class: "step", "data-step": String(stepNumber) });
  const box = el("div", { class: "success-box" }, [
    el("div", { class: "success-box__icon" }, "✓"),
    el("h2", { class: "step__title" }, "Selections Sent!"),
    el("p", { class: "step__intro", style: "margin-left:auto;margin-right:auto;" }, "Thank you! Your color selections have been sent to Rafter J Construction. We'll be in touch soon."),
  ]);
  const content = el("div", { id: "success-content" });
  box.appendChild(content);
  box.append(
    el("button", { type: "button", class: "btn btn--ghost", id: "printBtn", onclick: () => window.print() }, "Print / Save a Copy"),
    document.createTextNode(" "),
    el("button", { type: "button", class: "btn btn--primary", id: "startOverBtn2", onclick: resetForm }, "Start a New Selection")
  );
  section.appendChild(box);
  return section;
}

function renderSuccessSummary() {
  const content = document.getElementById("success-content");
  if (!content) return;
  content.innerHTML = "";
  const card = el("div", { class: "review-card" }, [
    el("h3", {}, "Summary"),
    reviewRow("Name", state.name || "—", () => {}),
    reviewRow("Phone", state.phone || "—", () => {}),
    reviewRow("Email", state.email || "—", () => {}),
  ]);
  card.querySelectorAll(".review-edit").forEach((b) => b.remove());
  COLOR_STEPS.forEach((config) => {
    const sel = state.selections[config.key];
    const row = reviewRow(config.title.replace(" Color", ""), sel ? sel.name : "—", () => {}, sel ? sel.hex : null);
    row.querySelector(".review-edit").remove();
    card.appendChild(row);
  });
  const signedRow = reviewRow("Signed", state.signature || "—", () => {});
  signedRow.querySelector(".review-edit").remove();
  card.appendChild(signedRow);
  content.appendChild(card);
  if (state.signedAt) content.appendChild(el("p", { class: "review-note" }, `Confirmed ${state.signedAt}`));
}

function resetForm() {
  state.name = "";
  state.phone = "";
  state.email = "";
  state.signature = "";
  state.signatureAgreed = false;
  state.signedAt = null;
  state.selections = { roof: null, walls: null, trim: null, soffit: null };
  buildWizard();
  goToStep(1);
}

/* ---------------- Wizard control ---------------- */
function buildWizard() {
  wizardEl.innerHTML = "";
  wizardEl.appendChild(buildInfoStep());
  COLOR_STEPS.forEach((config, idx) => wizardEl.appendChild(buildColorStep(config, idx + 2)));
  wizardEl.appendChild(buildReviewStep(COLOR_STEPS.length + 2));
  wizardEl.appendChild(buildSuccessStep(TOTAL_STEPS));
}

function stepLabel(stepNumber) {
  if (stepNumber === 1) return "Your Information";
  if (stepNumber === COLOR_STEPS.length + 2) return "Review & Send";
  if (stepNumber === TOTAL_STEPS) return "Done";
  return COLOR_STEPS[stepNumber - 2].title;
}

function isStepValid(stepNumber) {
  if (stepNumber === 1) {
    const hasName = state.name.trim().length > 0;
    const hasContact = state.phone.trim().length > 0 || state.email.trim().length > 0;
    return hasName && hasContact;
  }
  const colorIdx = stepNumber - 2;
  if (colorIdx >= 0 && colorIdx < COLOR_STEPS.length) {
    const config = COLOR_STEPS[colorIdx];
    if (config.optional) return true;
    return !!state.selections[config.key];
  }
  return true;
}

function goToStep(stepNumber) {
  currentStep = Math.max(1, Math.min(TOTAL_STEPS, stepNumber));
  wizardEl.querySelectorAll(".step").forEach((s) => {
    s.classList.toggle("is-active", Number(s.dataset.step) === currentStep);
  });

  if (currentStep === COLOR_STEPS.length + 2) renderReview();
  if (currentStep === TOTAL_STEPS) renderSuccessSummary();

  progressFill.style.width = `${(currentStep / TOTAL_STEPS) * 100}%`;
  progressWrap.setAttribute("aria-valuenow", String(currentStep));
  progressLabel.textContent = `Step ${currentStep} of ${TOTAL_STEPS}: ${stepLabel(currentStep)}`;

  const isReview = currentStep === COLOR_STEPS.length + 2;
  const isSuccess = currentStep === TOTAL_STEPS;
  bottomNav.style.display = isSuccess ? "none" : "flex";
  backBtn.disabled = currentStep === 1;
  nextBtn.style.display = isReview ? "none" : "inline-block";

  window.scrollTo({ top: 0, behavior: "smooth" });
  updateNavState();
}

function updateNavState() {
  nextBtn.disabled = !isStepValid(currentStep);
}

backBtn.addEventListener("click", () => goToStep(currentStep - 1));
nextBtn.addEventListener("click", () => {
  if (currentStep === 1 && !isStepValid(1)) {
    if (state.name.trim().length === 0) document.getElementById("field-name").classList.add("has-error");
    if (state.phone.trim().length === 0 && state.email.trim().length === 0) {
      document.getElementById("field-email").classList.add("has-error");
    }
    return;
  }
  goToStep(currentStep + 1);
});

buildWizard();
goToStep(1);
