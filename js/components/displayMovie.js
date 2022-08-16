const template = document.createElement('template');
template.innerHTML = `
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
    this.shadowRoot
      .querySelector('#addFav')
      .addEventListener('click', this.getAttribute('addFav'));
  }
}

export default displayMovie;
