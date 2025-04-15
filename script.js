import * as THREE from 'https://cdn.skypack.dev/three@0.149.0';

// --- Scene Setup ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// --- Cloud Parameters ---
const cloudParams = {
    sphereRadius: 70,
    sphereSegments: 20,
    sphereRings: 20,
    cloudColor: 0x696969,
    cloudOpacity: 0.01,
    clusterCount: 50,
    spheresPerCluster: 10,
    clusterSpreadX: 1000, // Wider spread
    clusterSpreadY: 200, // Higher up
    clusterSpreadZ: 400,
    sphereClumpFactor: 20, // How much spheres clump together
    cloudSpeed: 0.6,
    cloudSpeedVariation: 0.0005,
};

// --- Cloudy Background Creation ---
const cloudGroup = new THREE.Group();
const cloudSphereGeometry = new THREE.SphereGeometry(cloudParams.sphereRadius, cloudParams.sphereSegments, cloudParams.sphereRings);
const cloudMaterial = new THREE.MeshBasicMaterial({
    color: cloudParams.cloudColor,
    transparent: true,
    opacity: cloudParams.cloudOpacity,
    depthWrite: false,
});

const originalCloudColors = [];

function createClouds() {
    // Clear existing clouds
    cloudGroup.clear();

    for (let i = 0; i < cloudParams.clusterCount; i++) {
        const cloudCluster = new THREE.Group();
        const clusterCenterX = Math.random() * cloudParams.clusterSpreadX - cloudParams.clusterSpreadX / 2;
        const clusterCenterY = Math.random() * cloudParams.clusterSpreadY;
        const clusterCenterZ = Math.random() * cloudParams.clusterSpreadZ - cloudParams.clusterSpreadZ / 2;

        for (let j = 0; j < cloudParams.spheresPerCluster; j++) {
            const cloudSphere = new THREE.Mesh(cloudSphereGeometry, cloudMaterial);
            const sphereX = clusterCenterX + (Math.random() - 0.5) * cloudParams.sphereClumpFactor + (Math.random() - 0.5) * cloudParams.sphereClumpFactor;
            const sphereY = clusterCenterY + (Math.random() - 0.5) * cloudParams.sphereClumpFactor + (Math.random() - 0.5) * cloudParams.sphereClumpFactor;
            const sphereZ = clusterCenterZ + (Math.random() - 0.5) * cloudParams.sphereClumpFactor + (Math.random() - 0.5) * cloudParams.sphereClumpFactor;
            cloudSphere.position.set(sphereX, sphereY, sphereZ);
            cloudCluster.add(cloudSphere);
            originalCloudColors.push(new THREE.Color(cloudMaterial.color.getHex()));
        }
        cloudGroup.add(cloudCluster);
    }
    scene.add(cloudGroup);
}

// --- Star Parameters ---
const starParams = {
    starCount: 1500,
    starColor: 0xffffff,
    starSize: 1.5,
    starOpacity: 0.8,
    starSpreadX: 1000,
    starSpreadY: 500,
    starSpreadZ: 1000,
};

// --- Star Creation ---
const starGeometry = new THREE.BufferGeometry();
const starMaterial = new THREE.PointsMaterial({
    color: starParams.starColor,
    size: starParams.starSize,
    transparent: true,
    opacity: starParams.starOpacity,
    depthWrite: false,
});

const starVertices = [];
for (let i = 0; i < starParams.starCount; i++) {
    const x = Math.random() * starParams.starSpreadX - starParams.starSpreadX / 2;
    const y = Math.random() * starParams.starSpreadY + 100; // Stars above the clouds
    const z = Math.random() * starParams.starSpreadZ - starParams.starSpreadZ / 2;
    starVertices.push(x, y, z);
}

starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
const stars = new THREE.Points(starGeometry, starMaterial);
scene.add(stars);

// --- Animation ---
function animate() {
    requestAnimationFrame(animate);

    // Slightly move the clouds
    cloudGroup.children.forEach(cluster => {
        cluster.position.x += Math.sin(Date.now() * cloudParams.cloudSpeedVariation + cluster.id) * cloudParams.cloudSpeed;
    });

    // Slightly move the stars
    stars.rotation.y += 0.0001;

    renderer.render(scene, camera);
}

// --- Handle Window Resize ---
function handleWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateBackgroundImage();
    createClouds(); // Recreate clouds on resize
}
window.addEventListener('resize', handleWindowResize);

// --- SVG Background Creation ---
function createSVGBackground() {
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

// --- Background Image ---
function addBackgroundImage(imageUrl) {
    const image = new Image();
    image.src = imageUrl;
    image.style.position = "fixed";
    image.style.zIndex = "-1";
    image.style.objectFit = "cover";
    image.id = "background-image";
    image.style.opacity = "0.8";
    image.style.maskImage = "linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))";
    image.style.top = "0";
    image.style.left = "0";
    image.style.width = "100%";
    image.style.height = "auto";
    document.body.appendChild(image);

    image.onload = () => {
        updateBackgroundImage();
        applyEdgeFade(image);
    };
}

// --- Apply Edge Fade ---
function applyEdgeFade(image) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const imageWidth = image.naturalWidth;
    const imageHeight = image.naturalHeight;
    const aspectRatio = imageWidth / imageHeight;

    let newWidth, newHeight;
    if (windowWidth / windowHeight > aspectRatio) {
        newHeight = windowHeight;
        newWidth = windowHeight * aspectRatio;
    } else {
        newWidth = windowWidth;
        newHeight = windowWidth / aspectRatio;
    }

    const fadeWidth = newWidth * 0.1;
    const fadeHeight = newHeight * 0.1;

    image.style.maskImage = `
        linear-gradient(to right, rgba(0, 0, 0, 1) ${fadeWidth}px, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 1) calc(100% - ${fadeWidth}px)),
        linear-gradient(to bottom, rgba(0, 0, 0, 1) ${fadeHeight}px, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 1) calc(100% - ${fadeHeight}px))
    `;
    image.style.maskComposite = "intersect";
    image.style.webkitMaskImage = image.style.maskImage;
    image.style.webkitMaskComposite = "intersect";
}

// --- Update Background Image ---
function updateBackgroundImage() {
    const image = document.getElementById("background-image");
    if (!image) return;

    image.style.width = "100%";
    image.style.height = "auto";
    image.style.top = "0";
    image.style.left = "0";

    applyEdgeFade(image);
}

// --- Initialize ---
function init() {
    const canvasContainer = document.createElement('div');
    canvasContainer.style.position = 'absolute';
    canvasContainer.style.top = '0';
    canvasContainer.style.left = '0';
    canvasContainer.style.width = '100%';
    canvasContainer.style.height = '100%';
    canvasContainer.style.zIndex = '0';
    document.body.appendChild(canvasContainer);
    canvasContainer.appendChild(renderer.domElement);

    createSVGBackground();
    addBackgroundImage("sample.jpg");
    camera.position.z = 500;
    createClouds(); // Create clouds initially
    animate();
}

window.addEventListener('load', updateBackgroundImage);

init();
