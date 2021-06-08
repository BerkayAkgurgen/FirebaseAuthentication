// Auth Control Handler

auth.onAuthStateChanged((listener) => {
  if (!!listener) {
    db.collection("articles").onSnapshot((snapshot) => {
      const datas = snapshot.docs.map((data) => ({
        ...data.data(),
        specId: data.id,
      }));
      renderArticles(datas);
      signInToggles(listener);
      signOutToggles(listener);
    });
  } else {
    signInToggles(null);
    signOutToggles(null);
    renderArticles(null);
  }
});

// Create Account

const userForm = document.querySelector("#signup-form");

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const mail = userForm["signup-email"].value.trim();
  const password = userForm["signup-password"].value.trim();
  const about = userForm["signup-bio"].value.trim();
  auth
    .createUserWithEmailAndPassword(mail, password)
    .then((result) => {
       db
        .collection("users")
        .doc(result.user.uid)
        .set({
          about,
          mail,
          password,
        })
        .then(() => {
          const modal = document.querySelector("#modal-signup");
          M.Modal.getInstance(modal).close();
          userForm.reset();
        });
    })
    .catch((error) => console.error(error));
});

// Exit Process

const exitButton = document.querySelector("#logout");

exitButton.addEventListener("click", (e) => {
  e.preventDefault();
  auth
    .signOut()
    .then(() => {})
    .catch((error) => console.error(error));
});

// SignIn process

const signInForm = document.querySelector("#login-form");

signInForm.addEventListener("click", (e) => {
  e.preventDefault();
  const mail = signInForm["login-email"].value.trim();
  const password = signInForm["login-password"].value.trim();

  auth
    .signInWithEmailAndPassword(mail, password)
    .then((result) => {
      const modal = document.querySelector("#modal-login");
      M.Modal.getInstance(modal).close();
      signInForm.reset();
    })
    .catch((error) => console.error(error));
});
