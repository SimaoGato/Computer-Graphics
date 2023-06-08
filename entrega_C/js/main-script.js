//////////////////////
/* GLOBAL VARIABLES */
//////////////////////
var scene, camera, renderer;
var plane, sceneRadius = 250;

var defaultCamera, isDefaultCamera = true;

// AUXILIAR CAMERAS - TODO: REMOVE
var topCamera, sideCamera;
var isTopCamera = false, isSideCamera = false;

const colors = {
    RED: 0xff0000,
    GREEN: 0x00ff00,
    BLUE: 0x0000ff,
    WHITE: 0xffffff,
    MOONYELLOW: 0xf5e38d,
    BROWNORANGEISH: 0x8B4513,
    LEAF: 0x228B22,
    LIGHTGREY: 0x696969,
    DARKGREY: 0x222222,
    BLUE: 0x0000FF,
    WHITE: 0xFFFFFF
};

// Create the floral field texture
var floralFieldTexture = createFloralFieldTexture();
// Create the starry sky texture
var starryTexture = createStarrySkyTexture();

// MOON Light
var moon;
var directionalLight;
var switchDirectionalLight = false;

// OVNI
var ovni, ovniRot;

// OVNI Lights
var ovniSpotLight;
var ovniPointLightsArray= [];

var ovniSwitchSpotLight = false;
var ovniSwitchPointLights = false;

// OVNI Movement
var ovniTranslateForward = false;
var ovniTranslateBackward = false;
var ovniTranslateLeft = false;
var ovniTranslateRight = false;
var ovniMovementSpeed = 1;
var ovniDiagonalMovementSpeed = Math.sqrt(Math.pow(ovniMovementSpeed, 2) / 2);
var ovniRotationSpeed = Math.PI / 90;

// Materials
primitiveArray = [];
materialOptionsArray = [];

var lambertMaterial = true;
var phongMaterial = false;
var toonMaterial = false;
var basicMaterial = false;

// House Components

const wallVertices = [
    // Front face
    -62.5, 0, 30,
    62.5, 0, 30,
    62.5, 35, 30,
    -62.5, 35, 30,
    // Back face
    -62.5, 0, -30,
    62.5, 0, -30,
    62.5, 35, -30,
    -62.5, 35, -30,
];

const wallIndices = [
    // Front face
    0, 1, 2,
    0, 2, 3,
    // Back face
    4, 6, 5,
    4, 7, 6,
    // Left face
    0, 3, 7,
    0, 7, 4,
    // Right face
    1, 5, 6,
    1, 6, 2,
    // Top face
    3, 2, 6,
    3, 6, 7,
    // Bottom face
    0, 4, 5,
    0, 5, 1,
];

const roofVertices = [
    // Front face
    -62.5, 35, 30,
    62.5, 35, 30,
    -62.5, 50, 0,
    62.5, 50, 0,
    // Back face
    -62.5, 35, -30,
    62.5, 35, -30,
    -62.5, 50, 0,
    62.5, 50, 0,
    // Left face
    -62.5, 35, 30,
    -62.5, 35, -30,
    -62.5, 50, 0,
    // Right face
    62.5, 35, 30,
    62.5, 35, -30,
    62.5, 50, 0,
];

const roofIndices = [
    // Front face
    0, 1, 2,
    1, 3, 2,
    // Back face
    4, 6, 5,
    5, 6, 7,
    // Left face
    8, 9, 10,
    // Right face
    11, 12, 13,
];

const doorVertices = [
    // Front face
    -5, 0, 30.1,
    5, 0, 30.1,
    5, 25, 30.1,
    -5, 25, 30.1,
];

const doorIndices = [
    // Front face
    0, 1, 2,
    0, 2, 3,
];

const LeftWindow1Vertices = [
    // Front face
    -27.5, 15, 30.1,
    -17.5, 15, 30.1,
    -17.5, 25, 30.1,
    -27.5, 25, 30.1,
];

const LeftWindow1Indices = [
    // Front face
    0, 1, 2,
    0, 2, 3,
];

