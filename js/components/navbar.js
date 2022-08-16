const template = document.createElement('template');
template.innerHTML = `
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

class navbar extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default navbar;
