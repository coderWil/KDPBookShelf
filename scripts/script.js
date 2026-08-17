/*
 * Mobile navigation (hamburger menu) controller.
 *
 * Progressively enhances the header nav: on wide screens the CSS shows the
 * nav links inline and hides this button entirely (see .nav-toggle in
 * styles.css), so this script only matters below the 700px breakpoint.
 *
 * Wrapped in an IIFE to keep `toggle`/`menu` out of the global scope, since
 * this file also declares a global `window.formspree` further down.
 *
 * Depends on two ids set in index.html — if either id is renamed there,
 * update it here too:
 *   #nav-toggle        the hamburger <button>
 *   #primary-nav-list  the <ul> of nav links it shows/hides
 */
(function () {
  var toggle = document.getElementById('nav-toggle');
  var menu = document.getElementById('primary-nav-list');

  // Hides the mobile menu and resets the button's a11y state so screen
  // readers correctly report the menu as collapsed.
  function closeMenu() {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  // Reveals the mobile menu (CSS keys off the .is-open class) and flags
  // the button as expanded for assistive tech.
  function openMenu() {
    menu.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
  }

  // Hamburger button click: flip open/closed.
  toggle.addEventListener('click', function () {
    if (menu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Auto-close after picking a link, so the menu doesn't stay open
  // covering the section the user just navigated to.
  menu.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      closeMenu();
    }
  });

  // Escape closes the menu and returns focus to the toggle button, so
  // keyboard users aren't left with focus stranded on a hidden link.
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      closeMenu();
      toggle.focus();
    }
  });

  // Clicking anywhere outside the open menu (and outside the toggle
  // itself, to avoid immediately reopening it) closes the menu.
  document.addEventListener('click', function (event) {
    if (!menu.classList.contains('is-open')) return;
    if (menu.contains(event.target) || toggle.contains(event.target)) return;
    closeMenu();
  });
})();

/*
 * Formspree AJAX contact-form init.
 *
 * This is Formspree's standard loader-queue snippet, not custom logic: it
 * defines a `window.formspree` stub that just queues calls, then the real
 * @formspree/ajax library (loaded separately via CDN <script defer> in
 * index.html) reads the queue and wires up the form once it finishes
 * loading. This lets the "initForm" call below execute immediately without
 * waiting on the CDN request.
 *
 * Adjustable values — both must match the live Formspree form and the
 * markup in index.html, or submissions/validation will silently stop
 * working:
 *   formElement  CSS selector for the <form>. Must match its id
 *                (id="contact-form" in index.html).
 *   formId       Formspree form id, taken from the endpoint URL
 *                https://formspree.io/f/<formId>. Must match the form's
 *                `action` attribute in index.html.
 *
 * Load order matters: this stub must run before the CDN library script
 * executes. In index.html this file is included via a plain
 * <script src="scripts/script.js"> (no defer/async) placed before the
 * Formspree CDN <script defer> tag — keep it in that position if you ever
 * reorder the script tags.
 */
window.formspree = window.formspree || function () { (formspree.q = formspree.q || []).push(arguments); };
formspree('initForm', { formElement: '#contact-form', formId: 'xppaynby' });
