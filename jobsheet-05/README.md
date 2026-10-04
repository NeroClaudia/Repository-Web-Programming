<<<<<<< HEAD
# Jobsheet 4 — UI/UX Design

Sub-CPMK: Design the UI/UX of the application (project).

## Changes from Jobsheet 3
- No code changes — HTML/CSS pages remain exactly the same as Jobsheet 3.
- Add `docs/wireframe.md`: text wireframes + user flow for features **not yet built** (Login, Officer Dashboard, Borrowing, Returns, History).

## How to run
Same as Jobsheet 3 — open `index.html`.

## Notes
The `docs/wireframe.md` document serves as a reference for the new HTML structure that will start being implemented in Jobsheet 5 and onwards (JS interactivity, then PHP/PostgreSQL for Login & Borrowing features).
=======
# Jobsheet 5 — JavaScript DOM & Event

Sub-CPMK: Apply JavaScript DOM manipulation & events.

## Changes from Jobsheet 4
- Add `assets/js/app.js`.
- Hamburger menu: the CSS checkbox hack is replaced with a button + JS (`nav.classList.toggle("nav-open")`).
- Add Book & Add Member forms: client-side validation (`initFormValidation`) — required fields, year range, non-negative stock — error messages shown inline via DOM manipulation (`insertAdjacentElement`).
- Book List & Member List tables: real-time search column (`initTableFilter`) that filters rows via `keyup`.
- Delete button (`.btn-delete`): shows `confirm()` then removes the row from the view (front-end only for now, not yet sent to the server).

## How to run
Open `index.html` in a browser. Try: submitting an empty form (errors appear), typing in the search box (table gets filtered), clicking Delete (confirmation appears).

## Notes
- Validation here is purely client-side and can be bypassed (by disabling JS). Server-side validation is added in Jobsheet 7 as a mandatory second layer.
- Deleting a row in this jobsheet only removes it from the view (not persistent) — it will be replaced with real deletion against the database starting in Jobsheet 9.
>>>>>>> 885d3266354cfb09c4ab4d85603fdf4672ef1eee
