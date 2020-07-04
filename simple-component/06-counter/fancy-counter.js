
class FancyCounter extends HTMLElement {
  constructor() {
    super();
    
    this._shadowRoot = this.attachShadow({ mode: 'open' });

    // Make a new element to hold the other elements
    this._container = document.createElement('div')
		this._shadowRoot.appendChild(this._container)
		
		// Holds the value
		this._display = document.createElement('div')
		// Buttons
		this._leftButton = document.createElement('div')
		this._rightButton = document.createElement('div')

		// Add these to the container
		this._container.appendChild(this._leftButton)
		this._container.appendChild(this._display)
		this._container.appendChild(this._rightButton)

		// Set inner text of the button elements
		this._leftButton.innerHTML = '<'
		this._rightButton.innerHTML = '>'

		// Define some properties used by the counter
		this._value = 0
		this._step = 1
		this._max = 10
		this._min = 0

		this._update()

		// Style the elements
		// The container will use flex box
		this._container.style.display = 'flex'
		// Style the buttons
		this._leftButton.style.padding = '1em'
		this._rightButton.style.padding = '1em'
		this._display.style.padding = '1em'
		this._leftButton.style.backgroundColor = '#eee'
		this._rightButton.style.backgroundColor = '#eee'

		this._increment = this._increment.bind(this)
		this._decrement = this._decrement.bind(this)

	}
	
	_increment(e) {
		const newValue = this._value + this._step
		if (newValue <= this._max) {
			this._value = newValue
		}
		this._update()
	}

	_decrement(e) {
		const newValue = this._value - this._step
		if (newValue >= this._min) {
			this._value = newValue
		}
		this._update()
	}

	_update() {
		this._display.innerHTML = this._value
		this.dispatchEvent(new Event('change'))
	}


  // Tell this component it should look for changes to time
  static get observedAttributes() {
    return ['value', 'min', 'max', 'step'];
  }  


  // Handle changes to time
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') {
			this._value = parseInt(newValue)
			this._update()
    } else if (name === 'min') {
			this._min = parseInt(newValue)
		} else if (name === 'max') {
			this._max = parseInt(newValue)
		} else if (name === 'step') {
			this._step = newValue
		}
  }


  connectedCallback() {
    this._rightButton.addEventListener('click', this._increment)
		this._leftButton.addEventListener('click', this._decrement)
  }

  disconnectedCallback() {
    this._rightButton.removeEventListener('click', this._increment)
		this._leftButton.addEventListener('click', this._decrement)
  }
}

customElements.define('fancy-counter', FancyCounter);


/*

- Challenge - 1 - 

This component has some practical uses. It some better styles. 

- Replace the < and > text in the button with a styled element
	- create a new element div
	- Append this as a child to the right button
	- Apply styles 
		- border top and right
		- rotate 45 deg
	- Repeat for the left button

- Challenge - 2 - 

- Replace the display element, currently a div, with an input. 
- Add a listener looking for change events. Update the _value when a change occurs. 

*/