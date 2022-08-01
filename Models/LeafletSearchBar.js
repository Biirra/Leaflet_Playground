/*
	Name					Data passed			   Description

	Public methods:
	 showAlert()            'Text message'         show alert message
*/

class SearchBar extends L.Control {
    _includes = L.version[0]==='1' ? L.Evented.prototype : L.Mixin.Events;
    _options = {
		container: '',					//container id to insert Search Control		
		collapsed: true,				//collapse search control at startup
		autoCollapse: true,				//collapse search control after submit
		autoCollapseTime: 1200,			//delay for autoclosing alert and collapse after blur
		textErr: 'Location not found',	//error message
		textCancel: 'Cancel',		    //title in cancel button		
		textPlaceholder: 'SR10001...',  //placeholder value
        position: 'topleft',
	};

    constructor(options) {
        super(options);
        this.init();
        console.log('SearchBar: constructor');
    }

    init(options) {
		L.Util.setOptions(this, options || {}); 
		this._inputMinSize = this.options.textPlaceholder ? this.options.textPlaceholder.length : 10; //set input min size
	}

   
	// fired when this is added to the map.
    onAdd(map) {
		this._map = map; 
		this._container = L.DomUtil.create('div', 'leaflet-control-search'); //create container
		this._input = this._createInput(this.options.textPlaceholder, 'search-input'); //create input
		this._cancel = this._createCancel(this.options.textCancel, 'search-cancel'); //create cancel button
		this._button = this._createButton(this.options.textPlaceholder, 'search-button'); //create button
		this._alert = this._createAlert('search-alert'); //create alert

		if(this.options.collapsed===false) 
			this.expand(this.options.collapsed); //expand search control

		return this._container;
	}

	addTo(map) {

		if(this.options.container) {
			this._container = this.onAdd(map); //add to map
			this._wrapper = L.DomUtil.get(this.options.container); //create wrapper
			this._wrapper.style.position = 'relative'; //set position relative
			this._wrapper.appendChild(this._container); //append container to wrapper
		}
		else
			L.Control.prototype.addTo.call(this, map); 

		return this;
	}

	onRemove(map) {
		// called when Searchbar is removed dynamicly.
	}

    showAlert(text) {
		var self = this;
		text = text || this.options.textErr; //set default error message
		this._alert.style.display = 'block'; //show alert
		this._alert.innerHTML = text; //set alert text
		clearTimeout(this.timerAlert); //clear timer
		
		this.timerAlert = setTimeout(function() { //set timer
			self.hideAlert(); //hide alert
		},this.options.autoCollapseTime); 
		return this; 
	}
	
	hideAlert() {
		this._alert.style.display = 'none';
		return this;
	}
		
	cancel() {
		this._input.value = '';
		this._handleKeypress({ keyCode: 8 }); //simulate backspace keypress
		this._input.size = this._inputMinSize; //reset input size
		this._input.focus(); //focus on input
		this._cancel.style.display = 'none';
		return this;
	}
	
	expand(toggle) {
		toggle = typeof toggle === 'boolean' ? toggle : true;   //set default toggle to true
		this._input.style.display = 'block';                    //show input
		L.DomUtil.addClass(this._container, 'search-exp');      //add class to container
		if ( toggle !== false ) {
			this._input.focus();
			this._map.on('dragstart click', this.collapse, this); //add event listener
		}
		//this.fire('search:expanded');
		return this;	
	}

	collapse() {
		this.cancel();

		// set alert style to none if its not already.
		if(this._alert.style.display !== 'none') this._alert.style.display = 'none';

		this._input.blur(); //blur input

		// set input style to none if its not already.
		if(this._input.style.display !== 'none') this._input.style.display = 'none';

		// set cancel button style to none if its not already.
		if(this._cancel.style.display !== 'none') this._cancel.style.display = 'none';

		L.DomUtil.removeClass(this._container, 'search-exp'); //remove class from container
		this._map.off('dragstart click', this.collapse, this); //remove event listener

		//this.fire('search:collapsed');
		return this;
	}
	
	collapseDelayed() {	//collapse after delay, used on_input blur
		var self = this;
		if (!this.options.autoCollapse) return this; //if auto collapse is false, return

		clearTimeout(this.timerCollapse); //clear timer. 

		this.timerCollapse = setTimeout(function() { //set timer. 
			self.collapse(); 
		}, this.options.autoCollapseTime);

		return this;		
	}

	collapseDelayedStop() {
		clearTimeout(this.timerCollapse);
		return this;		
	}

