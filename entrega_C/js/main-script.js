//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var scene, camera, renderer;
var plane, sceneRadius = 250;

// Create the floral field texture
var floralFieldTexture = createFloralFieldTexture();
// Create the starry sky texture
var starryTexture = createStarrySkyTexture();

// MOON Light
var directionalLight;

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
    createCamera();
    
    window.addEventListener("keydown", onKeyDown);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    
    render();
    requestAnimationFrame(animate);   
}

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';
    
    scene = new THREE.Scene();
    
    scene.add(new THREE.AxisHelper(10));
    
    createFloralField();
    createSkydome();
    createMoon();
    //createLight();
    createThree(new THREE.Vector3(0, 0, 0));
}

function createFloralField() {
    'use strict'

    const loader = new THREE.TextureLoader();
    const height = loader.load('images/heightmap.png');

    const geometry = new THREE.CircleGeometry(sceneRadius, 100);
    const material = new THREE.MeshStandardMaterial({
        color : 'white',
        map: floralFieldTexture,
        displacementMap: height,
        displacementScale: 100,
    });

    plane = new THREE.Mesh(geometry, material);
    plane.position.set(0, -5, 0);
    plane.rotation.x = Math.PI * -0.5;

    var defaultRotation = Math.PI / 360;
    var defaultHeight = 3;
    createThree(new THREE.Vector3(0, 7, -150), defaultRotation, defaultHeight);
    createThree(new THREE.Vector3(-75, 5, -75), 100 * defaultRotation, 1.5 * defaultHeight);
    createThree(new THREE.Vector3(100, 5, -75), 200 * defaultRotation, 0.5 * defaultHeight);
    createThree(new THREE.Vector3(-90, 5, 100), 150 * defaultRotation, 0.75 * defaultHeight);
    createThree(new THREE.Vector3(100, 5, 125), 40 * defaultRotation, 1.25 * defaultHeight);
    scene.add(plane);
}

function createSkydome() {
    'use strict';
    
    const skydomeGeometry = new THREE.SphereGeometry(sceneRadius, 64, 32, 0, Math.PI , 0, Math.PI);
    const skydomeMaterial = new THREE.MeshStandardMaterial({
        map: starryTexture,
        side: THREE.BackSide
    });

    const skydome = new THREE.Mesh(skydomeGeometry, skydomeMaterial);
    skydome.position.set(0, 0, 0);
    scene.add(skydome);
    skydome.rotation.x = Math.PI * -0.5;
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
    for (var i = 0; i < 10000; i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var radius = Math.random() * 0.5 + 2;
        var color = colors[Math.floor(Math.random() * colors.length)];

        context.beginPath();
        context.arc(x, y, radius, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
    }

    var texture = new THREE.Texture(canvas);
    texture.needsUpdate = true;

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

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

    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    return texture;
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createCamera(){
    'use strict';

    camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(- sceneRadius * 0.9, sceneRadius * 1.3, sceneRadius * 1.3);
    camera.lookAt(scene.position);
    
    scene.add(camera);
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////
function createLight() {
    // const pointLight = new THREE.PointLight(0xffffff, 2);
    // pointLight.position.set(10, 10, 10);
    // scene.add(pointLight); 
    
    const light = new THREE.AmbientLight(0xffffff, 2); // soft white light
    scene.add( light );
}

function createMoon() {
    'use strict'

    var moonYellowColor = 0xf5e38d;

    // Create the moon
    var moonGeometry = new THREE.SphereGeometry(20, 32, 32);
    var moonMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: moonYellowColor,
    });
    var moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(90, 180, -80);
    scene.add(moon);

    // Create the directional light
    directionalLight = new THREE.DirectionalLight(moonYellowColor, 0.5);
    directionalLight.position.set(1, 1, 1);
    directionalLight.rotateX(Math.PI / 4);
    scene.add(directionalLight);

    // Create the ambient light
    var ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
}

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

function createThree(pos, rot, heightScale) {
    'use strict';

    var threeBrownOrangeColor = 0x8B4513;
    var threeLeafColor = 0x228B22;

    var threeBranchMaterial = new THREE.MeshBasicMaterial({ color: threeBrownOrangeColor });
    var threeLeafMaterial = new THREE.MeshBasicMaterial({ color: threeLeafColor });

    function createBranch(matrix) {
        'use strict';
        var branchGeometry = new THREE.CylinderGeometry(2.5, 2.5, heightScale * 20, 32);
        var pBranch = new THREE.Mesh(branchGeometry, threeBranchMaterial);
        pBranch.position.set(0, heightScale * 10, 0);
    
        var pLeafGeometry = new THREE.SphereGeometry(heightScale * 8, 32, 32);
        var pLeaf = new THREE.Mesh(pLeafGeometry, threeLeafMaterial);
        pLeaf.scale.set(1, 0.6, 1);
        pLeaf.position.set(0, heightScale * 22, 0);
    
        matrix.add(pBranch);
        matrix.add(pLeaf);
    }

    var three = new THREE.Object3D();
    three.position.set(pos.x,pos.y + 0.3,pos.z);
    three.rotation.y = rot;

    var mainBranch = new THREE.Object3D();
    createBranch(mainBranch);
    mainBranch.rotation.z = Math.PI/7;

    var secondaryBranch = new THREE.Object3D();
    createBranch(secondaryBranch);
    secondaryBranch.position.set(0, heightScale * 2,0);
    secondaryBranch.rotation.z = - Math.PI/3;
    secondaryBranch.scale.set(0.8,0.8,0.8);
    mainBranch.add(secondaryBranch);

    var baseThreeGeometry = new THREE.CylinderGeometry(0.72, 0.72, 0.7, 32);
    var baseThree = new THREE.Mesh(baseThreeGeometry, threeBranchMaterial);
    baseThree.position.set(0, -0.05, 0);
    three.add(baseThree);

    three.add(mainBranch);
    scene.add(three);
}

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

    switch (e.keyCode) {
        case 49: // 1
            terrain.material.map = floralFieldTexture;
            currentTexture = 1;
            break;
        case 50: // 2   
            terrain.material.map = starryTexture;
            currentTexture = 2;
            break;
        case 51: // 3
            camera.position.set(- sceneRadius * 0.9, sceneRadius * 1.3, sceneRadius * 1.3);
            camera.lookAt(scene.position);
            break;
        case 52: // 4
            camera.position.set(0, sceneRadius * 2, 0);
            camera.lookAt(scene.position);
            break;
        case 53: // 5
            camera.position.set(0, sceneRadius * 0.1, sceneRadius);
            var pos = new THREE.Vector3(0, sceneRadius * 0.2, 0);
            camera.lookAt(pos);
            break;
        // letter d or D
        case 68:
        case 100:
            directionalLight.visible = !directionalLight.visible;
            break;
    }

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}
