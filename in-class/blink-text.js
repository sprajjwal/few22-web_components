
// Start with an anonymous function

(function() {
  // Make a new Component
  // Choose an element to extend, usually HTMLElement
  class Blink extends HTMLElement {
    constructor() {
      super(); // MUST call super!
      // Attach a shadow root to the element.
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._span = document.createElement('span')
      this._textBody = this.innerHTML
      this._shadowRoot.appendChild(this._span)
      this._span.innerHTML = this._textBody
      this._span.style.transition = "1000ms"
      this._visibility = 1
      setInterval(() => {
        this._visibility = this._visibility === 1 ? 0 : 1
        this._span.style.opacity = this._visibility
        }, 3000);

    }

    // <shadowRoot></shadowRoot>
    // <span></span>
    // 'Mello World'
    // <shadowRoot><span></span></shadowRoot>
    // <shadowRoot><span style="opacity">Mello World</span></shadowRoot>

    // Defines the attributes accessible to JS
    static get observedAttributes() {
      return [] // List an array of attribute names
    }

    // Handle changes to an attribute
    attributeChangedCallback(attributeName, oldValue, newValue) {
      if (attributeName === '???') {
        // handle changes to an attribute

      }
    }

    // Lifecycle method called when this component is appeded to the DOM
    connectedCallback() {
      // Do things when component is added to the DOM
    }
  }

  customElements.define('blink-text', Blink);
  // ---------


})()