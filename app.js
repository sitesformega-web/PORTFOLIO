/* =========================================================
   PORTFOLIO — app.js
   v0.1
   ========================================================= */


/* ---------------------------------------------------------
   DATOS

   Para agregar un nuevo trabajo:
   1. Agregar la URL raw de GitHub.
   2. Escribir su descripción.

   El orden dentro de este array determina el orden
   de navegación del portfolio.
--------------------------------------------------------- */

const works = [

  {
    image:
      "https://raw.githubusercontent.com/sitesformega-web/PORTFOLIO/main/PLASMA/ARGENTINA.jpg",

    description:
      "Descripción provisoria del trabajo Argentina."
  },

  {
    image:
      "https://raw.githubusercontent.com/sitesformega-web/PORTFOLIO/main/PLASMA/CAMBIO%2017-10.jpg",

    description:
      "Descripción provisoria del trabajo Cambio."
  },

  {
    image:
      "https://raw.githubusercontent.com/sitesformega-web/PORTFOLIO/main/PLASMA/ENTREVISTA%2018-11_Mesa%20de%20trabajo%201.jpg",

    description:
      "Descripción provisoria del trabajo Entrevista."
  },

  {
    image:
      "https://raw.githubusercontent.com/sitesformega-web/PORTFOLIO/main/PLASMA/HAPPY%20CAKE_Pomo%20fiestas.jpg",

    description:
      "Descripción provisoria del trabajo Happy Cake."
  },

  {
    image:
      "https://raw.githubusercontent.com/sitesformega-web/PORTFOLIO/main/PLASMA/HOY%20JUEGA!%209x16%20.jpg",

    description:
      "Descripción provisoria del trabajo Hoy Juega."
  },

  {
    image:
      "https://raw.githubusercontent.com/sitesformega-web/PORTFOLIO/main/PLASMA/DULCE%20MANJAR%204x5%202.jpg",

    description:
      "Descripción provisoria del trabajo Dulce Manjar."
  },

  {
    image:
      "https://raw.githubusercontent.com/sitesformega-web/PORTFOLIO/main/PLASMA/MEGA%20HOME%201.jpg",

    description:
      "Descripción provisoria del trabajo Mega Home."
  },

  {
    image:
      "https://raw.githubusercontent.com/sitesformega-web/PORTFOLIO/main/PLASMA/hotel%20sun%201.3.a.jpg",

    description:
      "Descripción provisoria del trabajo Hotel Sun."
  }

];


/* =========================================================
   ELEMENTOS DEL DOM
========================================================= */

const gallery =
  document.querySelector("#portfolioGallery");


const lightbox =
  document.querySelector("#portfolioLightbox");


const lightboxImage =
  document.querySelector("#lightboxImage");


const lightboxDescription =
  document.querySelector("#lightboxDescription");


const lightboxCounter =
  document.querySelector("#lightboxCounter");


const previousButton =
  document.querySelector("#lightboxPrevious");


const nextButton =
  document.querySelector("#lightboxNext");


/* =========================================================
   ESTADO
========================================================= */

let currentIndex = 0;

let lastFocusedElement = null;


/* =========================================================
   RENDER DE GALERÍA
========================================================= */

function renderGallery() {

  gallery.innerHTML = works
    .map((work, index) => {

      return `
        <button
          class="portfolio-work"
          type="button"
          data-index="${index}"
          aria-label="Abrir trabajo ${index + 1} de ${works.length}"
        >

          <img
            class="portfolio-work__image"
            src="${work.image}"
            alt=""
            loading="lazy"
            decoding="async"
          >

        </button>
      `;

    })
    .join("");

}


/* =========================================================
   ACTUALIZAR LIGHTBOX
========================================================= */

function updateLightbox() {

  const work =
    works[currentIndex];


  /* Imagen */

  lightboxImage.src =
    work.image;


  lightboxImage.alt =
    `Trabajo ${currentIndex + 1}`;


  /* Descripción */

  lightboxDescription.textContent =
    work.description || "";


  /* Contador */

  const current =
    String(currentIndex + 1)
      .padStart(2, "0");


  const total =
    String(works.length)
      .padStart(2, "0");


  lightboxCounter.textContent =
    `${current} / ${total}`;

}


/* =========================================================
   ABRIR LIGHTBOX
========================================================= */

function openLightbox(index) {

  currentIndex =
    index;


  /*
   * Guardamos el elemento seleccionado para devolverle
   * el foco cuando se cierre el visor.
   */

  lastFocusedElement =
    document.activeElement;


  updateLightbox();


  lightbox.hidden =
    false;


  lightbox.setAttribute(
    "aria-hidden",
    "false"
  );


  document.body.classList.add(
    "lightbox-open"
  );


  /*
   * Al abrir, llevamos el foco al botón cerrar.
   */

  const closeButton =
    lightbox.querySelector(
      ".lightbox__close"
    );


  closeButton.focus();

}


/* =========================================================
   CERRAR LIGHTBOX
========================================================= */

function closeLightbox() {

  lightbox.hidden =
    true;


  lightbox.setAttribute(
    "aria-hidden",
    "true"
  );


  document.body.classList.remove(
    "lightbox-open"
  );


  /*
   * Liberamos la imagen del visor.
   */

  lightboxImage.src =
    "";


  /*
   * Devolvemos el foco a la imagen que abrió
   * el lightbox.
   */

  if (lastFocusedElement) {

    lastFocusedElement.focus();

  }

}


/* =========================================================
   TRABAJO ANTERIOR
========================================================= */

function showPrevious() {

  currentIndex =
    (
      currentIndex
      - 1
      + works.length
    )
    % works.length;


  updateLightbox();

}


/* =========================================================
   TRABAJO SIGUIENTE
========================================================= */

function showNext() {

  currentIndex =
    (
      currentIndex
      + 1
    )
    % works.length;


  updateLightbox();

}


/* =========================================================
   CLICK EN GALERÍA
========================================================= */

gallery.addEventListener(
  "click",
  (event) => {

    const work =
      event.target.closest(
        ".portfolio-work"
      );


    if (!work) {
      return;
    }


    const index =
      Number(
        work.dataset.index
      );


    openLightbox(index);

  }
);


/* =========================================================
   CERRAR DESDE OVERLAY O BOTÓN X
========================================================= */

lightbox.addEventListener(
  "click",
  (event) => {

    const closeTarget =
      event.target.closest(
        "[data-lightbox-close]"
      );


    if (!closeTarget) {
      return;
    }


    closeLightbox();

  }
);


/* =========================================================
   BOTONES DE NAVEGACIÓN
========================================================= */

previousButton.addEventListener(
  "click",
  showPrevious
);


nextButton.addEventListener(
  "click",
  showNext
);


/* =========================================================
   NAVEGACIÓN POR TECLADO
========================================================= */

document.addEventListener(
  "keydown",
  (event) => {

    /*
     * No hacemos nada si el lightbox
     * está cerrado.
     */

    if (lightbox.hidden) {
      return;
    }


    /* ESC */

    if (event.key === "Escape") {

      closeLightbox();

      return;

    }


    /* FLECHA IZQUIERDA */

    if (event.key === "ArrowLeft") {

      showPrevious();

      return;

    }


    /* FLECHA DERECHA */

    if (event.key === "ArrowRight") {

      showNext();

    }

  }
);


/* =========================================================
   INICIO
========================================================= */

renderGallery();
