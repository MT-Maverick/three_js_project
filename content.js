class Content {
    constructor() {
        this.title = null;
        this.init();
    }

    init() {
        this.createTitle();
        this.animateTitle();
        window.addEventListener('resize', this.handleResize.bind(this)); // Add resize listener
    }

    createTitle() {
        this.title = document.createElement('h1');
        this.title.textContent = 'Mfundosindane';
        this.title.style.position = 'fixed';
        this.title.style.bottom = '20px';
        this.title.style.left = '20px';
        this.title.style.color = 'white';
        this.title.style.fontFamily = 'Arial, sans-serif';
        this.title.style.opacity = '0';
        this.title.style.transform = 'translateY(100px)';
        this.title.style.transition = 'bottom 6s ease-in, opacity 2s ease-in';
        this.title.style.zIndex = '10';
        document.body.appendChild(this.title);

        this.updateTitleSize(); // Initial size update
    }

    animateTitle() {
        setTimeout(() => {
            this.title.style.transform = 'translateY(0)';
            this.title.style.opacity = '1';
        }, 3000);
    }

    updateTitleSize() {
        const windowWidth = window.innerWidth;

        // Define breakpoints and corresponding font sizes
        let fontSize;
        if (windowWidth >= 1200) {
            fontSize = '3em'; // Large screens
        } else if (windowWidth >= 992) {
            fontSize = '2.5em'; // Medium screens
        } else if (windowWidth >= 768) {
            fontSize = '2em'; // Small screens
        } else if (windowWidth >= 576) {
            fontSize = '1.7em'; // Extra small screens
        } else {
            fontSize = '1.5em'; // Very small screens
        }

        // Define breakpoints and corresponding padding
        let padding;
        if (windowWidth >= 1200) {
            padding = '20px'; // Large screens
        } else if (windowWidth >= 992) {
            padding = '15px'; // Medium screens
        } else if (windowWidth >= 768) {
            padding = '10px'; // Small screens
        } else {
            padding = '5px'; // Extra small screens
        }

        this.title.style.fontSize = fontSize;
        this.title.style.left = padding;
        this.title.style.bottom = padding;
    }

    handleResize() {
        this.updateTitleSize();
    }
}

new Content();
