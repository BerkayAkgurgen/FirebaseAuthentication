const articleList = document.querySelector(".guides");
const signOutLinks = document.querySelectorAll(".logged-out");
const signInLinks = document.querySelectorAll(".logged-in");
const createArticleForm = document.querySelector("#create-form");
const accountDetails = document.querySelector(".account-details");

const signInToggles = (user) => {
  if (user !== null) {
    signInLinks.forEach((item) => {
      item.style.display = "block";
    });
    showUserInformation(user);
  } else {
    signInLinks.forEach((item) => {
      item.style.display = "none";
    });
  }
};

const showUserInformation = (user) => {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        let userHTML = `
              <div>Mail: <b>${doc.data().mail}</b></div>
              <div>About: <b>${doc.data().about}</b></div>
              `;
        accountDetails.innerHTML = userHTML;
      });
  } else {
    accountDetails.innerHTML = "";
  }
};

const signOutToggles = (user) => {
  if (user !== null) {
    signOutLinks.forEach((item) => {
      item.style.display = "none";
    });
  } else {
    signOutLinks.forEach((item) => {
      item.style.display = "block";
    });
  }
};

const renderArticles = (datas) => {
  if (datas !== null) {
    const listInnerHTML = datas
      .map((article) => {
        return `
        <li>
            <div class="collapsible-header grey lighten-3">${article.title}</div>
            <div class="collapsible-body white"><span>${article.content}</span></div>
        </li>
        `;
      })
      .join(" ");

    articleList.innerHTML = listInnerHTML;
  } else {
    articleList.innerHTML = `<h5 class="center-align">Giriş Yapın.</h5>`;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  let modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);
  let articles = document.querySelectorAll(".collapsible");
  M.Collapsible.init(articles);
});

createArticleForm.addEventListener("submit", (e) => {
  e.preventDefault();
  db.collection("articles")
    .add({
      title: createArticleForm["title"].value.trim(),
      content: createArticleForm["content"].value.trim(),
    })
    .then(() => {
      const modal = document.querySelector("#modal-create");
      M.Modal.getInstance(modal).close();
      createArticleForm.reset();
    })
    .catch((error) => console.error(error));
});