    ////start DOM creations
	_createAlert(className) {
		var alert = L.DomUtil.create('div', className, this._container);
		alert.style.display = 'none';

		L.DomEvent
			.on(alert, 'click', L.DomEvent.stop, this)
			.on(alert, 'click', this.hideAlert, this);

		return alert;
	}

	_createInput(text, className) {
		var self = this;
        console.log(text, className, this);
		var label = L.DomUtil.create('label', className, this._container);
		var input = L.DomUtil.create('input', className, this._container);
		input.type = 'text';
		input.size = this._inputMinSize;
		input.value = '';
		input.autocomplete = 'off';
		input.autocorrect = 'off';
		input.autocapitalize = 'off';
		input.placeholder = text;
		input.style.display = 'none';
		input.role = 'search';
		input.id = input.role + input.type + input.size;
		
		label.htmlFor = input.id;
		label.style.display = 'none';
		label.value = text;

		L.DomEvent
			.disableClickPropagation(input)
			.on(input, 'keyup', this._handleKeypress, this)
			.on(input, 'paste', function(e) {
				setTimeout(function(e) {
					self._handleKeypress(e);
				},10,e);
			}, this)
			.on(input, 'blur', this.collapseDelayed, this)
			.on(input, 'focus', this.collapseDelayedStop, this);
		
		return input;
	}

	_createCancel(title, className) {
		var cancel = L.DomUtil.create('a', className, this._container);
		cancel.href = '#';
		cancel.title = title;
		cancel.style.display = 'none';
		cancel.innerHTML = "<span>&otimes;</span>";//imageless(see css)

		L.DomEvent
			.on(cancel, 'click', L.DomEvent.stop, this)
			.on(cancel, 'click', this.cancel, this);

		return cancel;
	}
	
	_createButton(title, className) {
		var button = L.DomUtil.create('a', className, this._container);
		button.href = '#';
		button.title = title;

		L.DomEvent
			.on(button, 'click', L.DomEvent.stop, this)
			.on(button, 'click', this._handleSubmit, this)
			.on(button, 'focus', this.collapseDelayedStop, this)
			.on(button, 'blur', this.collapseDelayed, this);

		return button;
	}

	//////end DOM creations

    // fires when the user submits the input in the search field
	_handleKeypress(e){	//run _input keyup event

		var self = this;

        // handle the submit based on which key was pressed
		switch(e.keyCode)
		{
			case 27://Esc
				this.collapse();
			break;
			case 13://Enter
				this._handleSubmit();	//do search
			break;
			case 38://Up
			break;
			case 40://Down
			break;
			case  8://Backspace
			case 45://Insert
			case 46://Delete
			break;
			case 37://Left
			case 39://Right
			case 16://Shift
			case 17://Ctrl
			case 35://End
			case 36://Home
			break;
			default://All keys
				if(this._input.value.length)
					this._cancel.style.display = 'block';
				else
					this._cancel.style.display = 'none';
		}
	}

	_handleSubmit() {	//button and tooltip click and enter submit

		this.hideAlert();

		if(this._input.style.display == 'none'){	//on first click show _input only
			this.expand();
			return;
		}

		if(this._input.value === ''){	//hide _input only
			this.collapse();
		}
		else{
			
			const input = this._input.value; // input of user. Probably the text we need to search SR's on.

            this.onSubmit(input);

			// when done with searching close the input.
			if(this._options.autoCollapse){
				this.collapse();
			}
		}
	}  

    /**
     * Handles the search input. Input should be filled by the SearchBar.
     * Designed to be overridden if you want to do something else with the input.
     * Extend this class and override this method for proper use.
     * @param {String} input The input value given by the user. from the input field.
     */
    onSubmit(input) {
        if(!input){
            this.showAlert();
            console.warn("No input given to SearchBar.onSubmit(). Input is expected. Input: " + input);
            return;
        }
        console.log("Input given by user: ", input);
    }

     /**
     * get path of property in object
     * @param {Object} obj object to get property
     * @param {String} prop path to property
     * @returns {Object} property value
     */
      _getPath(obj, prop) { 
		const parts = prop.split('.'); //split string to array
		const last = parts.pop(); //get last part
		const len = parts.length; //get length of array
		let cur = parts[0]; //get first part
		let i = 1 ; //start from 1

		if(len > 0) //if length of array > 0
			while((obj = obj[cur]) && i < len) //while object not null and i < length of array
				cur = parts[i++]; //get next part

		if(obj) //if object not null
			return obj[last]; //return last part
	}

}
