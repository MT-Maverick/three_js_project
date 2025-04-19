import * as THREE from 'https://cdn.skypack.dev/three@0.149.0';

class CloudScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.cloudGroup = new THREE.Group();
        this.stars = null;
        this.originalCloudColors = null;
        this.backgroundImage = null; // Add a property to store the background image

        this.cloudParams = {
            sphereRadius: 70,
            sphereSegments: 12,
            sphereRings: 5,
            cloudColor: 0x696969,
            cloudOpacity: 0.01,
            clusterCount: 30,
            spheresPerCluster: 10,
            clusterSpreadX: window.innerWidth,
            clusterSpreadY: window.innerHeight / 2,
            clusterSpreadZ: 400 * Math.random(),
            sphereClumpFactor: 20,
            cloudSpeed: 0.6,
            cloudSpeedVariation: 0.0005,
        };

        this.starParams = {
            starCount: 800,
            starSize: 1.5,
            starOpacity: 0.9,
            starSpreadX: 1500,
            starSpreadY: 500,
            starSpreadZ: 1000,
            starColors: [0x9400D3, 0x0000FF, 0x008000, 0xffffff], // Purple, Blue, Green, white
        };

        this.init();
    }

    init() {
        this.setupRenderer();
        this.createSVGBackground();
        this.addBackgroundImage("sample.jpg");
        this.camera.position.z = 500;
        this.createClouds();
        this.createStars();
        this.animate();
        window.addEventListener('resize', this.handleWindowResize.bind(this));
        window.addEventListener('load', this.updateBackgroundImage.bind(this));
        this.applyScreenFadeIn(); // Add the fade-in effect
    }

    setupRenderer() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        const canvasContainer = document.createElement('div');
        canvasContainer.style.position = 'absolute';
        canvasContainer.style.top = '0';
        canvasContainer.style.left = '0';
        canvasContainer.style.width = '100%';
        canvasContainer.style.height = '100%';
        canvasContainer.style.zIndex = '0';
        document.body.appendChild(canvasContainer);
        canvasContainer.appendChild(this.renderer.domElement);
    }

    createClouds() {
        this.cloudGroup.clear();
        const cloudSphereGeometry = new THREE.SphereGeometry(this.cloudParams.sphereRadius, this.cloudParams.sphereSegments, this.cloudParams.sphereRings);
        const cloudMaterial = new THREE.MeshBasicMaterial({
            color: this.cloudParams.cloudColor,
            transparent: true,
            opacity: this.cloudParams.cloudOpacity,
            depthWrite: false,
        });

        this.originalCloudColors = null;

        for (let i = 0; i < this.cloudParams.clusterCount; i++) {
            const cloudCluster = new THREE.Group();
            const clusterCenterX = Math.random() * this.cloudParams.clusterSpreadX - this.cloudParams.clusterSpreadX / 2;
            const clusterCenterY = Math.random() * this.cloudParams.clusterSpreadY;
            const clusterCenterZ = Math.random() * this.cloudParams.clusterSpreadZ - this.cloudParams.clusterSpreadZ / 2;

            for (let j = 0; j < this.cloudParams.spheresPerCluster; j++) {
                const cloudSphere = new THREE.Mesh(cloudSphereGeometry, cloudMaterial);
                const sphereX = clusterCenterX + (Math.random() - 0.5) * this.cloudParams.sphereClumpFactor + (Math.random() - 0.5) * this.cloudParams.sphereClumpFactor;
                const sphereY = clusterCenterY + (Math.random() - 0.5) * this.cloudParams.sphereClumpFactor + (Math.random() - 0.5) * this.cloudParams.sphereClumpFactor;
                const sphereZ = clusterCenterZ + (Math.random() - 0.5) * this.cloudParams.sphereClumpFactor + (Math.random() - 0.5) * this.cloudParams.sphereClumpFactor;
                cloudSphere.position.set(sphereX, sphereY, sphereZ);
                cloudCluster.add(cloudSphere);
                this.originalCloudColors = (new THREE.Color(cloudMaterial.color.getHex()));
            }
            this.cloudGroup.add(cloudCluster);
        }
        this.scene.add(this.cloudGroup);
    }

    createStars() {
        const starGeometry = new THREE.BufferGeometry();

        const starVertices = [];
        const starColors = []; // Array to store colors for each star

        for (let i = 0; i < this.starParams.starCount; i++) {
            const x = Math.random() * this.starParams.starSpreadX - this.starParams.starSpreadX / 2;
            const y = Math.random() * this.starParams.starSpreadY + 100;
            const z = Math.random() * this.starParams.starSpreadZ - this.starParams.starSpreadZ / 2;
            starVertices.push(x, y, z);

            // Assign a random color from the starColors array
            const randomColor = this.starParams.starColors[Math.floor(Math.random() * this.starParams.starColors.length)];
            const color = new THREE.Color(randomColor);
            starColors.push(color.r, color.g, color.b);
        }

        starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
        starGeometry.setAttribute('color', new THREE.Float32BufferAttribute(starColors, 3)); // Add color attribute

        const starMaterial = new THREE.PointsMaterial({
            // color: this.starParams.starColor, // Removed fixed color
            size: this.starParams.starSize,
            transparent: true,
            opacity: this.starParams.starOpacity,
            depthWrite: false,
            vertexColors: true, // Enable vertex colors
        });

        this.stars = new THREE.Points(starGeometry, starMaterial);
        this.scene.add(this.stars);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        this.cloudGroup.children.forEach(cluster => {
            cluster.position.x += Math.sin(Date.now() * this.cloudParams.cloudSpeedVariation + cluster.id) * this.cloudParams.cloudSpeed;
        });

        if (this.stars) {
            this.stars.rotation.y += 0.0001;
        }

        this.renderer.render(this.scene, this.camera);
    }

    handleWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.updateBackgroundImage();
        this.createClouds();
        this.updateCloudParams(); // Update cloud parameters on resize
    
    }

    createSVGBackground() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.style.position = "absolute";
        svg.style.top = "0";
        svg.style.left = "0";
        svg.style.zIndex = "-1";
        svg.id = "svg-background";

        const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
        const linearGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
        linearGradient.setAttribute("id", "backgroundGradient");
        linearGradient.setAttribute("x1", "0%");
        linearGradient.setAttribute("y1", "0%");
        linearGradient.setAttribute("x2", "0%");
        linearGradient.setAttribute("y2", "100%");

        const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop1.setAttribute("offset", "0%");
        stop1.setAttribute("stop-color", "#000000");
        stop1.setAttribute("stop-opacity", "1");
        linearGradient.appendChild(stop1);

        const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop2.setAttribute("offset", "100%");
        stop2.setAttribute("stop-color", "#333333");
        stop2.setAttribute("stop-opacity", "1");
        linearGradient.appendChild(stop2);

        defs.appendChild(linearGradient);
        svg.appendChild(defs);

        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("width", "100%");
        rect.setAttribute("height", "100%");
        rect.setAttribute("fill", "url(#backgroundGradient)");
        svg.appendChild(rect);

        document.body.appendChild(svg);
    }

    addBackgroundImage(imageUrl) {
        this.backgroundImage = new Image(); // Store the image in the class property
        this.backgroundImage.src = imageUrl;
        this.backgroundImage.style.position = "absolute";
        this.backgroundImage.style.zIndex = "-1";
        this.backgroundImage.style.objectFit = "cover";
        this.backgroundImage.id = "background-image";
        this.backgroundImage.style.opacity = "0.8";
        this.backgroundImage.style.top = "0";
        this.backgroundImage.style.left = "0";
        this.backgroundImage.style.width = "100%";
        this.backgroundImage.style.height = "100%"; // Changed to 100%
        document.body.appendChild(this.backgroundImage);

        this.backgroundImage.onload = () => {
            this.updateBackgroundImage();
            this.applyEdgeFade(this.backgroundImage);
        };
    }

    applyEdgeFade(image) {
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const imageWidth = image.naturalWidth;
        const imageHeight = image.naturalHeight;
        const aspectRatio = imageWidth / imageHeight;

        // Calculate the fade width and height based on the smaller dimension
        const fadeSize = Math.min(windowWidth, windowHeight) * 0.1;

        image.style.maskImage = `
            linear-gradient(to right, rgba(0, 0, 0, 1) ${fadeSize}px, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 1) calc(100% - ${fadeSize}px)),
            linear-gradient(to bottom, rgba(0, 0, 0, 1) ${fadeSize}px, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 1) calc(100% - ${fadeSize}px))
        `;
        image.style.maskComposite = "intersect";
        image.style.webkitMaskImage = image.style.maskImage;
        image.style.webkitMaskComposite = "intersect";
    }

    updateBackgroundImage() {
        if (!this.backgroundImage) return;

        this.backgroundImage.style.width = "100%";
        this.backgroundImage.style.height = "100%"; // Changed to 100%
        this.backgroundImage.style.top = "0";
        this.backgroundImage.style.left = "0";

        this.applyEdgeFade(this.backgroundImage);
    }

    applyScreenFadeIn() {
        const fadeDiv = document.createElement('div');
        fadeDiv.style.position = 'fixed';
        fadeDiv.style.top = '0';
        fadeDiv.style.left = '0';
        fadeDiv.style.width = '100%';
        fadeDiv.style.height = '100%';
        fadeDiv.style.backgroundColor = 'black';
        fadeDiv.style.zIndex = '100';
        fadeDiv.style.opacity = '1';
        fadeDiv.style.transition = 'opacity 3s ease-in-out';
        fadeDiv.id = 'fade-div';
        document.body.appendChild(fadeDiv);

        setTimeout(() => {
            fadeDiv.style.opacity = '0';
        }, 100); // 0.01s delay

        setTimeout(() => {
            document.body.removeChild(fadeDiv);
        }, 2500) // 1.5s delay + 3s fade
    }
    updateCloudParams() {
        this.cloudParams.clusterSpreadX = window.innerWidth;
        this.cloudParams.clusterSpreadY = window.innerHeight / 2;
    }
}

// Initialize the scene
new CloudScene();
