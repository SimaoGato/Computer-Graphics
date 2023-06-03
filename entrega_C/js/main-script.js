//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var scene, camera, renderer;

var plane;

const loader = new THREE.TextureLoader();
const height = loader.load('js/heightmap.png');

// Create the floral field texture
var texture1 = createFloralFieldTexture();
texture1.wrapS = THREE.RepeatWrapping;
texture1.wrapT = THREE.RepeatWrapping;

// Create the starry sky texture
var texture2 = createStarrySkyTexture();
texture2.wrapS = THREE.RepeatWrapping;
texture2.wrapT = THREE.RepeatWrapping;


/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));

    const geometry = new THREE.CircleGeometry(2.75, 100);

    const material = new THREE.MeshStandardMaterial({
        color : 'gray',
        map: texture1,
        displacementMap: height,
        displacementScale: 1.5,
    });
    plane = new THREE.Mesh(geometry, material);
    plane.position.x = 0;
    plane.position.y = 0;
    plane.position.z = 0;
    scene.add(plane);
    plane.rotation.x = Math.PI * -0.5;

    const skydomeGeometry = new THREE.SphereGeometry(2.75, 100, 100, 0, Math.PI, 0, Math.PI * 0.5);
    const skydomeMaterial = new THREE.MeshStandardMaterial({
        map: texture2,
        side: THREE.BackSide,
    });
    const skydome = new THREE.Mesh(skydomeGeometry, skydomeMaterial);
    skydome.position.x = 0;
    skydome.position.y = 0;
    skydome.position.z = 0.73;
    scene.add(skydome);
    skydome.rotation.x = Math.PI * -0.5;

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.x = 0;
    pointLight.position.y = 2;
    pointLight.position.z = 2;
    scene.add(pointLight);

}

function createFloralFieldTexture() {
    'use strict';

    var canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var context = canvas.getContext('2d');

    // Draw the background
    context.fillStyle = 'lightGreen';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the flowers
    var colors = ['#ffffff', '#ffff00', '#c8a2c8', '#add8e6'];
    for (var i = 0; i < 750; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var radius = Math.random() * 5 + 2;
        var color = colors[Math.floor(Math.random() * colors.length)];

        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
    }

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    return texture;
}

function createStarrySkyTexture() {
    'use strict';

    var canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var context = canvas.getContext('2d');

    // Draw the background
    var gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#1e1e3c');
    gradient.addColorStop(1, '#3c1e3c');
    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the stars
    context.fillStyle = '#ffffff';
    for (var i = 0; i < 750; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var radius = Math.random() * 2 + 1;

        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fill();
    }

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    return texture;
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////


/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

//////////////////////
/* CHECK COLLISIONS */
//////////////////////
function checkCollisions(){
    'use strict';

}

///////////////////////
/* HANDLE COLLISIONS */
///////////////////////
function handleCollisions(){
    'use strict';

}

////////////
/* UPDATE */
////////////
function update(){
    'use strict';

}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';

    renderer.render(scene, camera);

}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';

    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    createScene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.x = 0;
    camera.position.y = 1;
    camera.position.z = 4.74;

    camera.lookAt(scene.position);

    scene.add(camera);


}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

    render();

    requestAnimationFrame(animate);

}

////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

    /*switch (e.keyCode) {
        case 49: // 1
            terrain.material.map = texture1;
            currentTexture = 1;
            break;
        case 50: // 2   
            terrain.material.map = texture2;
            currentTexture = 2;
            break;
    }*/

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}
