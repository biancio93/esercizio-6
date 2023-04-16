/* ===========================================
IMPORT
============================================ */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/* ===========================================
CANVAS
============================================ */
const canvas = document.querySelector('canvas.webgl')

/* ===========================================
SCENE
============================================ */
const scene = new THREE.Scene()



/* ===========================================
LIGHT
============================================ */
// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

// point light
const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)



/* ===========================================
TEXTURE
============================================ */
const textureLoader = new THREE.TextureLoader();

/* ===========================================
GEOMETRY
============================================ */

const cylinderModel = new THREE.CylinderGeometry(1, 1, 0.3, 32);
console.log(cylinderModel)


/* ===========================================
MATERIALS
============================================ */
//wood
const woodColorTexture = textureLoader.load('/textures/wood/Wood_025_basecolor.jpg');
const woodAmbientOcclusionTexture = textureLoader.load('/textures/wood/Wood_025_ambientOcclusion.jpg');
const woodRoughnessTexture = textureLoader.load('/textures/wood/Wood_025_roughness.jpg');
const woodNormalTexture = textureLoader.load('/textures/wood/Wood_025_normal.jpg');
const woodHeightTexture = textureLoader.load('/textures/wood/Wood_025_height.png');

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.6;
material.map = woodColorTexture;
material.aoMap = woodAmbientOcclusionTexture;
material.aoMapIntensity = 1;
material.displacementScale = 0.2;
material.roughnessMap = woodRoughnessTexture;
material.normalMap = woodNormalTexture;
woodColorTexture.repeat.set(1, 1); 

//metal
const metalColorTexture = textureLoader.load('/textures/metal/Metal_006_basecolor.jpg');
const metalAmbientOcclusionTexture = textureLoader.load('/textures/metal/Metal_006_ambientOcclusion.jpg');
const metalRoughnessTexture = textureLoader.load('/textures/metal/Metal_006_roughness.jpg');
const metalNormalTexture = textureLoader.load('/textures/metal/Metal_006_normal.jpg');
const metalMetalnessTexture = textureLoader.load('/textures/metal/Metal_006_metallic.jpg');

const material_2 = new THREE.MeshStandardMaterial();
material_2.metalness = 0.6;
material_2.map = metalColorTexture;
material_2.aoMap = metalAmbientOcclusionTexture;
material_2.aoMapIntensity = 0.5;
material_2.displacementScale = 0.05;
material_2.roughnessMap = metalRoughnessTexture;
material_2.metalnessMap = metalMetalnessTexture;
material_2.normalMap = metalNormalTexture;


/* ===========================================
OBJECT
============================================ */

//Cylinder #1
const cylinderOne = new THREE.Mesh(
    cylinderModel,
    material
)
//Cylinder #2
const cylinderTwo = new THREE.Mesh(
    new THREE.CylinderGeometry(1.2, 1.2, 0.3, 32),
    material
)
cylinderTwo.position.y = -0.3;
//Cylinder #3 - GOLD
const cylinderThree = new THREE.Mesh(
    new THREE.CylinderGeometry(1.05, 1.05, 0.07, 32),
    material
)
cylinderThree.position.y = 0.12;
//Cylinder #4
const cylinderFour = new THREE.Mesh(
    new THREE.CylinderGeometry(0.9, 0.9, 0.07, 32),
    material_2
)
cylinderFour.position.y = 0.15;
//Crystal
const crystal = new THREE.Mesh(
    new THREE.OctahedronGeometry(0.4, 0),
    material
)
crystal.position.y = 1;
//Sphere
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 32, 32),
    material_2
)

scene.add(sphere, cylinderOne, cylinderTwo, cylinderThree, cylinderFour, crystal)


/* ===========================================
SIZE
============================================ */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})


/* ===========================================
CAMERA
============================================ */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = -1
camera.position.y = 2
camera.position.z = -2
camera.lookAt(crystal.position)
scene.add(camera)

/* ===========================================
CONTROLS
============================================ */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/* ===========================================
RENDERER
============================================ */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/* ===========================================
ANIMATION
============================================ */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()