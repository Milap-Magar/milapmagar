/** Tiny event bus for the book-a-call dialog. The dialog is mounted once
 *  (inside SDNavbar, present on every page); any button anywhere opens it
 *  by dispatching this window event — no context provider needed. */
export const BOOK_CALL_EVENT = "sd:book-call";

export function openBookCall() {
  window.dispatchEvent(new Event(BOOK_CALL_EVENT));
}
