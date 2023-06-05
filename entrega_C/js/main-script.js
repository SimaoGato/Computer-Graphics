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

// OVNI
var ovni;

// Materials
primitiveArray = [];
materialOptionsArray = [];
var materialSwitch = false;
var currentMaterial = 0;

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
    createCamera();
    
    window.addEventListener("keydown", onKeyDown);
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
    
    scene.add(new THREE.AxisHelper(10));
    
    createFloralField();
    createSkydome();
    createMoon();
    //createLight();
    createHouse();
    createOVNI();
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
    createThree(new THREE.Vector3(125, 5, 20), 100 * defaultRotation, 1.5 * defaultHeight);
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


    function createBranch(matrix) {
        'use strict';

        var threeBranchMaterialOptions = [
            new THREE.MeshLambertMaterial({ color: threeBrownOrangeColor }),
            new THREE.MeshPhongMaterial({ color: threeBrownOrangeColor, shininess: 100 }),
            new THREE.MeshToonMaterial({ color: threeBrownOrangeColor })
        ];
        materialOptionsArray.push(threeBranchMaterialOptions);
        var threeLeafMaterialOptions = [
            new THREE.MeshLambertMaterial({ color: threeLeafColor }),
            new THREE.MeshPhongMaterial({ color: threeLeafColor, shininess: 100 }),
            new THREE.MeshToonMaterial({ color: threeLeafColor })
        ];
        materialOptionsArray.push(threeLeafMaterialOptions);

        var threeBranchMaterial = threeBranchMaterialOptions[0];
        var threeLeafMaterial = threeLeafMaterialOptions[0];

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


    var baseThreeMaterialOptions = [
        new THREE.MeshLambertMaterial({ color: threeBrownOrangeColor }),
        new THREE.MeshPhongMaterial({ color: threeBrownOrangeColor, shininess: 100 }),
        new THREE.MeshToonMaterial({ color: threeBrownOrangeColor })
    ];
    materialOptionsArray.push(baseThreeMaterialOptions);
    var baseThreeMaterial = baseThreeMaterialOptions[0];
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

    var lightGreyColor = 0x696969;
    var darkGreyColor = 0x222222;
    var greenColor = 0x00FF00;
    var whiteColor = 0xFFFFFF;

    ovni = new THREE.Object3D();
    ovni.position.set(20, 75, 0);

    var ovniGeometry = new THREE.SphereGeometry(10, 32, 32);
    var ovniMaterialOptions = [
        new THREE.MeshLambertMaterial({ color: lightGreyColor }),
        new THREE.MeshPhongMaterial({ color: lightGreyColor, shininess: 100 }),
        new THREE.MeshToonMaterial({ color: lightGreyColor })
    ];
    materialOptionsArray.push(ovniMaterialOptions);
    var ovniMaterial = ovniMaterialOptions[0];
    var ovniBody = new THREE.Mesh(ovniGeometry, ovniMaterial);
    primitiveArray.push(ovniBody);
    ovniBody.scale.set(1, 0.2, 1);
    ovni.add(ovniBody);

    const radius = 4; // Radius of the UFO
    const thetaStart = 0; // Starting angle of the cap
    const thetaLength = Math.PI; // Angle range of the cap (half a sphere)
    const segments = 32; // Number of segments for the geometry
    const cockpitGeometry = new THREE.SphereGeometry(radius, segments, segments, thetaStart, thetaLength);
    const cockpitMaterialOptions = [
        new THREE.MeshLambertMaterial({ color: greenColor }),
        new THREE.MeshPhongMaterial({ color: greenColor, shininess: 100 }),
        new THREE.MeshToonMaterial({ color: greenColor })
    ];
    materialOptionsArray.push(cockpitMaterialOptions);
    const material = cockpitMaterialOptions[0];
    const cockpit = new THREE.Mesh(cockpitGeometry, material);
    primitiveArray.push(cockpit);

    cockpit.position.set(0, 1.5, 0);
    cockpit.rotation.x = - Math.PI / 2;
    cockpit.scale.set(1, 1, 1);
    ovni.add(cockpit);

    var bottomCylinderGeometry = new THREE.CylinderGeometry(2, 2, 2, 32);
    var bottomCylinderMaterialOptions = [
        new THREE.MeshLambertMaterial({ color: darkGreyColor }),
        new THREE.MeshPhongMaterial({ color: darkGreyColor, shininess: 100 }),
        new THREE.MeshToonMaterial({ color: darkGreyColor })
    ];
    materialOptionsArray.push(bottomCylinderMaterialOptions);
    var bottomCylinderMaterial = bottomCylinderMaterialOptions[0];
    var bottomCylinder = new THREE.Mesh(bottomCylinderGeometry, bottomCylinderMaterial);
    primitiveArray.push(bottomCylinder);
    bottomCylinder.position.set(0, -2, 0);
    ovni.add(bottomCylinder);

    const spotLight = new THREE.SpotLight(whiteColor, 1, 70);// Color, Intensity, Distance
    spotLight.position.set(0, -3, 0);
    ovni.add(spotLight);
    
    createPointLights(ovni, new THREE.Vector3(8, -0.5, 0));
    createPointLights(ovni, new THREE.Vector3(-8, -0.5, 0));
    createPointLights(ovni, new THREE.Vector3(0, -0.5, 8));
    createPointLights(ovni, new THREE.Vector3(0, -0.5, -8));
    
    ovni.scale.set(3.2, 3.2, 3.2);

    scene.add(ovni);
}

function createPointLights(mat, pos) {
    'use strict';

    var blueColor = 0x0000FF;
    var redColor = 0xFF0000;
    var sphereMaterialOptions = [
        new THREE.MeshLambertMaterial({ color: blueColor }),
        new THREE.MeshPhongMaterial({ color: blueColor, shininess: 100 }),
        new THREE.MeshToonMaterial({ color: blueColor })
    ]
    materialOptionsArray.push(sphereMaterialOptions);
    var sphereMaterial = sphereMaterialOptions[0];
    var sphereGeometry = new THREE.SphereGeometry(1.5, 32, 32);
    var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    primitiveArray.push(sphere);
    sphere.position.x = pos.x;
    sphere.position.y = pos.y;
    sphere.position.z = pos.z;

    var pointLight = new THREE.PointLight(redColor, 1, 30);
    pointLight.position.set(pos.x, pos.y - 3, pos.z);
    mat.add(pointLight);

    mat.add(sphere);
}

function createMaterials(color, shininess) { 
    var materials = [
        new THREE.MeshLambertMaterial({ color: color, side: THREE.DoubleSide}),
        new THREE.MeshPhongMaterial({ color: color, shininess: shininess, side: THREE.DoubleSide }),
        new THREE.MeshToonMaterial({ color: color, side: THREE.DoubleSide })
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

    if (materialSwitch) {
        currentMaterial = (currentMaterial + 1) % 3;
        for (var i = 0; i < primitiveArray.length; i++) {
            primitiveArray[i].material = materialOptionsArray[i][currentMaterial];
            console.log(currentMaterial);
        }
        materialSwitch = false;
    }
    
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
            camera.position.set(- sceneRadius * 0.9, sceneRadius * 0.2, sceneRadius * 0.05);
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
        // letter r or R
        case 82:
        case 114:
            materialSwitch = true;
            break;
    }

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}
