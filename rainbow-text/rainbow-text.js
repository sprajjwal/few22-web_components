
// Start with an anonymous function

(function() {
  // Make a new Component
  // Choose an element to extend, usually HTMLElement
  class rainbowText extends HTMLElement {
    constructor() {
      super(); // MUST call super!
      // Attach a shadow root to the element.
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._text = this.innerHTML
      this._words = this._text.split(' ')
      this._spans = this._words.map((word, i) => {
        const span = document.createElement('span')
        span.innerHTML = word
        return span
      })
      this._spans.forEach((span, i) => {
        this._shadowRoot.appendChild(span)
      })

      this._spans.forEach((span, i) => {
        span.style.color = `hsl(${360 / this._spans.length * i}, 100%, 50%)`
      })
    }

    // Defines the attributes accessible to JS
    static get observedAttributes() {
      return [] // List an array of names
    }

    // Handle changes to an attribute
    attributeChangedCallback(attributeName, oldValue, newValue) {
      
    }

    // Lifecycle method called when this component is appeded to the DOM
    connectedCallback() {
      
    }
  }

  customElements.define('rainbow-text', rainbowText);
  // ---------
})()