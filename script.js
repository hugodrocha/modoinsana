const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
const rail = document.querySelector(".video-rail");

menuBtn?.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

if (rail) {
  let direction = 1;
  setInterval(() => {
    const max = rail.scrollWidth - rail.clientWidth;
    if (max <= 0) {
      return;
    }
    if (rail.scrollLeft >= max - 4) {
      direction = -1;
    }
    if (rail.scrollLeft <= 4) {
      direction = 1;
    }
    rail.scrollBy({ left: 280 * direction, behavior: "smooth" });
  }, 4200);
}

const HISTORIA = [
  {
    from: "hugo",
    time: "14:24",
    text: "Ei Peter como surgiu o Modo In Sana?",
  },
  {
    from: "peter",
    time: "14:25",
    text: "Então...\nAproveitar que estou na fila, e já vou dizer algumas curiosidades...",
  },
  {
    from: "peter",
    time: "14:26",
    year: "2016",
    text: "A banda surgiu em 2016, como uma dupla, entre Felipe Lopes e eu, Peter Sana. O intuito era montar um repertório voz e violão e daí partir para a banda.",
  },
  {
    from: "peter",
    time: "14:28",
    year: "2017",
    text: "Em 2017 tivemos a oportunidade de tocar fixo aos sábados na antiga Pizzaria Só na Massa. Na Av. Dr. Mário Guimarães, bem próximo à praça dos skates. E dali montamos a primeira formação com Felipe Lopes no baixo, Lorran Ferreira na bateria e Lionel Ricardo na guitarra.",
  },
  {
    from: "peter",
    time: "14:29",
    text: "Logo surgiram outros bares e eventos privados. Motoclubes também começaram a nos procurar e a agenda começou a crescer.",
  },
  {
    from: "peter",
    time: "14:29",
    year: "2021",
    text: "Na pandemia ficamos sem fazer shows, mas em 2021, com o fim do isolamento, a banda voltou com tudo e engordou a agenda de maneira gradual...",
  },
  {
    from: "peter",
    time: "14:31",
    year: "2018",
    text: "Muitos integrantes entraram e saíram. Mas em 2018 entrou o atual guitarrista, Raphael Santos, que criou amizade pessoal e passou a fazer parte do quadro de músico fixo.",
  },
  {
    from: "peter",
    time: "14:32",
    year: "2019",
    text: "Após a saída de Lorran, em 2019, Pedro Paulo passou a integrar a banda e se mantém como baterista fixo até os dias atuais.",
  },
  {
    from: "peter",
    time: "14:34",
    text: "Com a chegada de Matheus Palmeira pra fazer alguns shows como guitarrista, Raphael foi para o baixo. Mas como Matheus é um músico muito requisitado, ele passou a tocar toda vez que consegue encaixar na sua agenda.",
  },
  {
    from: "peter",
    time: "14:35",
    year: "2024",
    text: "Com a necessidade de ter um músico que pudesse fechar com a banda mais vezes, o amigo João Paulo — JP passou a fazer o baixo a partir de 2024. E até hoje faz o som na maioria das vezes, salvo quando Matheus pode estar com a banda.",
  },
  {
    from: "hugo",
    time: "14:36",
    text: "Que material foda, continua",
  },
  {
    from: "peter",
    time: "14:37",
    text: "O som da banda começou com um rock pop internacional e nacional, passando por bandas como Pearl Jam, Paralamas do Sucesso, Legião Urbana, U2, Bon Jovi, Extreme, Capital Inicial, dentre outras neste estilo.",
  },
  {
    from: "peter",
    time: "14:38",
    text: "Quando há possibilidades de shows em locais que a banda sente necessidade de músicas mais pesadas, bandas como Black Sabbath, Whitesnake, Metallica, SOAD, dentre outras passam a estar no set também.",
  },
  {
    from: "peter",
    time: "14:39",
    text: "A banda se apresenta nos formatos voz e violão, trio com dois violões, trio acústico com cajon ou com bateria, quarteto com baixo, guitarra e bateria, ou quinteto, acrescentando um guitarrista a mais ou um tecladista, conforme necessidade.",
  },
];

