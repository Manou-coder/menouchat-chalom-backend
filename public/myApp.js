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
  let ZmanTefChol = await fetch("http://localhost:3000/db/zmanChol.txt")
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
  let ZmanTefChol = await fetch("http://localhost:3000/db/zmanShbt.txt")
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

// Affichage des nom de fichier a partir de la db

let imageName1 = document.querySelector('.image-name.one');
let imageName2 = document.querySelector('.image-name.two');
let imageName3 = document.querySelector('.image-name.three');
let imageName4 = document.querySelector('.image-name.four');


const displayNameOfFile = async () => {
  let objectImage = await fetch("http://localhost:3000/db/images-display.txt")
    .then((data) => data.json())
    .then((data) => {
        console.log(data);
      let imageDisplay = data.imageDisplay;
      console.log(imageDisplay[0]);
      console.log(file1);
      imageName1.innerHTML = imageDisplay[0];
      imageName2.innerHTML = imageDisplay[1];
      imageName3.innerHTML = imageDisplay[2];
      imageName4.innerHTML = imageDisplay[3];
    })
    .catch((err) => {
      console.error(err);
      return;
    });
};

displayNameOfFile();


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

// function pour le validateur et l'erreur

const loaderFunc = (loader) => {
  console.log(loader);
  loader.style.marginTop = "5px";
  loader.style.display = "block";
  if (loader.children.length >= 4) {
    console.log("coucou");
    loader.removeChild(document.getElementById("imgError"));
  }
  loader.setAttribute("id", "loader-2");
};

const validator = (loader) => {
  console.log(loader.childNodes.length);
  if (loader.childNodes.length >= 9) {
    return;
  }
  loader.setAttribute("id", "loader-1");
  let img = document.createElement("img");
  img.style.marginTop = "5px";
  img.src = "../public/validator.png";
  loader.appendChild(img);
  setTimeout(() => {
    loader.removeChild(img);
    loader.style.display = "none";
    window.location.reload();
  }, 2000);
};

const erreur = (loader) => {
  if (loader.childNodes.length >= 9) {
    return;
  }
  loader.setAttribute("id", "loader-1");
  let img = document.createElement("img");
  img.style.marginTop = "5px";
  img.src = "../public/error.png";
  img.id = "imgError";
  loader.appendChild(img);
  setTimeout(() => {
    loader.removeChild(img);
    loader.style.display = "none";
    window.location.reload();
  }, 4000);
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



let label = document.querySelectorAll('.label-image');
// console.log(label);

label.forEach(label => {
  // console.log(label.parentNode.children);
  label.addEventListener('click', (e) => {
    e.preventDefault();
    label.parentNode.children[2].click()
  })
  
})



const formPDF1 = document.querySelector(".formPDF.one");
// console.log(formPDF1);

const formPDF2 = document.querySelector(".formPDF.two");
// console.log(formPDF2);

const formPDF3 = document.querySelector(".formPDF.three");
// console.log(formPDF3);

const formPDF4 = document.querySelector(".formPDF.four");
// console.log(formPDF4);

addEvent(formPDF1);
addEvent(formPDF2);
addEvent(formPDF3);
addEvent(formPDF4);

function addEvent(formPDF, loaderPdf, inputFile) {
  loaderPdf = formPDF.children[6];
  inputFile = formPDF.children[2];
  inputFile.addEventListener("change", (e) => {
    e.preventDefault();
    loaderFunc(loaderPdf);
    allPDF(inputFile.id, loaderPdf);
  });
}

function allPDF(files, loaderPdf) {
  let formParent = loaderPdf.parentNode;
  console.log(formParent);
  files = document.getElementById(files);
  // console.log(files.files[0]);
  const formData = new FormData();
  formData.append("files", files.files[0]);
  formData.append("nameOfFile", files.files[0].name);
  formData.append("numberOfImage", files.id.substr(-1));
  fetch("http://localhost:3000/admin/upload_pdf", {
    method: "POST",
    body: formData,
    headers: {
      //   "Content-Type":'undefined'
    },
  })
    .then((res) => {
      console.log(res);
      if (!res.ok) {
        loaderPdf.setAttribute("id", "loader-1");
        erreur(loaderPdf);
      } else {
        validator(loaderPdf);
        formParent.children[3].innerHTML= files.files[0].name;
      }
    })
    .catch((err) => {
      loaderPdf.setAttribute("id", "loader-1");
      erreur(loaderPdf);
      return "Error occured", err;
    });
}

// let checkboxs = document.querySelectorAll(".checkbox");

// checkboxs.forEach((e) => {
//   e.removEentListener("change", (e) => {
//     e.preventDefault();
//     loaderFunc(loaderPdf);
//     allPDF(idOfInputFile, loaderPdf);
//   });
// });

// let checkbox1 = document.querySelector('#image1');
// console.log(checkbox1);

// checkbox1.addEventListener('click', (e) => {
//   console.log('parent', checkbox1.parentNode);
//   let el = checkbox1.nextElementSibling
//   console.log(el);
//   el = el.remove()
//   // document.createElement(el)
//   console.log(el);
// })

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

// MODAL

const modalContainer = document.querySelector(".modal-container");
const modalTriggers = document.querySelectorAll(".modal-trigger");

modalTriggers.forEach((trigger) =>
  trigger.addEventListener("click", toggleModal)
);

function toggleModal(e) {
  e.preventDefault();
  let modal = modalContainer.children[1];
  console.log(modal.children);
  try {
    // console.log(e.target.parentNode.children);
    // console.log(e.target.parentNode.children[2].id);
    let nameOfImage = e.target.parentNode.children[2].id.substr(-1);
    // console.log("nameOfImage", nameOfImage);
    modal.style.backgroundImage = `url('http://localhost:3000/images/imageAffiche${nameOfImage}.jpg')`;
    modal.children[1].innerHTML = e.target.parentNode.children[3].innerHTML;
  } catch (error) {
  }
  modalContainer.classList.toggle("active");
}
