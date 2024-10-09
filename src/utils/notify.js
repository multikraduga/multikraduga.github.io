import { Notify } from "quasar";

export function showNotify(message, options = {}) {
  Notify.create({
    message,
    timeout: 3000,
    position: "top",
    ...options,
  });
}
