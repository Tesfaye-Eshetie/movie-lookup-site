const template = document.createElement('template');
template.innerHTML = `
  <style>
    .card {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 80vw;
      margin: 1rem auto;
      border: 1px solid var(--clr-dark);
      border-radius: 2rem;
      box-shadow: -1px -1px 1px var(--clr-dark);
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
      box-shadow: 2px 2px var(--clr-dark);
      margin: 1rem .5rem;
      object-fit: cover;
      align-self: center;
    }
    .card h2 {
      font-weight: var(--fw-black);
      margin-bottom: 1rem;
      text-align: center;
      text-transform:uppercase;
    }
    .card ul {
      margin: .8rem;
    }
    .card ul li {
      list-style: none;
      line-height: 1.4rem;
      padding-left: 1rem;
    }
    
    .card .span-flex {
      font-weight: var(--fw-bold);
      font-size: 1.2rem;
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
      <p><span class="span-flex">Plot:  </span><span id="plot"></span></p>
    </div>
  </div>`;

class displayMovie extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector('img').src = this.getAttribute('poster');
    this.shadowRoot.querySelector('#title').textContent =
      this.getAttribute('title');
    this.shadowRoot.querySelector(
      '#year'
    ).textContent = `Year: ${this.getAttribute('year')} `;
    this.shadowRoot.querySelector('#rating #one').innerHTML =
      this.getAttribute('rating_0');
    this.shadowRoot.querySelector('#rating #two').innerHTML =
      this.getAttribute('rating_1');
    this.shadowRoot.querySelector('#rating #three').innerHTML =
      this.getAttribute('rating_2');
    this.shadowRoot.querySelector('#date').textContent =
      this.getAttribute('date');
    this.shadowRoot.querySelector('#plot').textContent =
      this.getAttribute('plot');
  }
}

export default displayMovie;
