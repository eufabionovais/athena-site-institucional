gsap.registerPlugin(Observer, ScrollTrigger, ScrollSmoother, ScrollToPlugin);

//Controla classe de scroll
Observer.create({
  target: window, 
  type: "wheel,touch,scroll", 
  onEnable: () => {
    setScrolledClass();
  },
  onChangeY: () => {
    setScrolledClass();
  }
});

function getScrollTop() {
  return window.scrollY || document.documentElement.scrollTop;
}

function hasScrolled() {
  return getScrollTop() > 0;
}

function setScrolledClass() {
  return hasScrolled() ? document.querySelector('body').classList.add("scrolled") : document.querySelector('body').classList.remove("scrolled");
}

// Habilita link ativo de acordo com seção visível
const sections = document.querySelectorAll(".secao");
const menuItems = document.querySelectorAll(".main-menu__item:not(.no-anchor), .ancora");

sections.forEach((secao, i) => {
  const id = secao.getAttribute("id");  
  const menuLink = document.querySelector(`a[href="#${id}"]`);

  ScrollTrigger.create({
    trigger: secao,
    start: "top center",
    end: "bottom center",
    toggleClass: { targets: menuLink, className: "ativo" },

    onEnter: () => {
      //history.replaceState(null, null, `#${id}`);
      marcarMenu(id);
    },
    onEnterBack: () => {
      //history.replaceState(null, null, `#${id}`);
      marcarMenu(id);
    },    
  });
});

function marcarMenu(idAtivo) {
  menuItems.forEach(link => {
    const targetId = link.getAttribute("href").replace("#", "");
    if (targetId === idAtivo) {
      link.classList.add("ativo");
    } else {
      link.classList.remove("ativo");
    }
  });
}

// Vincular o evento de clique a cada item do menu
menuItems.forEach(link => {
  link.addEventListener("click", scrollParaSecao);
});


// Smooth scroll e parallax
let smoother = ScrollSmoother.create({
  smooth: 0.7,   // tempo de reação do scroll
  effects: true // Habilita efeitos de parallax para elementos com data-lag ou data-speed definidos
});

// Define scroll para seção ao clicar em âncora
const header = document.querySelector(".main-header");
function scrollParaSecao(event) {
  event.preventDefault();
  
  const headerHeight = header.offsetHeight;

  const alvoID = this.getAttribute("href").substring(1);
  const secaoDestino = document.getElementById(alvoID);
  if (!secaoDestino) return;
 
  gsap.to(window, {
    scrollTo: {
      y: secaoDestino,
      offsetY: headerHeight
    },
    duration: 0.6,
    ease: "power2.out"
  });
}

// Habilita Ancora para link do logo
const logoLink = document.querySelector(".logo__link");
if(logoLink) {
  logoLink.addEventListener("click", (event) => {
    event.preventDefault();
  
      gsap.to(window, {
        scrollTo: {
          y: 0
        },
        duration: 0.6,
        ease: "power2.out"
      });
  })
}

// Rola para a seção caso haja parâmetro de âncora na URL ao carregar (desabilitado)
window.addEventListener("load", () => {
  if (window.location.hash) {
    const alvoID = window.location.hash.substring(1);
    const secaoDestino = document.getElementById(alvoID);
    if (secaoDestino) {
      const headerHeight = header.offsetHeight;
      gsap.to(window, {
        scrollTo: { y: secaoDestino, offsetY: headerHeight },
        duration: 0.4,
        ease: "power2.out"
      });
    }
  }
});

// Se vier com hash na URL, marcar o menu e ajustar scroll para considerar o header
window.addEventListener("load", () => {
  const hash = window.location.hash; 
  if (hash) {
    const alvo = hash.replace("#", "");
    const secaoAlvo = document.getElementById(alvo);
    if (secaoAlvo) {
     
      marcarMenu(alvo);

      setTimeout(() => {
        const headerHeight = header.offsetHeight;
        gsap.to(window, {
          scrollTo: {
            y: secaoAlvo,
            offsetY: headerHeight
          },
          duration: 0.6,
          ease: "power2.out"
        });
      }, 50);
    }
  }
})

