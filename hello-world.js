
// Define a class that extends HTMLElement
// You can also extend specific tags 
// Like: HTMLParagraphElement
// Some elements can't have a shadow root attached to them 
// for security reasons.

class HelloWorld extends HTMLElement {
  constructor() {
    super(); // MUST call super!
    // Attach a shadow root to the element.
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    // open: Elements of the shadow root are accessible from JavaScript outside the root
    // closed: Denies access to the node(s) of a closed shadow root from JavaScript outside it
    
    // Define a property for this element
    this._name = ''
  }

  // Defines the attributes accessible to JS
  static get observedAttributes() {
    return ['name'] // List an array of names
  }

  // Handle changes to an attribute
  attributeChangedCallback(name, oldValue, newValue) {
    console.log('att changed call back')
    console.log(name, oldValue, newValue)
    if (name === 'name') {
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

  render() {
    this._shadowRoot.innerHTML = `<p>hello world ${this._name}</p>`;
  }
}
customElements.define('hello-world', HelloWorld);

// ---------


