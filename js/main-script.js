//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var scene, renderer;

/* cameras vars */ var camera, frontCamera, upperCamera, lateralCamera, perspectiveCamera, ortogonalCamera;

/* Robot */ var robot, robotMaterial;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();

    scene.background = new THREE.Color(0x404040);
    scene.add(new THREE.AxisHelper(10));

    createRobot();
}

//////////////////////
/* CREATE CAMERA(S) */
//////////////////////
function createPerspectiveCamera() {
    'use strict';
    perspectiveCamera = new THREE.PerspectiveCamera(70,
                                         window.innerWidth / window.innerHeight,
                                         1,
                                         1000);
    perspectiveCamera.position.x = 20;
    perspectiveCamera.position.y = 20;
    perspectiveCamera.position.z = 20;
    perspectiveCamera.lookAt(scene.position);
}

function createOrtogonalCamera() {
    'use strict';
    ortogonalCamera = new THREE.OrthographicCamera(window.innerWidth / -25,
                                         window.innerWidth / 25,
                                         window.innerHeight / 25,
                                         window.innerHeight / -25,
                                         1,
                                         1000);
    ortogonalCamera.position.x = -10;
    ortogonalCamera.position.y = -5;
    ortogonalCamera.position.z = 10;
    ortogonalCamera.lookAt(scene.position);
}

function createFrontCamera() {
    'use strict';
    frontCamera = new THREE.OrthographicCamera(window.innerWidth / -25,
                                         window.innerWidth / 25,
                                         window.innerHeight / 25,
                                         window.innerHeight / -25,
                                         0.1,
                                         1000);
    frontCamera.position.x = 0;
    frontCamera.position.y = 0;
    frontCamera.position.z = 10;
    frontCamera.lookAt(scene.position);
}

function createUpperCamera() {
    'use strict';
    upperCamera = new THREE.OrthographicCamera(window.innerWidth / -25,
                                         window.innerWidth / 25,
                                         window.innerHeight / 25,
                                         window.innerHeight / -25,
                                         0.1,
                                         1000);
    upperCamera.position.x = 0;
    upperCamera.position.y = 10;
    upperCamera.position.z = 0;
    upperCamera.lookAt(scene.position);
}

function createLateralCamera() {
    'use strict';
    lateralCamera = new THREE.OrthographicCamera(window.innerWidth / -25,
                                         window.innerWidth / 25,
                                         window.innerHeight / 25,
                                         window.innerHeight / -25,
                                         0.1,
                                         1000);
    lateralCamera.position.x = 10;
    lateralCamera.position.y = 0;
    lateralCamera.position.z = 0;
    lateralCamera.lookAt(scene.position);
}

/////////////////////
/* CREATE LIGHT(S) */
/////////////////////

////////////////////////
/* CREATE OBJECT3D(S) */
////////////////////////

function createRobot() {
    'use strict';

    var gWaist;

    robotMaterial = new THREE.MeshBasicMaterial({color: 0x0000ff,wireframe: false });

    robot = new THREE.Object3D();
    robot.position.set(0, 0, 0);

    createRobotWaist(gWaist);
    //createRobotAbdomen();
    //createRobotTorso();

    scene.add(robot);
}

function createRobotWaist(gWaist) {

    'use strict';

    gWaist = new THREE.Object3D();

    var xWaist = 10, yWaist = 4, zWaist = 10;
    var pWaist = new THREE.Mesh(new THREE.BoxGeometry(xWaist, yWaist, zWaist), robotMaterial)
    pWaist.position.set(0, 0, 0);
    gWaist.add(pWaist);

    var radTopWheel = 2, radBottomWheel = 2, heightWheel = 2;
    var pRightWheel = new THREE.Mesh(new THREE.CylinderGeometry(radTopWheel, radBottomWheel, heightWheel), robotMaterial);
    pRightWheel.rotation.z = Math.PI / 2;
    pRightWheel.position.set(- (xWaist / 2 + heightWheel / 2), - yWaist / 4, 0);
    gWaist.add(pRightWheel);

    var pLeftWheel = new THREE.Mesh(new THREE.CylinderGeometry(radTopWheel, radBottomWheel, heightWheel), robotMaterial);
    pLeftWheel.rotation.z = Math.PI / 2;
    pLeftWheel.position.set(xWaist / 2 + heightWheel / 2,  - yWaist / 4, 0);
    gWaist.add(pLeftWheel);

    createRobotAbdomen(gWaist, yWaist);

    robot.add(gWaist);
}

