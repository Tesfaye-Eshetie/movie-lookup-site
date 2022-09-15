const d = function () {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) n(e);
  new MutationObserver((e) => {
    for (const a of e)
      if (a.type === 'childList')
        for (const o of a.addedNodes)
          o.tagName === 'LINK' && o.rel === 'modulepreload' && n(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function r(e) {
    const a = {};
    return (
      e.integrity && (a.integrity = e.integrity),
      e.referrerpolicy && (a.referrerPolicy = e.referrerpolicy),
      e.crossorigin === 'use-credentials'
        ? (a.credentials = 'include')
        : e.crossorigin === 'anonymous'
        ? (a.credentials = 'omit')
        : (a.credentials = 'same-origin'),
      a
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    const a = r(e);
    fetch(e.href, a);
  }
};
d();
const s = document.createElement('template');
s.innerHTML = `
  <style>
    .card {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 80vw;
      border-radius: 2rem;
      background-color: #fff;
      font-size: 1rem;
    }
    .card .div-flex {
      min-height: 20rem;
      max-width: 24rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items:flex-start;
      gap: .8rem;
      line-height: 1.5rem;
      padding: 1rem .5rem;
    }
    .card img {
      border-radius: 1rem;
      box-shadow: 2px 2px #17173b;
      margin: 1rem .5rem;
      object-fit: cover;
      align-self: center;
    }
    .card h2 {
      font-weight: 700;
      margin-bottom: .5rem;
      text-align: center;
      text-transform:uppercase;
      font-size: 1.4rem;
    }
    .card h3 {
      margin: .2rem 0;
    }
    .card ul {
      margin: .5rem;
    }
    .card p {
      margin: .2rem 0;
    }
    .card ul li {
      list-style: none;
      line-height: 1.4rem;
      padding-left: 1rem;
    }
    
    .card .span-flex {
      font-weight: 700;
      font-size: 1rem;
    }
   
    @media (max-width: 50rem) {
    .card {
      flex-direction: column;
    }
    }
    
  </style>
  <div class="card" >
    <div class="div-flex">
      <img >
    </div>
    <div class="div-flex">
      <h2 id='title'></h2>
      <h3 id='year'></h3>
      <div>
        <h3>Ratings values from various sources</h3>
        <ul id="rating">
          <li id="one"></li>
          <li id="two"></li>
          <li id="three"></li>
        </ul>
      </div>
      <p><span class="span-flex">Released Date: </span><span id="date"></span></p>
    </div>
  </div>`;
class h extends HTMLElement {
  constructor() {
    super(),
      this.attachShadow({ mode: 'open' }),
      this.shadowRoot.appendChild(s.content.cloneNode(!0));
  }
  connectedCallback() {
    (this.shadowRoot.querySelector('img').src = this.getAttribute('poster')),
      (this.shadowRoot.querySelector('#title').textContent =
        this.getAttribute('title')),
      (this.shadowRoot.querySelector(
        '#year'
      ).textContent = `Year: ${this.getAttribute('year')} `),
      (this.shadowRoot.querySelector('#rating #one').innerHTML =
        this.getAttribute('rating_0')),
      (this.shadowRoot.querySelector('#rating #two').innerHTML =
        this.getAttribute('rating_1')),
      (this.shadowRoot.querySelector('#rating #three').innerHTML =
        this.getAttribute('rating_2')),
      (this.shadowRoot.querySelector('#date').textContent =
        this.getAttribute('date'));
  }
}
const l = document.createElement('template');
l.innerHTML = `
  <style>
    .navbar {
        background-color: var(--clr-dark);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem 5rem;
        margin: 0;
        width: 100%;
        position: sticky;
        top: 0;
        z-index: 1;
        opacity: 0.9;
    }
    .navbar__logo {
        max-width: 6rem;
    }
    .navbar__logo img {
        width: 90%;
        height: auto;
        transition: all 1s ease-in-out;
    }
    .navbar__logo img:hover {
        width: 100%;
    }   
    .navbar__items {
        position: absolute;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        background-color: var(--clr-dark);
        height: 0px;
        transition: all 0.3s ease-in;
        top: 50px;
        left: 0px;
        position: static;
        overflow-y: visible;
        width: 60%;
    }
    .navbar__list {
        list-style: none;
    }
    .navbar__link {
        text-decoration: none;
        color: var(--clr-light);
        font-weight: var(--fw-normal);
    }
    .navbar__link:hover {
        text-shadow: 0.1rem 0.1rem var(--clr-primary);
        font-weight: var(--fw-bold);
        text-decoration: 2px underline rgb(241, 204, 135);
    }
    @media (max-width: 50rem) {
      .navbar {
        padding: 0.5rem 1.5rem;
      }
      .navbar__items {
        width: 80%;
      }
    }
  </style>
  <nav class="navbar">
    <div class="navbar__logo">
        <a href="index.html"><img src="../../images/logo.png" alt="Logo" /></a>
    </div>
    <ul class="navbar__items">
        <li class="navbar__list">
        <a href="search.html" class="navbar__link">Search</a>
        </li>
        <li class="navbar__list">
        <a href="favorite.html" class="navbar__link">Favorite</a>
        </li>
        <li class="navbar__list">
        <a href="#contact" class="navbar__link">Contact</a>
        </li>
    </ul>
  </nav>`;
class m extends HTMLElement {
  constructor() {
    super(),
      this.attachShadow({ mode: 'open' }),
      this.shadowRoot.appendChild(l.content.cloneNode(!0));
  }
}
const c = document.createElement('template');
c.innerHTML = `  
//   <link rel="stylesheet" href="css/all.min.css" />
  <style>
    .footer {
        background-color: var(--clr-dark);
        color: var(--clr-light);
        margin:0;
    }
    .contact__title {
        text-align: center;
        font-size: 2rem;
        padding: 2rem;
        font-weight: var(--fw-bold);
    }
    .contact span {
        font-weight: var(--fw-bold);
        letter-spacing: 0.1rem;
    }
    .footer__text {
        text-align: center;
        font-weight: var(--fw-bold);
        padding: 3rem;
    }
    .contact__info {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .contact__info p {
        margin-bottom: 0.2rem;
        color: #ccc;
    }
    .contact__info p a {
        text-decoration: none;
        background-color: var(--clr-dark);
        color: #ccc;
    }
    .social__icons {
        display: flex;
        padding: 2rem 0;
    }
    .social__icons li {
        list-style: none;
    }
    
    .social__icons li a {
        position: relative;
        width: 4rem;
        height: 4rem;
        display: block;
        text-align: center;
        margin-right: 1rem;
        border-radius: 50%;
        padding: 0.4rem;
        text-decoration: none;
        background: linear-gradient(0deg, #ddd, #fff);
        transition: 0.5s;
    }
    .social__icons li a .fab {
        width: 100%;
        height: 100%;
        display: block;
        background: linear-gradient(0deg, #fff, #ddd);
        border-radius: 50%;
        line-height: calc(4rem - 1rem);
        font-size: 1.5rem;
        color: #262626;
        transition: 0.5s;
    }
    .social__icons li:nth-child(1) a:hover .fab {
        color: #3b5998;
    }
    .social__icons li:nth-child(2) a:hover .fab {
        color: #00aced;
    }
    .social__icons li:nth-child(3) a:hover .fab {
        color: #866191;
    }
    @media (min-width: 45rem) {
      .contact__info {
        flex-direction: row;
        justify-content: space-evenly;
        }
    }
  </style>
  <footer class="footer">
    <article class="contact">
        <h3 id="contact" class="contact__title">Contact</h3>
        <div class="contact__info">
        <div>
            <p><span>E-Mail:</span> tesfayeeshetie19@gmail.com</p>
            <p><span>Phone:</span> +1 804-968-9428</p>
            <p><span>Residence:</span> North Carolina, USA</p>
            <p><span>Portfolio URL:</span> <a
            href="https://www.tesfayeeshetie.com/"
            target="blank"
            >tesfayeeshetie.com</a></p>
        </div>
        <ul class="social__icons">
            <li>
            <a
                href="https://www.linkedin.com/in/tesfaye-eshetie-0945a1204/"
                target="blank"
                ><i class="fab fa-linkedin" aria-hidden="true"></i
            ></a>
            </li>
            <li>
            <a href="https://twitter.com/TesfayeEshetie1" target="blank"
                ><i class="fab fa-twitter" aria-hidden="true"></i
            ></a>
            </li>
            <li>
            <a href="https://github.com/Tesfaye-Eshetie" target="blank"
                ><i class="fab fa-brands fa-github-alt"></i
            ></a>
            </li>
        </ul>
        </div>
    </article>
    <h3 class="footer__text">Copyright, Tesfaye Eshetie, 2022</h3>
  </footer>`;
class f extends HTMLElement {
  constructor() {
    super(),
      this.attachShadow({ mode: 'open' }),
      this.shadowRoot.appendChild(c.content.cloneNode(!0));
  }
}
window.customElements.define('display-movie', h);
window.customElements.define('nav-bar', m);
window.customElements.define('contact-page', f);
const p = document.getElementById('main-page'),
  g =
    'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=593f060f152a88a8d116baf2af03797c&page=1',
  u = 'https://image.tmdb.org/t/p/w1280';
function v(i) {
  return i >= 8 ? 'green' : i >= 5 ? 'orange' : 'red';
}
const b = (i) => {
    i.forEach((t) => {
      const r = document.createElement('div');
      r.classList.add('movie'),
        (r.innerHTML = `
          <img src="${u + t.poster_path}" alt="${t.title}">
          <div class="movie-info">
              <h3>${t.title}</h3>
              <span class="${v(t.vote_average)}">${t.vote_average}</span>
          </div>
          <div class="overview">
              <h3>Overview</h3>
              ${t.overview}
          </div>
      `),
        p.appendChild(r);
    });
  },
  _ = async (i) => {
    try {
      const t = await fetch(i),
        { results: r } = await t.json();
      b(r);
    } catch (t) {
      console.log(t.message);
    }
  };
_(g);
