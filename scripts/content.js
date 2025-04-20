class Content {
    constructor() {
        this.title = document.createElement('h1');
        this.init();
    }


    
    handleResize() {
        // Update the underline position on resize
        this.updateUnderline();
    }

    init() {
        this.createTitle();
        this.animateTitle();
        window.addEventListener('resize', this.handleResize.bind(this)); // Add resize listener
    }
   
   
    createTitle() {
        this.title.textContent = 'Long Live The King';
        this.title.style.fontSize = '100%';
        this.title.style.position = 'absolute';
        this.title.style.bottom = '40%';
        this.title.style.left = '7%';
        this.title.style.color = 'gray';
        this.title.style.fontFamily = 'Arial, sans-serif';
        this.title.style.opacity = '0'; // Start with opacity 0
        this.title.style.transform = 'translateY(100px)';
        this.title.style.transition = 'transform 4s cubic-bezier(0.3, 0.87, 1, 0.1), opacity 2s cubic-bezier(0.3, 0.87, 1, 0.1)'; // Separate transitions
        this.title.style.zIndex = '10';
        document.body.appendChild(this.title);


        // Create and add the custom underline
        this.underline = document.createElement('div');
        this.underline.style.position = 'absolute';
        this.underline.style.bottom = '-5px'; // Adjust position relative to the text
        this.underline.style.height = '3px'; // Adjust thickness
        this.underline.style.borderRadius = '2px'; // Adjust border radius
        this.underline.style.backgroundColor = 'gray';
        this.underline.style.overflow = 'hidden';
        this.underline.style.width = '100%';
        this.underline.style.opacity = '0'; // Start with opacity 0
        this.title.appendChild(this.underline);

        // Create the left and right parts of the underline
        this.leftUnderline = document.createElement('div');
        this.leftUnderline.style.position = 'absolute';
        this.leftUnderline.style.left = '0';
        this.leftUnderline.style.top = '0';
        this.leftUnderline.style.height = '100%';
        this.leftUnderline.style.width = '0';
        this.leftUnderline.style.backgroundColor = 'white';
        this.leftUnderline.style.transition = 'width 2s cubic-bezier(0.3, 0.87, 1, 0.1)';
        this.underline.appendChild(this.leftUnderline);

        this.rightUnderline = document.createElement('div');
        this.rightUnderline.style.position = 'absolute';
        this.rightUnderline.style.right = '0';
        this.rightUnderline.style.top = '0';
        this.rightUnderline.style.height = '100%';
        this.rightUnderline.style.width = '0';
        this.rightUnderline.style.backgroundColor = 'white';
        this.rightUnderline.style.transition = 'width 2s cubic-bezier(0.02, 0.88, 0.78, 0.63)';
        this.underline.appendChild(this.rightUnderline);
    }


    animateTitle() {
        setTimeout(() => {
            // Start the translation and opacity animation
            this.title.style.transform = 'translateY(0)';
            this.title.style.opacity = '0.5'; // Opacity to 50% during translation

            // Wait for the translation to complete, then start the underline animation
            setTimeout(() => {
                this.title.style.opacity = '1'; // Opacity to 100%
                this.underline.style.opacity = '1';
                this.animateUnderline();
            }, 4000); // 4s = 4000ms (translation duration)

            setTimeout(() => {
                this.removeTitleAndShowDetails();
            }, 6000); // 6s after the initial animation starts
        }, 2000);
    }

    animateUnderline() {
        const titleWidth = this.title.offsetWidth;
        this.leftUnderline.style.width = `${titleWidth / 2}px`;
        this.rightUnderline.style.width = `${titleWidth / 2}px`;
    }

    updateUnderline() {
        // Reset the underline width before recalculating
        this.leftUnderline.style.width = '0';
        this.rightUnderline.style.width = '0';

        // Recalculate and animate the underline
        this.animateUnderline();
    }
}

new Content();
