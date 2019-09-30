
// Start with an anonymous function

// IIFE
(function() {
  // Make a new Component
  // Choose an element to extend, usually HTMLElement
  class Copyright extends HTMLElement {
    constructor() {
      super(); // MUST call super!
      // Attach a shadow root to the element.
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._p = document.createElement('p')
      this._specialMessage = this.innerHTML
      const date = new Date()
      this._year = date.getFullYear()
      this._message =''
      this._p.innerHTML = `Copyright ${this._year} ${this._message} ${this._specialMessage}`
      this._p.style.color = 'orange' // <p style="color:orange">
      this._shadowRoot.appendChild(this._p)
    }

    // Defines the attributes accessible to JS
    static get observedAttributes() {
      return ['year', 'message'] // List an array of attribute names
    }

    // Handle changes to an attribute
    attributeChangedCallback(attributeName, oldValue, newValue) {
      switch(attributeName) {
        case 'year':
            this._year = newValue
            this.render()
            break
        case 'message':
            this._message = newValue
            this.render()
            break
      }
    }

    // Lifecycle method called when this component is appeded to the DOM
    connectedCallback() {
      // Do things when component is added to the DOM
    }

    render() {
      this._p.innerHTML = `Copyright ${this._year} ${this._message} ${this._specialMessage}`
    }

  } // --------

  customElements.define('copy-right', Copyright);
  // ---------
})()