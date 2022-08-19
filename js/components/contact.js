const template = document.createElement('template');
template.innerHTML = `  
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

class contact extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

export default contact;