const thread = document.getElementById("wa-thread");
const playBtn = document.getElementById("wa-play");
const skipBtn = document.getElementById("wa-skip");
const yearMarks = document.querySelectorAll(".year-rail li");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let runId = 0;
let started = false;

function sleep(ms, id) {
  return new Promise((resolve) => {
    const timer = setTimeout(resolve, ms);
    const watch = setInterval(() => {
      if (id !== runId) {
        clearTimeout(timer);
        clearInterval(watch);
        resolve();
      }
    }, 80);
    setTimeout(() => clearInterval(watch), ms + 20);
  });
}

function typingMs(text) {
  return Math.min(1100, 380 + text.length * 6);
}

function readMs(text) {
  return Math.min(2400, 800 + text.length * 10);
}

function resetThread() {
  if (!thread) {
    return;
  }
  thread.innerHTML = '<div class="wa-day">23 de agosto de 2026</div>';
  yearMarks.forEach((item) => item.classList.remove("on"));
}

function highlightYear(year) {
  if (!year) {
    return;
  }
  yearMarks.forEach((item) => {
    if (item.dataset.year === year) {
      item.classList.add("on");
    }
  });
}

function faceFor(from) {
  const img = document.createElement("img");
  img.className = "wa-face";
  img.alt = "";
  img.src = from === "hugo" ? "images/logo-circulo.png" : "images/peter.png";
  return img;
}

function appendBubble(msg) {
  const row = document.createElement("div");
  row.className = `wa-row ${msg.from}`;
  const bubble = document.createElement("div");
  bubble.className = "wa-bubble";
  bubble.append(msg.text);
  const meta = document.createElement("span");
  meta.className = "wa-meta";
  meta.textContent = msg.time;
  bubble.appendChild(meta);
  if (msg.from === "peter") {
    row.append(faceFor("peter"), bubble);
  } else {
    row.append(bubble, faceFor("hugo"));
  }
  thread.appendChild(row);
  thread.scrollTop = thread.scrollHeight;
}

function appendTyping(from) {
  const row = document.createElement("div");
  row.className = `wa-row ${from}`;
  row.dataset.typing = "1";
  const bubble = document.createElement("div");
  bubble.className = "wa-bubble";
  const typing = document.createElement("span");
  typing.className = "wa-typing";
  typing.setAttribute("aria-hidden", "true");
  typing.innerHTML = "<i></i><i></i><i></i>";
  bubble.appendChild(typing);
  if (from === "peter") {
    row.append(faceFor("peter"), bubble);
  } else {
    row.append(bubble, faceFor("hugo"));
  }
  thread.appendChild(row);
  thread.scrollTop = thread.scrollHeight;
}

function removeTyping() {
  thread.querySelector('[data-typing="1"]')?.remove();
}

function renderAll() {
  resetThread();
  HISTORIA.forEach((msg) => {
    appendBubble(msg);
    highlightYear(msg.year);
  });
  yearMarks.forEach((item) => item.classList.add("on"));
  playBtn.textContent = "Reproduzir";
}

async function playHistoria() {
  const id = ++runId;
  resetThread();
  playBtn.textContent = "Pausar";

  for (const msg of HISTORIA) {
    if (id !== runId) {
      return;
    }
    appendTyping(msg.from);
    await sleep(typingMs(msg.text), id);
    if (id !== runId) {
      return;
    }
    removeTyping();
    appendBubble(msg);
    highlightYear(msg.year);
    await sleep(readMs(msg.text), id);
  }

  if (id === runId) {
    yearMarks.forEach((item) => item.classList.add("on"));
    playBtn.textContent = "Reproduzir";
  }
}

function pauseHistoria() {
  runId += 1;
  removeTyping();
  playBtn.textContent = "Reproduzir";
}

playBtn?.addEventListener("click", () => {
  if (playBtn.textContent === "Pausar") {
    pauseHistoria();
    return;
  }
  playHistoria();
});

skipBtn?.addEventListener("click", () => {
  runId += 1;
  renderAll();
});

if (thread) {
  const section = document.getElementById("historia");
  const watch = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting || started) {
        return;
      }
      started = true;
      if (reduceMotion) {
        renderAll();
        return;
      }
      playHistoria();
    },
    { threshold: 0.35 }
  );
  watch.observe(section);
}
