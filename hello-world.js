
// Define a class that extends HTMLElement
// You can also extend specific tags 
// Like: HTMLParagraphElement
// Some elements can't have a shadow root attached to them 
// for security reasons.

// The clode below defines a Web Component
// The Component is defined as a class
// You register this class with the document to define a new tag
// Your new tag can define a shadow DOM call it the shadowRoot
// Within the shadowRoot you can define an HTML structure
// You can also assign styles
// Within the class think of "this" as actual tag that exists
// Everything that exists in the shadows will be attached to the shadow root that you create

// Make a new Component
class HelloWorld extends HTMLElement {
  constructor() {
    super(); // MUST call super!
    // Attach a shadow root to the element.
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    // open: Elements of the shadow root are accessible from JavaScript outside the root
    // closed: Denies access to the node(s) of a closed shadow root from JavaScript outside it
    
    this._name = null // Handle default values in connectedCallBack()
    console.log('---- constructor ----')
    console.log(this.innerText)
    console.log(this.innerHTML)
  }

  // Lifecycle method called when this component is appeded to the DOM
  connectedCallback() {
    const name = this.getAttribute('name')
    this._name = name !== null ? name : '???'
    this.render()

    console.log('---- connected ----')
    console.log(this.innerText)
    console.log(this.innerHTML)
  }
  

  // Defines the attributes accessible to JS
  static get observedAttributes() {
    return ['name', 'stuff', 'width'] // List an array of names
  }

  // Handle changes to an attribute
  attributeChangedCallback(attributeName, oldValue, newValue) {
    if (attributeName === 'name') {
      this._name = newValue
      this.render()
    }
  }

  // User defined method to 'render' this component.
  render() {
    this._shadowRoot.innerHTML = `<p>hello world - ${this._name}</p>`;
  }
}

customElements.define('hello-world', HelloWorld);
// ---------


