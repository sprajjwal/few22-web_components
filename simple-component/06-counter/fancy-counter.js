
class FancyCounter extends HTMLElement {
  constructor() {
    super();
		
		// Create a shadow node
    this._shadowRoot = this.attachShadow({ mode: 'open' });

    // Create a container element
		this._container = document.createElement('div');
		// Append the container to the shadow root
		this._shadowRoot.appendChild(this._container);
		
		// Create three elements left button display and right button
		this._display = document.createElement('div')
		this._leftButton = document.createElement('div')
		this._rightButton = document.createElement('div')

		// Append all three elements to the container
		this._container.appendChild(this._leftButton)
		this._container.appendChild(this._display)
		this._container.appendChild(this._rightButton)


		this._leftArrow = document.createElement('div')
		this._rightArrow = document.createElement('div')

		this._leftButton.appendChild(this._leftArrow)
		this._rightButton.appendChild(this._rightArrow)

		this._leftArrow.style.width = '8px'
		this._leftArrow.style.height = '8px'
		this._leftArrow.style.borderTop = '3px solid'
		this._leftArrow.style.borderRight = '3px solid'
		this._leftArrow.style.transform = 'rotate(-135deg)'

		this._rightArrow.style.width = '8px'
		this._rightArrow.style.height = '8px'
		this._rightArrow.style.borderTop = '3px solid'
		this._rightArrow.style.borderRight = '3px solid'
		this._rightArrow.style.transform = 'rotate(45deg)'


		// Style the container use display: flex
		this._container.style.margin = '3px'
		this._container.style.display = 'flex'
		this._container.style.flexDirection = 'row'

		// Style the left and right element. These should look like a buttons
		this._leftButton.style.padding = '1em'
		this._leftButton.style.backgroundColor = '#eee'
		this._leftButton.style.display = 'flex'
		this._leftButton.style.justifyContent = 'center'
		this._leftButton.style.alignItems = 'center'
		this._leftButton.style.borderTopLeftRadius = '0.5em'
		this._leftButton.style.borderBottomLeftRadius = '0.5em'
		this._leftButton.style.borderTop = '3px solid'
		this._leftButton.style.borderLeft = '3px solid'
		this._leftButton.style.borderBottom = '3px solid'

		this._rightButton.style.padding = '1em'
		this._rightButton.style.backgroundColor = '#eee'
		this._rightButton.style.display = 'flex'
		this._rightButton.style.justifyContent = 'center'
		this._rightButton.style.alignItems = 'center'
		this._rightButton.style.borderTopRightRadius = '0.5em'
		this._rightButton.style.borderBottomRightRadius = '0.5em'
		this._rightButton.style.borderTop = '3px solid'
		this._rightButton.style.borderRight = '3px solid'
		this._rightButton.style.borderBottom = '3px solid'

		// Style the dipslay element. We need a big number
		this._display.style.padding = '1em'
		this._display.style.borderTop = '3px solid'
		this._display.style.borderBottom = '3px solid'

		// Define some properties to track the value displayed in the component
		this._value = 0
		this._step = 1
		this._max = 10
		this._min = 0

		// Display the value in the display element
		this._update()
	
		// Add an event to the left button. The left button should add 1 to 
		// the value and update the value displayed 
		this._increment = this._increment.bind(this)


		// Add an event to the right button that subtracts 1 from the value
		// then update the value displayed. 
		this._decrement = this._decrement.bind(this)
	}
	
	// Use this increase the value 
	_increment(e) {
		const newValue = this._value + this._step
		if (newValue <= this._max) {
			this._value = newValue
		}
		this._update()
	}

	// Use this to decrement your value
	_decrement(e) {
		const newValue = this._value - this._step
		if (newValue <= this._max) {
			this._value = newValue
		}
		this._update()
	}

	// Use this to update the value displayed
	_update() {
		this._display.innerHTML = this._value
		this.dispatchEvent(new Event('change'))
	}


  // Tell this component it should look for changes to time
  static get observedAttributes() {
    return [];
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
		this._leftButton.removeEventListener('click', this._decrement)
  }
}

customElements.define('fancy-counter', FancyCounter);


/*

Your goal is to create a counter component. The counter should display a value
and two buttons that increment and decrement the value. It might look like this: 

< 0 >

- Challenge - 1 - 

Read through the code snippet above. Follow the comments and build the counter component. 

- Challenge - 2 - 

Use some nested elements to create arrows inside the left and right buttons. 

- Challenge - 3 - 

The counter would be even better if you could configure the min and max range and the 
step value. To do this you'll need to define some attributes. 

Add min, max, value, and step to the list of observedAttibutes. 

Look for changes in these attributes with the attributeChangedCallback() Inside this method 
add an if else of switch statement. You'll need to look at the name to determine the value 
of to be set. 

if (name === 'vlaue') {
	// set the value to newValue
	// update the displayed value
} else if (name === 'min') {
	// set the min value
	// ...
} else if () {
	// etc. 
}

*/
