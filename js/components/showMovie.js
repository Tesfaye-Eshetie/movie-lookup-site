const template = document.createElement('template');
template.innerHTML = `
  <style>
    main {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .movie {
        width: 300px;
        margin: 1rem;
        background-color: var(--secondary-color);
        box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2);
        position: relative;
        overflow: hidden;
        border-radius: 3px;
    }

    .movie img {
        width: 100%;
    }

    .movie-info {
        color: #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.5rem1rem 1rem;
        letter-spacing: 0.5px;
    }
    .moie-info h3 {
        margin-top:  0;
    }

    .movie-info span {
        background-color: var(--primary-color);
        padding: 0.25rem 0.5rem;
        border-radius: 3px;
        font-weight: bold;
    }

    .movie-info span.green {
        color: lightgreen;
    }
    .movie-info span.orange {
        color: orange;
    }
    .movie-info span.red {
        color: red;
    }

    .overview {
        background-color: #fff;
        padding: 2rem;
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        max-height: 100%;
        transform: translateY(101%);
        transition: transform 0.3s ease-in;
    }

    .movie:hover .overview {
        transform: translateY(0)
    }
  </style>
  <div class="main" >
    <img >
    <div class="movie-info">
        <h3 id="title"></h3>
        <span id="rating"></span>
    </div>
    <div class="overview">
        <h3>Overview</h3>
        <p id="overview"></p>
    </div>
  </div>`;

class showMovie extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector('img').src = this.getAttribute('poster');
    // this.shadowRoot.querySelector('img').src = this.getAttribute('alt');
    this.shadowRoot.querySelector('#title').textContent =
      this.getAttribute('title');
    this.shadowRoot.querySelector('#rating').textContent =
      this.getAttribute('rating');
    // this.shadowRoot.querySelector('#rating').textContent =
    this.getAttribute('class');
    this.shadowRoot.querySelector('#overview').innerHTML =
      this.getAttribute('overview');
  }
}

export default showMovie;
