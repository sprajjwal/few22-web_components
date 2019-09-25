
// Start with an anonymous function

(function() {
  // Make a new Component
  // Choose an element to extend, usually HTMLElement
  class BlinkText extends HTMLElement {
    constructor() {
      super(); // MUST call super!
      // Attach a shadow root to the element.
      this._shadowRoot = this.attachShadow({ mode: 'open' });

      // 
      this._blinkEl = document.createElement('p')
      this._shadowRoot.appendChild(this._blinkEl)
      
      // Define a property for this element
      this._opacity = 1

      // Call render
      this.render()
    }

    // Lifecycle method called when this component is appeded to the DOM
    connectedCallback() {
      // console.log('>', this.innerHTML, this.innerText, this.textContent)
      this._blinkEl.innerHTML = this.innerHTML
      this._timer = setInterval(() => {
        this._opacity = this._opacity ? 0 : 1
        this._blinkEl.style.opacity = this._opacity
      }, 1000)
    }

    // Defines the attributes accessible to JS
    static get observedAttributes() {
      return ['time'] // List an array of names
    }

    // Handle changes to an attribute
    attributeChangedCallback(attributeName, oldValue, newValue) {
      
    }

    // User defined method to 'render' this component.
    render() {
      
    }
  }

  customElements.define('blink-text', BlinkText);
  // ---------


})()