const LeftWindow2Vertices = [
    // Front face
    -40, 15, 30.1,
    -50, 15, 30.1,
    -50, 25, 30.1,
    -40, 25, 30.1,
];

const LeftWindow2Indices = [
    // Front face
    0, 1, 2,
    0, 2, 3,
];

const RightWindow1Vertices = [
    // Front face
    17.5, 15, 30.1,
    27.5, 15, 30.1,
    27.5, 25, 30.1,
    17.5, 25, 30.1,
];

const RightWindow1Indices = [
    // Front face
    0, 1, 2,
    0, 2, 3,
];

const RightWindow2Vertices = [
    // Front face
    40, 15, 30.1,
    50, 15, 30.1,
    50, 25, 30.1,
    40, 25, 30.1,
];

const RightWindow2Indices = [
    // Front face
    0, 1, 2,
    0, 2, 3,
];

const lateralWindowVertices = [
    // Front face
    62.6, 15, -10,
    62.6, 25, -10,
    62.6, 25, -20,
    62.6, 15, -20,
];

const lateralWindowIndices = [
    // Front face
    0, 1, 2,
    0, 2, 3,
];

const frontChimneyVertices = [
    // Front face
    37.5, 35, 30,
    37.5, 60, 30,
    17.5, 60, 30,
    17.5, 35, 30,
    // Back face
    37.5, 35, 15,
    37.5, 60, 25,
    17.5, 60, 25,
    17.5, 35, 15,
];

const frontChimneyIndices = [
    // Front face
    0, 1, 2,
    0, 2, 3,
    // Back face
    4, 5, 6,
    4, 6, 7,
    // Top face
    1, 5, 6,
    1, 6, 2,
    // Bottom face
    0, 4, 7,
    0, 7, 3,
    // Left face
    0, 1, 5,
    0, 5, 4,
    // Right face
    3, 2, 6,
    3, 6, 7,
];

const frontChimneyTopVertices = [
    // Front face
    37.5, 60, 30,
    37.5, 65, 30,
    17.5, 65, 30,
    17.5, 60, 30,
    // Back face
    37.5, 60, 25,
    37.5, 65, 25,
    17.5, 65, 25,
    17.5, 60, 25,
];

const frontChimneyTopIndices = [
    // Front face
    0, 1, 2,
    0, 2, 3,
    // Back face
    4, 5, 6,
    4, 6, 7,
    // Top face
    1, 5, 6,
    1, 6, 2,
    // Bottom face
    0, 4, 7,
    0, 7, 3,
    // Left face
    0, 1, 5,
    0, 5, 4,
    // Right face
    3, 2, 6,
    3, 6, 7,
];

const backChimneyVertices = [
    // Front face
    37.5, 35, -30,
    37.5, 60, -30,
    17.5, 60, -30,
    17.5, 35, -30,
    // Back face
    37.5, 35, -15,
    37.5, 60, -25,
    17.5, 60, -25,
    17.5, 35, -15,
];

const backChimneyIndices = [
    // Front face
    0, 1, 2,
    0, 2, 3,
    // Back face
    4, 5, 6,
    4, 6, 7,
    // Top face
    1, 5, 6,
    1, 6, 2,
    // Bottom face
    0, 4, 7,
    0, 7, 3,
    // Left face
    0, 1, 5,
    0, 5, 4,
    // Right face
    3, 2, 6,
    3, 6, 7,
];

const backChimneyTopVertices = [
    // Front face
    37.5, 60, -30,
    37.5, 65, -30,
    17.5, 65, -30,
    17.5, 60, -30,
    // Back face
    37.5, 60, -25,
    37.5, 65, -25,
    17.5, 65, -25,
    17.5, 60, -25,
];

const backChimneyTopIndices = [
    // Front face
    0, 1, 2,
    0, 2, 3,
    // Back face
    4, 5, 6,
    4, 6, 7,
    // Top face
    1, 5, 6,
    1, 6, 2,
    // Bottom face
    0, 4, 7,
    0, 7, 3,
    // Left face
    0, 1, 5,
    0, 5, 4,
    // Right face
    3, 2, 6,
    3, 6, 7,
];

