
// Start with an anonymous function

(function() {
  // Make a new Component
  // Choose an element to extend, usually HTMLElement
  class webComponentBase extends HTMLElement {
    constructor() {
      super(); // MUST call super!
      // Attach a shadow root to the element.
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      
      // Define a property for this element
      this._name = ''

      // Call render
      this.render()
    }

    // Defines the attributes accessible to JS
    static get observedAttributes() {
      return ['name', 'stuff', 'width'] // List an array of names
    }

    // Handle changes to an attribute
    attributeChangedCallback(attributeName, oldValue, newValue) {
      console.log('att changed call back')
      console.log(attributeName, oldValue, newValue)
      if (attributeName === 'name') {
        this._name = newValue
        this.render()
      }
    }

    // Lifecycle method called when this component is appeded to the DOM
    connectedCallback() {
      const name = this.getAttribute('name')
      this._name = name ? name : ''
      this.render()
    }

    // User defined method to 'render' this component.
    render() {
      this._shadowRoot.innerHTML = `<p>hello world ${this._name}</p>`;
    }
  }

  customElements.define('hello-world', webComponentBase);
  // ---------


})()