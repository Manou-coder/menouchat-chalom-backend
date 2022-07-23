// declaration des zmanim dans le DOM

let shacharitChol = document.querySelector("#shacharitChol");
let minchaChol = document.querySelector("#minchaChol");
let arvitChol = document.querySelector("#arvitChol");

let shirAshirim = document.querySelector("#shirAshirim");
let minchaErevShbt = document.querySelector("#minchaErevShbt");
let shaharitShbt = document.querySelector("#shaharitShbt");
let minchaShbt = document.querySelector("#minchaShbt");

// Affichage des zmanim a partir de la DB

const displayZmanChol = async () => {
  let ZmanTefChol = await fetch("http://localhost:3000/horaires/zmanChol.txt")
    .then((data) => data.json())
    .then((data) => {
    //   console.log(data.shacharitChol);
      shacharitChol.value = data.shacharitChol;
      minchaChol.value = data.minchaChol;
      arvitChol.value = data.arvitChol;
    })
    .catch((err) => {
      console.error(err);
      return;
    });
};

displayZmanChol();

const displayZmanShabat = async () => {
  let ZmanTefChol = await fetch("http://localhost:3000/horaires/zmanShbt.txt")
    .then((data) => data.json())
    .then((data) => {
    //   console.log(data);
      shirAshirim.value = data.shirAshirim;
      minchaErevShbt.value = data.minchaErevShbt;
      shaharitShbt.value = data.shaharitShbt;
      minchaShbt.value = data.minchaShbt;
    })
    .catch((err) => {
      console.error(err);
      return;
    });
};

displayZmanShabat();

// function commune pour enregistrer les zmanim dans la DB

const sendZman = async (url, body) => {
  let zman = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/JSON",
      "Content-Type": "application/JSON",
    },
    body: JSON.stringify(body),
  })
    .then((data) => data.json())
    .then((data) => console.log(data));
};

const loaderFunc = (loader) => {
  loader.setAttribute("id", "loader-2");
};

const validator = (loader) => {
  if (loader.childNodes.length >= 8) {
    return;
  }
  loader.setAttribute("id", "loader-1");
  let img = document.createElement("img");
  img.style.marginTop = "5px";
  img.src = "../public/validator.png";
  loader.appendChild(img);
  setTimeout(() => {
    loader.removeChild(img);
  }, 2000);
};

const erreur = (loader) => {
  if (loader.childNodes.length >= 8) {
    return;
  }
  loader.setAttribute("id", "loader-1");
  let img = document.createElement("img");
  img.style.marginTop = "5px";
  img.src = "../public/error.png";
  loader.appendChild(img);
};

// ZMANEI CHOL (parametrage de l'envoi des zmanim de chol)

let formChol = document.querySelector("#formChol");

let urlChol = "http://localhost:3000/admin/zman-chol";

let loaderChol = document.querySelector(".loader.chol");

formChol.addEventListener("submit", async (e) => {
  let bodyChol = {
    shacharitChol: shacharitChol.value,
    minchaChol: minchaChol.value,
    arvitChol: arvitChol.value,
  };
  e.preventDefault();
  loaderFunc(loaderChol);
  await sendZman(urlChol, bodyChol)
    .then(() => validator(loaderChol))
    .catch((err) => {
      loaderChol.setAttribute("id", "loader-1");
      erreur(loaderChol);
    });
});

// ZMANEI SHABAT (parametrage de l'envoi des zmanim de shabat)

let formShabat = document.querySelector("#formShabat");

let urlShabat = "http://localhost:3000/admin/zman-shabat";

let loaderShabat = document.querySelector(".loader.shabat");

formShabat.addEventListener("submit", async (e) => {
  let bodyShabat = {
    shirAshirim: shirAshirim.value,
    minchaErevShbt: minchaErevShbt.value,
    shaharitShbt: shaharitShbt.value,
    minchaShbt: minchaErevShbt.value,
  };
  e.preventDefault();
  loaderFunc(loaderShabat);
  await sendZman(urlShabat, bodyShabat)
    .then(() => validator(loaderShabat))
    .catch((err) => {
      loaderShabat.setAttribute("id", "loader-1");
      erreur(loaderShabat);
    });
});

// FORMULAIRE ENVOI DES PDF

const formPDF1 = document.querySelector('.formPDF.one');
// console.log(formPDF1);

const formPDF2 = document.querySelector('.formPDF.two');
// console.log(formPDF2);

const formPDF3 = document.querySelector('.formPDF.three');
// console.log(formPDF3);

const formPDF4 = document.querySelector('.formPDF.four');
// console.log(formPDF4);


addEvent(formPDF1)
addEvent(formPDF2)
addEvent(formPDF3)
addEvent(formPDF4)

function addEvent(form) {
  // console.log('id of form = ' + form.children[1].id);
  form.addEventListener("change", (e) => {
    e.preventDefault();
    allPDF(form.children[1].id);
  });
}


function allPDF(files) {
  files = document.getElementById(files);
  console.log(files);
  console.log(files.files[0].name);
  const formData = new FormData();
  for (let i = 0; i < files.files.length; i++) {
    formData.append("files", files.files[i]);
  }
  formData.append("nameOfFile", files.files[0].name);
  formData.append("numberOfImage", files.id.substr(-1));
  fetch("http://localhost:3000/admin/upload_pdf", {
    method: "POST",
    body: formData,
    headers: {
      //   "Content-Type":'undefined'
    },
  })
    .then(res => {
      console.log(res);
      return res.json();
    })
    .then(res => console.log(res))
    .catch((err) => ("Error occured", err));

}




// let checkbox = document.querySelector('#image1');
// console.log(checkbox);

// let form = document.querySelector('#form');
// console.log(form);

let formImg = document.querySelector("#formImg");
// console.log(formImg);

const displayFormImg = async () => {
  let formImg = await fetch("http://localhost:3000/admin/displayImg", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image1: document.querySelector("#image1").checked,
      image2: document.querySelector("#image2").checked,
      image3: document.querySelector("#image3").checked,
      image4: document.querySelector("#image4").checked,
      secInterval: document.querySelector("#secInterval").value,
    }),
  });
};

formImg.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log(e);
  displayFormImg();
});