const annexVertices = [
    // Front face
    72.5, 0, 25,
    72.5, 25, 25,
    72.5, 25, 15,
    72.5, 0, 15,
    // Back face
    62.5, 0, 25,
    62.5, 25, 25,
    62.5, 25, 15,
    62.5, 0, 15,
];

const annexIndices = [
    // Front face
    0, 1, 2,
    0, 2, 3,
    // Back face
    4, 5, 6,
    4, 6, 7,
    // Top face
    1, 5, 6,
    1, 6, 2,
    // Bottom face
    0, 4, 7,
    0, 7, 3,
    // Left face
    0, 1, 5,
    0, 5, 4,
    // Right face
    3, 2, 6,
    3, 6, 7,
];

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
    createDefaultCamera();

    // AUXILIAR CAMERAS - TODO: REMOVE
    createTopCamera();
    createSideCamera();
    
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("resize", onResize);
}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';
    
    update();
    render();
    requestAnimationFrame(animate);   
}

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';
    
    scene = new THREE.Scene();

    scene.background = new THREE.Color(0x000000);
    
    createFloralField();
    createSkydome();
    createMoon();
    createHouse();
    createOVNI();

    //create vr button
    document.body.appendChild( VRButton.createButton( renderer ) );
    renderer.xr.enabled = true;
}

function addHouseWalls(houseMatrix) {
    'use strict';

    const wallGeometry = new THREE.BufferGeometry();
    wallGeometry.setAttribute('position', new THREE.Float32BufferAttribute(wallVertices, 3));
    wallGeometry.setIndex(wallIndices);
    wallGeometry.computeVertexNormals();
    const wallMaterial = createMaterials('white', 100);
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    primitiveArray.push(wall);

    houseMatrix.add(wall);

}

function addHouseRoof(houseMatrix) {
    'use strict';

    const roofGeometry = new THREE.BufferGeometry();
    roofGeometry.setAttribute('position', new THREE.Float32BufferAttribute(roofVertices, 3));
    roofGeometry.setIndex(roofIndices);
    roofGeometry.computeVertexNormals();
    const roofMaterial = createMaterials('orange', 100);
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    primitiveArray.push(roof);

    houseMatrix.add(roof);

}

function addHouseDoor(houseMatrix) {
    'use strict';

    const doorGeometry = new THREE.BufferGeometry();
    doorGeometry.setAttribute('position', new THREE.Float32BufferAttribute(doorVertices, 3));
    doorGeometry.setIndex(doorIndices);
    doorGeometry.computeVertexNormals();
    const doorMaterial = createMaterials('brown', 100);
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    primitiveArray.push(door);

    houseMatrix.add(door);

}

function addHouseWindow(houseMatrix, vertices, indices) {
    'use strict';

    const windowGeometry = new THREE.BufferGeometry();
    windowGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    windowGeometry.setIndex(indices);
    windowGeometry.computeVertexNormals();
    const windowMaterial = createMaterials('blue', 100);
    const window = new THREE.Mesh(windowGeometry, windowMaterial);
    primitiveArray.push(window);

    houseMatrix.add(window);

}

function addChimney(houseMatrix, vertices, indices, topVertices, topIndices) {
    'use strict';
    
    const chimneyGeometry = new THREE.BufferGeometry();
    chimneyGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    chimneyGeometry.setIndex(indices);
    chimneyGeometry.computeVertexNormals();
    const chimneyMaterial = createMaterials('red', 100);
    const chimney = new THREE.Mesh(chimneyGeometry, chimneyMaterial);
    primitiveArray.push(chimney);
    
    houseMatrix.add(chimney);

    const chimneyTopGeometry = new THREE.BufferGeometry();
    chimneyTopGeometry.setAttribute('position', new THREE.Float32BufferAttribute(topVertices, 3));
    chimneyTopGeometry.setIndex(topIndices);
    chimneyTopGeometry.computeVertexNormals();
    const chimneyTopMaterial = createMaterials('brown', 100);
    const chimneyTop = new THREE.Mesh(chimneyTopGeometry, chimneyTopMaterial);
    primitiveArray.push(chimneyTop);

    houseMatrix.add(chimneyTop);

}