// Anima imagens de Sobre e demonstração de páginas
const demoImages = document.querySelectorAll(".demo-img, .sobre-img");
demoImages.forEach(img => {
  gsap.fromTo(
    img,
    { opacity: 0, y: 100 },  
    {
      opacity: 1,
      y:   0,
      ease: "none",
      scrollTrigger: {
        trigger: img,
        start:   "top 80%",  
        end:     "top 50%",    
        scrub:   true,
        ease: "back.out(1.7)",
        once: true
      }
    }
  );
});


// Define ano atual dinamicamente para rodapé
const anoAtualElement = document.querySelector("#anoAtual");
const anoAtual = new Date().getFullYear();
anoAtualElement.textContent = anoAtual;


// Habilita menu hamburguer
const btnMenu = document.querySelector(".btn-menu");
const body = document.querySelector("html");

btnMenu.addEventListener("click", (event)=> {
  const _this = event.currentTarget;
  _this.classList.toggle("open");
  body.classList.toggle("menu-is-open");
})

// Define idade da empres em anos;
function verificaIdadeEmpresa() {
  const dataFundacao = new Date('2007-01-30');
  const dataAtual = new Date();
  
  let idadeEmpresa = dataAtual.getFullYear() - dataFundacao.getFullYear();
  
  // Verificar se já passou o aniversário este ano, caso contrário, subtrair um ano
  const mesAtual = dataAtual.getMonth();
  const mesFundacao = dataFundacao.getMonth();
  const diaAtual = dataAtual.getDate();
  const diaFundacao = dataFundacao.getDate();
  
  if (mesAtual < mesFundacao || (mesAtual === mesFundacao && diaAtual < diaFundacao)) {
      idadeEmpresa--;
  }
  return idadeEmpresa; 
}

// Escreve idade da empresa
const idadeEmpresaElement = document.querySelector("#idadeEmpresa");
if(idadeEmpresaElement) {
  idadeEmpresaElement.textContent = verificaIdadeEmpresa();
}

// Escreve telefone dinamicamente
const linkTelefone = document.querySelectorAll("[data-link-telefone]");

if(linkTelefone) {
  const phoneDDI = "55"
  const phoneDDD = "61";
  const phoneFirstPart = "99308"; 
  const phoneSecondPart = "1255";
  
  const readableFullPhoneNumber = `(${phoneDDD}) ${phoneFirstPart}-${phoneSecondPart}`; 
  const hrefPhone = `tel:+${phoneDDI}${phoneDDD}${phoneFirstPart}${phoneSecondPart}`; 

  linkTelefone.forEach((item) => {
    item.textContent = readableFullPhoneNumber;
    item.setAttribute("href", hrefPhone);
  })
  
}


// Escreve e-mail dinamicamente
const linkEmail = document.querySelectorAll("[data-link-email]");
if(linkEmail) {
  const contactEmail = "contato";
  const emailDomain = "januseducare";
  const emailType = "com";
  const emailCountry = "br";
  
  const readableEmail = `${contactEmail}@${emailDomain}.${emailType}.${emailCountry}`;
  const hrefEmail = `mailto:${readableEmail}`;

  linkEmail.forEach((item) => {
    item.textContent = readableEmail;
    item.setAttribute("href", hrefEmail);
  })
}


// const clientesProgramas = document.querySelectorAll(".clientes-programas .logo-cliente");
// const templateOuter = document.querySelector('#tooltipTemplate');
// const template = templateOuter.querySelector(".tooltip-template");

// clientesProgramas.forEach((cliente) => {

//   cliente.addEventListener("mouseover", () => {

//     const programas = cliente.getAttribute("data-programas");
//     const programasSplitted = programas.split(",");
//     let programasLista = '';
//     programasSplitted.forEach((programa) => {
//       programasLista += `<p class='mb-0'>&bull; ${programa}</p>` 
//     })
  
//     template.innerHTML = programasLista;    

//     tippy(cliente, {
//       content: template.innerHTML,
//       allowHTML: true,
//     });
//   });
// });

