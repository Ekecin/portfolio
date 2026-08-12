const canvas = document.getElementById("sphere");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
);

camera.position.z = 10;

const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(
    canvas.clientWidth,
    canvas.clientHeight
);

const geometry = new THREE.IcosahedronGeometry(3.2, 20);

const material = new THREE.PointsMaterial({

    color: 0x00ff88,

    size: 0.03,

    transparent: true,

    opacity: .9

});

const sphere = new THREE.Points(
    geometry,
    material
);

scene.add(sphere);

const light = new THREE.PointLight(0x00ff88, 8);

light.position.set(8, 8, 8);

scene.add(light);

const light2 = new THREE.PointLight(0x6a5cff, 6);

light2.position.set(-8, -8, 8);

scene.add(light2);

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (e) => {

    mouseX = (e.clientX / window.innerWidth - .5) * 2;

    mouseY = (e.clientY / window.innerHeight - .5) * 2;

});

function animate() {

    requestAnimationFrame(animate);

    sphere.rotation.y += 0.0015;

    sphere.rotation.x += 0.0008;

    sphere.rotation.y += mouseX * 0.003;

    sphere.rotation.x += mouseY * 0.003;

    renderer.render(scene, camera);

}

animate();

window.addEventListener("resize", () => {

    renderer.setSize(
        canvas.clientWidth,
        canvas.clientHeight
    );

    camera.aspect =
        canvas.clientWidth /
        canvas.clientHeight;

    camera.updateProjectionMatrix();

});