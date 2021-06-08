document.addEventListener("DOMContentLoaded", () => {
  let modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
  let articles = document.querySelectorAll('.collapsible')
  M.Collapsible.init(articles)
});
