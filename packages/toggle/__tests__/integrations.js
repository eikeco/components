import Toggle from '../src';

let Toggles, TogglesLocal;

const init = () => {
    // Set up our document body
    document.body.innerHTML = `<a tabindex="0" id="btn-1-1" href="#target-1" class="js-toggle_btn">Test toggle</a>
        <a href="#target-1" class="js-toggle_btn">Test toggle</a>
        <div id="target-1" class="js-toggle" data-toggle="js-toggle_btn"><div id="focusable-1-1" tabindex="0">Test focusable content</div><div tabindex="0">Test focusable content</div><div tabindex="0">Test focusable content</div></div>
        
        <a href="#target-2" class="js-toggle_btn-2">Test toggle</a>
        <div id="target-2" class="js-toggle" data-toggle="js-toggle_btn-2" data-delay="100"></div>
        
        <a href="#target-4" class="js-toggle__btn-4">Test toggle</a>
        <div id="target-4" class="js-toggle-local" data-toggle="js-toggle__btn-4"></div>
    </div>`;

    Toggles = Toggle.init('.js-toggle', {
		trapTab: true,
		closeOnBlur: true,
		focus: true
	});
	TogglesLocal = Toggle.init('.js-toggle-local', {
		local: true
	});
};

describe(`Initialisation`, () => {
    
    beforeAll(init);

    it('should return array of length 2', async () => {
      expect(Toggles.length).toEqual(2);
    });

    it('should return the expected API', () => {
        expect(Toggles[0]).not.toBeNull();
        expect(Toggles[0].node).not.toBeNull();
        expect(Toggles[0].startToggle).not.toBeNull();
        expect(Toggles[0].toggle).not.toBeNull();
        expect(Toggles[0].getState).not.toBeNull();
    });

    it('should create instance with different options based on node data-attributes from same init function', () => {
        expect(Toggles[0].getState().settings.delay).not.toEqual(Toggles[1].getState().settings.delay);
        expect(Toggles[1].getState().settings.delay).toEqual('100');
    });

});

describe('API', () => {

    it('should expose a toggle function that toggles the state of the instance', async () => {
        expect(Toggles[0].getState().isOpen).toEqual(false);
        Toggles[0].toggle();
        expect(Toggles[0].getState().isOpen).toEqual(true);
        Toggles[0].toggle();
    });
    
});

describe('Localised toggle', () => {

    it('should toggle a localised area of DOM', async () => {
        TogglesLocal[0].toggle();
        expect(TogglesLocal[0].node.parentNode.classList.contains(TogglesLocal[0].getState().statusClass)).toEqual(true);
        TogglesLocal[0].toggle();
        expect(TogglesLocal[0].node.parentNode.classList.contains(TogglesLocal[0].getState().statusClass)).toEqual(false);
    });
    
});

describe('Global toggle', () => {

    it('should toggle at the document level', async () => {
        Toggles[0].toggle();
        expect(document.documentElement.classList.contains(Toggles[0].getState().statusClass)).toEqual(true);
        Toggles[0].toggle();
        expect(document.documentElement.classList.contains(Toggles[0].getState().statusClass)).toEqual(false);
    });
    
});

describe('Multiple toggle buttons', () => {

    it('should change attributes of all toggle buttons when an instance changes state', async () => {
        const togglesExpanded = toggles => toggles.reduce((acc, curr) => {
            if(curr.getAttribute('aria-expanded') === 'false') acc = false;
            return acc;
        }, true);

        Toggles[0].toggle();
        expect(togglesExpanded(Toggles[0].getState().toggles)).toEqual(true);
        Toggles[0].toggle();
        expect(togglesExpanded(Toggles[0].getState().toggles)).toEqual(false);
    });

});

describe(`Accessibility`, () => {

    it('should add aria attributes to toggle buttons', async () => {
        expect(Toggles[0].getState().toggles[0].getAttribute('aria-controls')).toEqual(Toggles[0].node.getAttribute('id'));
        expect(Toggles[0].getState().toggles[0].getAttribute('aria-expanded')).toEqual('false');
    });

    it('should add keyboard event listener for the enter key to each toggle button', () => {
        const enter = new window.KeyboardEvent('keydown', { keyCode: 13, bubbles: true });

        Toggles[0].getState().toggles[0].dispatchEvent(enter);
        expect(Toggles[0].getState().toggles[0].getAttribute('aria-expanded')).toEqual('true');

        Toggles[0].getState().toggles[0].dispatchEvent(enter);
        expect(Toggles[0].getState().toggles[0].getAttribute('aria-expanded')).toEqual('false');
    });

    it('should add keyboard event listener for the space bar to each toggle button', () => {
        const enter = new window.KeyboardEvent('keydown', { keyCode: 32, bubbles: true });

        Toggles[0].getState().toggles[0].dispatchEvent(enter);
        expect(Toggles[0].getState().toggles[0].getAttribute('aria-expanded')).toEqual('true');

        Toggles[0].getState().toggles[0].dispatchEvent(enter);
        expect(Toggles[0].getState().toggles[0].getAttribute('aria-expanded')).toEqual('false');
    });

    it('should focus on the first focusable child node fo the target when toggled open', () => {
        Toggles[0].getState().toggles[0].dispatchEvent(new window.KeyboardEvent('keydown', { keyCode: 32, bubbles: true }));
        Toggles[0].getState().toggles[0].dispatchEvent(new window.KeyboardEvent('keydown', { keyCode: 32, bubbles: true }));
        expect(document.activeElement.getAttribute('id')).toEqual('focusable-1-1');
    });

    /*
    //This second expect doesn't pass in JSDOM but does in-browser
    //In JSDOM the activeElement remains the first focusable element of the toggle target despite the toggle being closed
    it('should refocus to last active node when toggled close', () => {
        Toggles[0].getState().toggles[0].focus();     
        Toggles[0].getState().toggles[0].dispatchEvent(new window.KeyboardEvent('keydown', { keyCode: 32, bubbles: true }));
        Toggles[0].getState().toggles[0].dispatchEvent(new window.KeyboardEvent('keydown', { keyCode: 32, bubbles: true }));
        expect(Toggles[0].getState().toggles[0].getAttribute('aria-expanded')).toEqual('false');
        expect(document.activeElement.getAttribute('id')).toEqual('btn-1-1');
    });
    */
    
});


//   it('should trigger the handleClick function toggling the className', () => {

//     basic[0].handleClick.call(basic[0].node);
//     expect(basic[0].node.classList).toContain('clicked');
//     basic[0].handleClick.call(basic[0].node);
//     expect(basic[0].node.classList).not.toContain('clicked');

//    });



    // it('should attach the handleClick eventListener to DOMElement click event to toggle className', () => {

    //     basic[0].node.click();
    //     expect(basic[0].node.classList).toContain('clicked');
    //     basic[0].node.click();
    //     expect(basic[0].node.classList).not.toContain('clicked');

    // });

// });


// describe('Options', () => {

//   it('should be passed in options', () => {
    
//     expect(withCallback[0].settings.callback).not.toBeNull();
//     expect(basic[0].settings.callback).toBeNull();

//   });

// });