(function() {
  // Define a template - This is the default markup 
  // that will live in the shadow root. 
  // This markup also includes styles in the form of a 
  // style tag. 
  const template = document.createElement('template')
  template.innerHTML = `
    <style>
      :host > div {
        position: relative; /* imgs are position absolute */
        border: 4px solid #000; 
        display: inline-block;
        overflow: hidden;
      }

      #img-a, #img-b {
        /* Stack these images up b in front a */
        position: absolute;
        left: 0; 
        top: 0;
      }

      /* Use this to animate the crossfade */
      @keyframes fade-out {
        0% { opacity: 1; }
        100% { opacity: 0; }
      }
    </style>
    <div class="container">
      <img id="img-a"> <!-- a is behind b -->
      <img id="img-b">
    </div>
  `
  // ---

  // This class will contain the code that backs the new element
  // The should extend HTMLElement
  class SimpleSlides extends HTMLElement {
    constructor() {
      super() // You must call super!

      // Create a shadow root node
      this._shadowRoot = this.attachShadow({ mode: 'open' })
      // Append a clone of the template to the shadow root
      this._shadowRoot.appendChild(template.content.cloneNode(true))
      // Get a reference to the the img tags in the template
      this._imgA = this._shadowRoot.querySelector('#img-a')
      this._imgB = this._shadowRoot.querySelector('#img-b')
      // Keep track of the index of the current image displayed
      this._index = 0;
    }

    // Lifecycle method - Called when the element is added to the DOM
    connectedCallback() {
      // Start the timer
      this._timer = setInterval(() => {
        this._nextImg()
      }, 3000)

      // customElements.whenDefined('simple-slides').then(() => {
        // Call on a couple setup methods 
        this._setSize()
        this._showImg()
        // Set the src for the first image
        this._imgB.src = this._imgs[0].src
      // })
    }

    // Lifecycle method - Called when the element is removed from the DOM
    disconnectedCallback() {
      clearInterval(this._timer)
    }

    // Helper method - This method finds the min width and height 
    // between all images. 
    _setSize() {
      // Let's reduce the array of imgs to a size object with 
      // a width and height. 
      // The goal is to get the smallest width and smallest height. 
      // With these numbers you can create a rectangle that will 
      // show any of the images without any blank space.

      const size = this._imgs.reduce((obj, img, i) => {
        // TODO: The width and height need to be defined on the img 
        // tags inside the simple-slides. If these are not defined 
        // we need to make best guess or provide a warning? 

        const w = img.width // Number(img.getAttribute('width'))
        const h = img.height // Number(img.getAttribute('height'))
        
        // If it's the first image just get the width and height
        if (i === 0) {
          obj.width = w
          obj.height = h 
          return obj
        }

        // Otherwise...

        // Check if this width is smaller 
        if (w < obj.width) {
          obj.width = w
        }
        // Check if the height is smaller
        if (h < obj.height) {
          obj.height = h
        }
        // We're reducing return the acculator
        return obj
      }, { width: null, height: null }) // Define the default acculator

      // Now that we've got the size setup the container. 
      const container = this._shadowRoot.querySelector('.container')
      container.style.width = `${size.width}px`
      container.style.height = `${size.height}px`
    }

    // getter - returns the array of methods. 
    // TODO: Better to get the src strings from all of the images 
    // and put these in an array
    // TODO: Need to handle the situation where a new img could be 
    // added to the DOM. There is probably a Component updated 
    // callback or other observer...
    get _imgs() {
      // querySelectorAll() returns an Array Like convert it to a 
      // standard Array with Array.from(arrayLikeObject)
      return Array.from(this.querySelectorAll('img'))
    }

    // Helper method - Shows the next image. The current img is moved
    // imgB and the new img is set to im
    _showImg() {
      const imgs = this._imgs
      const img = imgs[this._index]
      this._imgA.src = this._imgB.src
      // Restarting a CSS animation is not as easy as you'd think
      // https://css-tricks.com/restart-css-animation/
      this._imgB.style.animation = ''
      void this._imgB.offsetWidth
      this._imgB.style.animation = 'fade-out 3s'
      // this._imgA.style.opacity = 0
      this._imgB.src = img.src
    }

    // Helper method - advances the index then shows the new image
    _nextImg() {
      this._index = (this._index + 1) % this._imgs.length
      this._showImg()
    }
  }

  // ---
  // Define the element 
  customElements.define('simple-slides', SimpleSlides)
})()