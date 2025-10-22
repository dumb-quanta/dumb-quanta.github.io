// Import the Three.js library
import * as THREE from 'three';

// --- 1. The 3 Essentials: Scene, Camera, Renderer ---

// SCENE: This is the "world" that will hold all our objects
const scene = new THREE.Scene();

// CAMERA: This is the "eye" that looks at the scene.
// PerspectiveCamera(fov, aspect_ratio, near_clip, far_clip)
const camera = new THREE.PerspectiveCamera(
    75, // Field of View (how wide the lens is)
    window.innerWidth / window.innerHeight, // Aspect Ratio
    0.1, // Near clipping plane
    1000 // Far clipping plane
);
// Move the camera back a bit so we can see the object
camera.position.z = 5;

// RENDERER: This is what "draws" the scene onto the canvas
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg-canvas'), // Find our canvas
    alpha: true // Make the background transparent
});

// Set the renderer to the full size of the screen
renderer.setSize(window.innerWidth, window.innerHeight);
// Match the device's pixel ratio for sharp, crisp visuals
renderer.setPixelRatio(window.devicePixelRatio);


// --- 2. Create our 3D Object (The "Crystal") ---

// GEOMETRY: The shape of the object. An Icosahedron is a 20-sided shape.
const geometry = new THREE.IcosahedronGeometry(1.5, 0); // (radius, detail)

// MATERIAL: The "skin" of the object. We'll make it a shiny wireframe.
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff, // White
    wireframe: true // Show just the lines
});

// MESH: The final object, combining the shape and the skin.
const crystal = new THREE.Mesh(geometry, material);

// Add the object to our "world"
scene.add(crystal);


// --- 3. Add Lighting ---

// Add a point light to make the material "pop"
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5); // x, y, z

// Add an ambient light to soften the whole scene
const ambientLight = new THREE.AmbientLight(0xffffff, 0.2); // (color, intensity)
scene.add(pointLight, ambientLight);


// --- 4. The Animation Loop ---

// This function will run over and over (about 60 times per second)
function animate() {
    // This creates the smooth 60fps loop
    requestAnimationFrame(animate);

    // Rotate the crystal on its X and Y axes
    crystal.rotation.x += 0.001;
    crystal.rotation.y += 0.002;

    // Tell the renderer to draw the scene from the camera's perspective
    renderer.render(scene, camera);
}

// Start the animation loop!
animate();


// --- 5. Handle Window Resizing ---

// This function keeps the 3D scene looking correct when the window size changes
function onWindowResize() {
    // Update the camera's aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    // Update the renderer's size
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Listen for the 'resize' event on the window
window.addEventListener('resize', onWindowResize);