function addAnnex(houseMatrix) {
    'use strict';

    const annexGeometry = new THREE.BufferGeometry();    
    annexGeometry.setAttribute('position', new THREE.Float32BufferAttribute(annexVertices, 3));
    annexGeometry.setIndex(annexIndices);
    annexGeometry.computeVertexNormals();
    const annexMaterial = createMaterials('lightblue', 100);
    const annex = new THREE.Mesh(annexGeometry, annexMaterial);
    primitiveArray.push(annex);

    houseMatrix.add(annex);

}

function createHouse() {
    'use strict';

    const houseMatrix = new THREE.Object3D();

    addHouseWalls(houseMatrix);

    addHouseRoof(houseMatrix);

    addHouseDoor(houseMatrix);

    addHouseWindow(houseMatrix, LeftWindow1Vertices, LeftWindow1Indices);

    addHouseWindow(houseMatrix, LeftWindow2Vertices, LeftWindow2Indices);

    addHouseWindow(houseMatrix, RightWindow1Vertices, RightWindow1Indices);

    addHouseWindow(houseMatrix, RightWindow2Vertices, RightWindow2Indices);

    addHouseWindow(houseMatrix, lateralWindowVertices, lateralWindowIndices);

    addChimney(houseMatrix, frontChimneyVertices, frontChimneyIndices, frontChimneyTopVertices, frontChimneyTopIndices);

    addChimney(houseMatrix, backChimneyVertices, backChimneyIndices, backChimneyTopVertices, backChimneyTopIndices);

    addAnnex(houseMatrix)

    houseMatrix.position.set(-125, 0, -32);

    scene.add(houseMatrix);
}

