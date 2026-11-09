import * as THREE from 'three'
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xcccccc);

const camera = new THREE.PerspectiveCamera(
    55,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
camera.position.set(3, 2, 4)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const control = new OrbitControls(camera, renderer.domElement)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.35)
const dir = new THREE.DirectionalLight(0xffffff, 2.5)
dir.position.set(5, 8, 4)
scene.add(dir, ambientLight)

const loader = new GLTFLoader()
loader.load('public/modeli.glb', (gltf) => {
    gltf.scene.rotation.y = Math.PI
    scene.add(gltf.scene)

    let totalVertices = 0
    let totalFaces = 0
    let meshCount = 0

    gltf.scene.traverse((obj) => {
        if (obj.isMesh) {
            const geo = obj.geometry
            const vertices = geo.attributes.position.count
            const faces = geo.index ? geo.index.count / 3 : vertices / 3

            console.log('Mesh:', obj.name || '(pa emer)', '| kulme:', vertices, '| faqe:', faces)

            totalVertices += vertices
            totalFaces += faces
            meshCount++
        }
    })

    console.log('Total meshes:', meshCount)
    console.log('Total kulme:', totalVertices)
    console.log('Total faqe:', totalFaces)
})

function animate() {
    requestAnimationFrame(animate)
    control.update()
    renderer.render(scene, camera)
}
animate()