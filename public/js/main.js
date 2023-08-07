const isScrolling = () => {
    const headerEl = document.querySelector('.primary-header')
    let windowPosition = window.scrollY > 250
    headerEl.classList.toggle('active', windowPosition)
}
window.addEventListener('scroll', isScrolling)

// testimonial novo

const testimonials = [
  {
    name: "Leticia Emilia",
    cargo: "Aluna",
    image: "img/image-leticia.jpg",
    testimonial:
      "Meu nome é Leticia Emilia de Informática 2, o início no IFPB foi bem complexo devido a dificuldade em conciliar dificuldades acadêmicas, relações familiares e de amizade. Entretanto, é uma experiência que vem se tornando cada vez mais favorável, agradável e construtiva para mim.",
  },
  {
    name: "Matheus Faelson",
    cargo: "Aluno",
    image: "img/image-faelson.jpg",
    testimonial:
      "Meu nome é Matheus Faelson de Informática 2, a minha experiência com o IFPB é simplesmente sensacional devido à diversidade de possibilidades que podem levar para diferentes caminhos, os quais têm como fim algum tipo de experiência ou conhecimento.",
  },
  {
    name: "Mayara Ellen",
    cargo: "Ex-Estudante do IFPB",
    image: "img/image-mayara.jpg",
    testimonial:
      "Meu nome é Mayara Ellen, minha experiência no curso de informática no campus foi uma experiência incrível com professores maravilhoso e muitos atenciosos, O curso me ajudou muito a evoluir na informática, tanto na área de programação quanto na área de Manuntenção, uma experiência única que depois que você aprende nunca esquece.",
  },
  {
    name: "Lucas Targino",
    cargo: "Ex-Estudante do IFPB",
    image: "img/image-lucas.jpg",
    testimonial:
      "Meu nome é Lucas Targino, minha experiência como aluno do IFPB, foi muito boa e desafiador,. O curso de informática ampliou a minha visão de mundo de uma forma incrível, devido a todas as matérias ofertadas e toda as experiências passadas pelos docentes para nós proporcionar um ensino de qualidade.",
  },
];

//slider corrente
let i = 0;
//TOTAL
let j = testimonials.length;

let testimonialContainer = document.getElementById("testimonial-container");
let nextBtn = document.getElementById("next");
let prevBtn = document.getElementById("prev");

nextBtn.addEventListener("click", () => {
  i = (j + i + 1) % j;
  displayTestimonial();
});
prevBtn.addEventListener("click", () => {
  i = (j + i - 1) % j;
  displayTestimonial();
});

let displayTestimonial = () => {
  testimonialContainer.innerHTML = `
    <p>${testimonials[i].testimonial}</p>
    <img src=${testimonials[i].image}>
    <h3>${testimonials[i].name}</h3>
    <h6>${testimonials[i].cargo}</h6>
  `;
};
window.onload = displayTestimonial;

// footer

class FormSubmit {
  constructor(settings) {
    this.settings = settings;
    this.form = document.querySelector(settings.form);
    this.formButton = document.querySelector(settings.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySuccess() {
    this.form.innerHTML = this.settings.success;
  }

  displayError() {
    this.form.innerHTML = this.settings.error;
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;
    });

    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.disabled = true;
    event.target.innerText = "Enviando...";
  }

  async sendForm(event) {
    try {
    this.onSubmission(event);
    await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.getFormObject()),
    });
    this.displaySuccess();
  } catch {
    this.displayError();
    throw new Error(error);
  }
}
  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h2 class='success'>Obrigado pelo seu feedback! Entraremos em contato assim que possível.</h2>",
  error: "<h2 class='error'>Não foi possível enviar sua mensagem.</h2>",
});
formSubmit.init();