function createFloralField() {
    'use strict'

    const loader = new THREE.TextureLoader();
    const height = loader.load('images/heightmap.png');

    const geometry = new THREE.CircleGeometry(sceneRadius, 100);
    const material = new THREE.MeshPhongMaterial({
        color: 'white',
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
    createThree(new THREE.Vector3(125, 5, 20), 100 * defaultRotation, 1.5 * defaultHeight);
    createThree(new THREE.Vector3(100, 5, -75), 200 * defaultRotation, 0.5 * defaultHeight);
    createThree(new THREE.Vector3(-90, 5, 100), 150 * defaultRotation, 0.75 * defaultHeight);
    createThree(new THREE.Vector3(100, 5, 125), 40 * defaultRotation, 1.25 * defaultHeight);
    scene.add(plane);
}

function createSkydome() {
    'use strict';
    
    const skydomeGeometry = new THREE.SphereGeometry(sceneRadius, 64, 32, 0, Math.PI , 0, Math.PI);
    const skydomeMaterial = new THREE.MeshPhongMaterial({
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
function createDefaultCamera(){
    'use strict';

    defaultCamera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
    defaultCamera.position.set(0, sceneRadius * 0.1, sceneRadius);
    var pos = new THREE.Vector3(0, sceneRadius * 0.2, 0);
    defaultCamera.lookAt(pos);
}

function createTopCamera(){
    'use strict';

    topCamera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
    topCamera.position.set(0, sceneRadius * 2, 0);
    var pos = new THREE.Vector3(0, sceneRadius * 0.2, 0);
    topCamera.lookAt(scene.position);
}

function createSideCamera(){
    'use strict';

    sideCamera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
    sideCamera.position.set(- sceneRadius * 0.9, sceneRadius * 0.2, sceneRadius * 0.05);
    var pos = new THREE.Vector3(0, sceneRadius * 0.2, 0);
    sideCamera.lookAt(scene.position);
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////
function createMoon() {
    'use strict'

    // Create the moon
    var moonGeometry = new THREE.SphereGeometry(20, 32, 32);
    
    var materials = [
        new THREE.MeshLambertMaterial({ color: colors.MOONYELLOW, side: THREE.DoubleSide, emissive: colors.MOONYELLOW }),
        new THREE.MeshPhongMaterial({ color: colors.MOONYELLOW, side: THREE.DoubleSide, emissive: colors.MOONYELLOW }),
        new THREE.MeshToonMaterial({ color: colors.MOONYELLOW, side: THREE.DoubleSide, emissive: colors.MOONYELLOW }),
        new THREE.MeshBasicMaterial({ color: colors.MOONYELLOW, side: THREE.DoubleSide })
    ];
    materialOptionsArray.push(materials);
    var moonMaterial = materials[0];

    moon = new THREE.Mesh(moonGeometry, moonMaterial);
    primitiveArray.push(moon);
    moon.position.set(90, 180, -80);
    scene.add(moon);

    // Create the directional light
    directionalLight = new THREE.DirectionalLight(colors.MOONYELLOW, 0.2);
    directionalLight.position.set(90, 180, -80);
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


    function createBranch(matrix) {
        'use strict';

        var threeBranchMaterial = createMaterials(colors.BROWNORANGEISH, 100);
        var threeLeafMaterial = createMaterials(colors.LEAF, 100);

        var branchGeometry = new THREE.CylinderGeometry(1.5, 1.5, heightScale * 20, 32);
        var pBranch = new THREE.Mesh(branchGeometry, threeBranchMaterial);
        primitiveArray.push(pBranch);
        pBranch.position.set(0, heightScale * 10, 0);
    
        var pLeafGeometry = new THREE.SphereGeometry(heightScale * 8, 32, 32);
        var pLeaf = new THREE.Mesh(pLeafGeometry, threeLeafMaterial);
        primitiveArray.push(pLeaf);
        pLeaf.scale.set(1, 0.6, 1);
        pLeaf.position.set(0, heightScale * 22, 0);
    
        matrix.add(pBranch);
        matrix.add(pLeaf);
    }

    var three = new THREE.Object3D();
    three.position.set(pos.x,pos.y + 0.3, pos.z);
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

    var baseThreeMaterial = createMaterials(colors.BROWNORANGEISH, 100);
    var baseThreeGeometry = new THREE.CylinderGeometry(0.72, 0.72, 0.7, 32);
    var baseThree = new THREE.Mesh(baseThreeGeometry, baseThreeMaterial);
    primitiveArray.push(baseThree);
    baseThree.position.set(0, -0.05, 0);
    three.add(baseThree);

    three.add(mainBranch);
    scene.add(three);
}

function createOVNI() {
    'use strict';

    ovni = new THREE.Object3D();
    ovniRot = new THREE.Object3D();

    ovni.position.set(20, 140, 0);

    var ovniGeometry = new THREE.SphereGeometry(10, 32, 32);

    var ovniMaterial = createMaterials(colors.LIGHTGREY, 100);
    var ovniBody = new THREE.Mesh(ovniGeometry, ovniMaterial);
    primitiveArray.push(ovniBody);
    ovniBody.scale.set(1, 0.2, 1);
    ovniRot.add(ovniBody);

    const radius = 4; // Radius of the UFO
    const thetaStart = 0; // Starting angle of the cap
    const thetaLength = Math.PI; // Angle range of the cap (half a sphere)
    const segments = 32; // Number of segments for the geometry
    const cockpitGeometry = new THREE.SphereGeometry(radius, segments, segments, thetaStart, thetaLength);
    const material = createMaterials(colors.BLUE, 150);
    const cockpit = new THREE.Mesh(cockpitGeometry, material);
    primitiveArray.push(cockpit);

    cockpit.position.set(0, 1.5, 0);
    cockpit.rotation.x = - Math.PI / 2;
    cockpit.scale.set(1, 1, 1);
    ovniRot.add(cockpit);

    var bottomCylinderGeometry = new THREE.CylinderGeometry(2, 2, 2, 32);
    var bottomCylinderMaterial = createMaterials(colors.DARKGREY, 100);
    var bottomCylinder = new THREE.Mesh(bottomCylinderGeometry, bottomCylinderMaterial);
    primitiveArray.push(bottomCylinder);
    bottomCylinder.position.set(0, -2, 0);
    ovniRot.add(bottomCylinder);

    ovniSpotLight = new THREE.SpotLight(colors.WHITE, 5, 130);// Color, Intensity, Distance
    ovniSpotLight.position.set(0, -3, 0);
    ovniRot.add(ovniSpotLight);
    
    createPointLights(ovniRot, new THREE.Vector3(8, -0.5, 0));
    createPointLights(ovniRot, new THREE.Vector3(-8, -0.5, 0));
    createPointLights(ovniRot, new THREE.Vector3(0, -0.5, 8));
    createPointLights(ovniRot, new THREE.Vector3(0, -0.5, -8));
    
    ovni.scale.set(3.2, 3.2, 3.2);
    ovni.add(ovniRot);
    scene.add(ovni);
}

function createPointLights(mat, pos) {
    'use strict';

    var sphereMaterial = createMaterials(colors.RED, 100);
    var sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    primitiveArray.push(sphere);
    sphere.position.x = pos.x;
    sphere.position.y = pos.y;
    sphere.position.z = pos.z;

    var pointLight = new THREE.PointLight(colors.RED, 1, 80);
    pointLight.position.set(pos.x, pos.y - 3, pos.z);
    mat.add(pointLight);
    ovniPointLightsArray.push(pointLight);

    mat.add(sphere);
}

function createMaterials(color, shininess) { 
    var materials = [
        new THREE.MeshLambertMaterial({ color: color, side: THREE.DoubleSide}),
        new THREE.MeshPhongMaterial({ color: color, shininess: shininess, side: THREE.DoubleSide }),
        new THREE.MeshToonMaterial({ color: color, side: THREE.DoubleSide }),
        new THREE.MeshBasicMaterial({ color: color, side: THREE.DoubleSide })
    ];
    materialOptionsArray.push(materials);

    return materials[0];
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

    if(isDefaultCamera) {
        camera = defaultCamera;
    }
    else if(isTopCamera) {
        camera = topCamera;
    }
    else if(isSideCamera) {
        camera = sideCamera;
    }

    if (lambertMaterial) {
        for (var i = 0; i < primitiveArray.length; i++) {
            primitiveArray[i].material = materialOptionsArray[i][0];
        }
        lambertMaterial = false;
    }

    else if (phongMaterial) {
        for (var i = 0; i < primitiveArray.length; i++) {
            primitiveArray[i].material = materialOptionsArray[i][1];
        }
        phongMaterial = false;
    }

    else if (toonMaterial) {
        for (var i = 0; i < primitiveArray.length; i++) {
            primitiveArray[i].material = materialOptionsArray[i][2];
        }
        toonMaterial = false;
    }

    else if (basicMaterial) {
        for (var i = 0; i < primitiveArray.length; i++) {
            primitiveArray[i].material = materialOptionsArray[i][3];
        }
        basicMaterial = false;
    }

    // OVNI Lights
    if (ovniSwitchPointLights) {
        for (var i = 0; i < ovniPointLightsArray.length; i++) {
            ovniPointLightsArray[i].visible = !ovniPointLightsArray[i].visible;
        }
        ovniSwitchPointLights = false;
    }

    if (ovniSwitchSpotLight) {
        ovniSpotLight.visible = !ovniSpotLight.visible;
        ovniSwitchSpotLight = false;
    }

    // MOON Directional Light
    // MOON Directional Light

    if (switchDirectionalLight) {
        if (moon.material.emissiveIntensity == 1) {
            moon.material.emissiveIntensity = 0;
        }
        else {
            moon.material.emissiveIntensity = 1;
        }
        directionalLight.visible = !directionalLight.visible;
        switchDirectionalLight = false;
    }


    // OVNI movement

    ovniRot.rotation.y += ovniRotationSpeed;

    var prevOvniXPos = ovni.position.x;
    var prevOvniZPos = ovni.position.z;


    if (ovniTranslateForward && ovniTranslateLeft) {
        ovni.translateZ(ovniDiagonalMovementSpeed);
        ovni.translateX(-ovniDiagonalMovementSpeed);
    }
    else if (ovniTranslateForward && ovniTranslateRight) {
        ovni.translateZ(ovniDiagonalMovementSpeed);
        ovni.translateX(ovniDiagonalMovementSpeed);
    }
    else if (ovniTranslateBackward && ovniTranslateLeft) {
        ovni.translateZ(-ovniDiagonalMovementSpeed);
        ovni.translateX(-ovniDiagonalMovementSpeed);
    }
    else if (ovniTranslateBackward && ovniTranslateRight) {
        ovni.translateZ(-ovniDiagonalMovementSpeed);
        ovni.translateX(ovniDiagonalMovementSpeed);
    }
    else if (ovniTranslateForward) {
        ovni.translateZ(ovniMovementSpeed);
    }
    else if (ovniTranslateBackward) {
        ovni.translateZ(-ovniMovementSpeed);
    }
    else if (ovniTranslateLeft) {
        ovni.translateX(-ovniMovementSpeed);
    }
    else if (ovniTranslateRight) {
        ovni.translateX(ovniMovementSpeed);
    }

    if (Math.pow(ovni.position.x, 2) + Math.pow(ovni.position.z, 2) > Math.pow(sceneRadius - 60, 2)) {
        ovni.position.x = prevOvniXPos;
        ovni.position.z = prevOvniZPos;
    }
    
}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    
    renderer.render(scene, camera);

    renderer.setAnimationLoop( function () {

        renderer.render( scene, camera );
    
    } );
}


////////////////////////////
/* RESIZE WINDOW CALLBACK */
////////////////////////////
function onResize() { 
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }

}

///////////////////////
/* KEY DOWN CALLBACK */
///////////////////////
function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        case 49: // 1
            isDefaultCamera = true;
            break;
        case 50: // 2   
            terrain.material.map = starryTexture;
            currentTexture = 2;
            break;
        case 51: // 3
            terrain.material.map = floralFieldTexture;
            currentTexture = 1;
            break;
        case 52: // 4 - AUXILIAR CAMERA TODO: REMOVE
            isTopCamera = true;
            isDefaultCamera = false;
            isSideCamera = false;
            break;
        case 53: // 5 - AUXILIAR CAMERA TODO: REMOVE
            isSideCamera = true;
            isTopCamera = false;
            isDefaultCamera = false;
            break;
        // letter d or D
        case 68:
        case 100:
            switchDirectionalLight = true;
            break;

        // letter s or S
        case 83:
        case 115:
            ovniSwitchSpotLight = true;
            break;
        case 80:
        case 112:
            ovniSwitchPointLights = true;
            break;

        // letter q or Q
        case 81:
        case 113:
            lambertMaterial = true;
            phongMaterial = false;
            toonMaterial = false;
            basicMaterial = false;
            break;
        // letter w or W
        case 87:
        case 119:
            lambertMaterial = false;
            phongMaterial = true;
            toonMaterial = false;
            basicMaterial = false;
            break;
        // letter e or E
        case 69:
        case 101:
            lambertMaterial = false;
            phongMaterial = false;
            toonMaterial = true;
            basicMaterial = false;
            break;
        // letter r or R
        case 82:
        case 114:
            lambertMaterial = false;
            phongMaterial = false;
            toonMaterial = false;
            basicMaterial = true;
            break;

        // Arrow keys to move ovni
        case 37: // left arrow
            ovniTranslateLeft = true;
            break;
        case 38: // up arrow
            ovniTranslateBackward = true;
            break;
        case 39: // right arrow
            ovniTranslateRight = true;
            break;
        case 40: // down arrow
            ovniTranslateForward = true;
            break;
    }

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

    switch(e.keyCode) {
        // Arrow keys to move ovni
        case 37: // left arrow
            ovniTranslateLeft = false;
            break;
        case 38: // up arrow
            ovniTranslateBackward = false;
            break;
        case 39: // right arrow
            ovniTranslateRight = false;
            break;
        case 40: // down arrow
            ovniTranslateForward = false;
            break;
    }
}