function createRobotAbdomen(gWaist, yWaist) {

    'use strict';

    var gAbdomen = new THREE.Object3D();
    var xAbdomen = 8, yAbdomen = 3, zAbdomen = 10;
    gAbdomen.position.set(0, yWaist / 2 + yAbdomen / 2, 0);

    var pAbdomen = new THREE.Mesh(new THREE.BoxGeometry(xAbdomen, yAbdomen, zAbdomen), robotMaterial);
    pAbdomen.position.set(0, 0, 0);
    gAbdomen.add(pAbdomen);
    
    createRobotTorso(gAbdomen, yAbdomen);

    gWaist.add(gAbdomen);
}

function createRobotTorso(gAbdomen, yAbdomen) {

    'use strict';

    var gTorso = new THREE.Object3D();
    var xTorso = 14, yTorso = 6, zTorso = 10;
    gTorso.position.set(0, yAbdomen / 2 + yTorso / 2, 0);

    var pTorso = new THREE.Mesh(new THREE.BoxGeometry(xTorso, yTorso, zTorso), robotMaterial);
    pTorso.position.set(0, 0, 0);
    gTorso.add(pTorso);

    createRobotHead(gTorso, yTorso);

    gAbdomen.add(gTorso);
}

function createRobotHead(gTorso, yTorso) {

    'use strict';

    var gHead = new THREE.Object3D();
    var xHead = 4, yHead = 4, zHead = 4;
    gHead.position.set(0, yTorso / 2 + yHead / 2, 0);

    var pHead = new THREE.Mesh(new THREE.BoxGeometry(xHead, yHead, zHead), robotMaterial);
    pHead.position.set(0, 0, 0);
    gHead.add(pHead);

    createRobotEye(gHead, xHead, yHead, zHead, 1);
    createRobotEye(gHead, xHead, yHead, zHead, -1);
    createRobotAntenna(gHead, xHead, yHead, zHead, 1);
    createRobotAntenna(gHead, xHead, yHead, zHead, -1);

    gTorso.add(gHead);
}


function createRobotEye(gHead, xHead, yHead, zHead, side) {

    'use strict'

    var  gEye = new THREE.Object3D();
    var xEye = 1, yEye = 1, zEye = 1;
    gEye.position.set(side * (xHead/4), yHead/8, zHead/2);

    var pEye = new THREE.Mesh(new THREE.BoxGeometry(xEye, yEye, zEye), robotMaterial);
    pEye.position.set(0, 0, 0);
    gEye.add(pEye);

    gHead.add(gEye);
}

function createRobotAntenna(gHead, xHead, yHead, zHead, side) {

    'use strict'

    var gAntenna = new THREE.Object3D();
    var rAntenna = 0.5, hAntenna = 3;
    gAntenna.position.set(side * (rAntenna + (xHead/2)), (3 * yHead) / 8, -zHead / 8);

    var pAntenna = new THREE.Mesh(new THREE.CylinderGeometry(rAntenna, rAntenna, hAntenna), robotMaterial);
    pAntenna.position.set(0, 0, 0);
    gAntenna.add(pAntenna);

    gHead.add(gAntenna);
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

    createPerspectiveCamera();
    createFrontCamera();
    createUpperCamera();
    createLateralCamera();
    createOrtogonalCamera();

    camera = perspectiveCamera;

    render();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
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

        case 49: // 1 - Front Camera
            camera = frontCamera;
            break;
        case 50: // 2 - Lateral Camera
            camera = lateralCamera;
            break;
        case 51: // 3 - Upper Camera
            camera = upperCamera;
            break;
        case 52: // 4 - Perspective Camera
            camera = perspectiveCamera;
            break;
        case 53: // 4 - Ortogonal Camera
            camera = ortogonalCamera;
            break;

        case 54: // 6 - Wireframe
    
            robotMaterial.wireframe = !robotMaterial.wireframe;
            break;
    }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}