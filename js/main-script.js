//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var scene, renderer;

/* cameras vars */ var camera, frontCamera, upperCamera, lateralCamera, perspectiveCamera, ortogonalCamera;

/* Robot */ var robot;
            const primitives = [];
            var wireframe;

/* Trailer */ var trailer;

const robotSide = {
  RIGHT: -1,
  LEFT: 1,
};

const colors = {
    RED: 0xff0000,
    GREEN: 0x00ff00,
    BLUE: 0x0000ff,
    WHITE: 0xffffff,
    BLACK: 0x000000,
    GREY: 0x404040,
    YELLOW: 0xffff00,
    ORANGE: 0xffa500,
    BROWN: 0x8b4513,
    PURPLE: 0x800080,
    PINK: 0xffc0cb,
    CYAN: 0x00ffff,
    LIME: 0x00ff00,
    MAGENTA: 0xff00ff,
    SILVER: 0xc0c0c0,
    GOLD: 0xffd700,
    MAROON: 0x800000,
    OLIVE: 0x808000,
    DARKGREEN: 0x006400,
    DARKBLUE: 0x00008b,
    DARKGREY: 0x696969,
    LIGHTGREY: 0xd3d3d3,
    CRIMSON: 0xdc143c,
    CORAL: 0xff7f50,
    NAVY: 0x000080,
}

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();

    scene.background = new THREE.Color(colors.GREY);
    scene.add(new THREE.AxisHelper(10));

    createRobot();
    //createTrailer();
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
    upperCamera.position.y = 20;
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
    lateralCamera.position.x = -10;
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

    robot = new THREE.Object3D();
    robot.position.set(0, 0, 0);

    createRobotWaist(gWaist);

    scene.add(robot);
}

function createRobotWaist(gWaist) {

    'use strict';

    gWaist = new THREE.Object3D();

    var pWaistMaterial = new THREE.MeshBasicMaterial({color: colors.BROWN,wireframe: false });
    var xWaist = 10, yWaist = 4, zWaist = 10;
    var pWaist = new THREE.Mesh(new THREE.BoxGeometry(xWaist, yWaist, zWaist), pWaistMaterial);
    pWaist.position.set(0, 0, 0);
    primitives.push(pWaist);
    gWaist.add(pWaist);

    var pWheelMaterial = new THREE.MeshBasicMaterial({color: colors.BLACK,wireframe: false });
    
    var radTopWheel = 2, radBottomWheel = 2, heightWheel = 2;
    var pRightWheel = new THREE.Mesh(new THREE.CylinderGeometry(radTopWheel, radBottomWheel, heightWheel), pWheelMaterial);
    pRightWheel.rotation.z = Math.PI / 2;
    pRightWheel.position.set(- (xWaist / 2 + heightWheel / 2), - yWaist / 4, zWaist / 5);
    primitives.push(pRightWheel);
    gWaist.add(pRightWheel);

    var pLeftWheel = new THREE.Mesh(new THREE.CylinderGeometry(radTopWheel, radBottomWheel, heightWheel), pWheelMaterial);
    pLeftWheel.rotation.z = Math.PI / 2;
    pLeftWheel.position.set(xWaist / 2 + heightWheel / 2,  - yWaist / 4, zWaist / 5);
    primitives.push(pLeftWheel);
    gWaist.add(pLeftWheel);

    createRobotAbdomen(gWaist, yWaist);
    createRobotThigh(gWaist, xWaist, yWaist, zWaist, robotSide.LEFT);
    createRobotThigh(gWaist, xWaist, yWaist, zWaist, robotSide.RIGHT);

    robot.add(gWaist);
}

function createRobotAbdomen(gWaist, yWaist) {

    'use strict';

    var gAbdomen = new THREE.Object3D();
    var xAbdomen = 8, yAbdomen = 3, zAbdomen = 10;
    gAbdomen.position.set(0, yWaist / 2 + yAbdomen / 2, 0);

    var pAbdomenMaterial = new THREE.MeshBasicMaterial({color: colors.ORANGE,wireframe: false });
    var pAbdomen = new THREE.Mesh(new THREE.BoxGeometry(xAbdomen, yAbdomen, zAbdomen), pAbdomenMaterial);
    pAbdomen.position.set(0, 0, 0);
    primitives.push(pAbdomen);
    gAbdomen.add(pAbdomen);
    
    createRobotTorso(gAbdomen, yAbdomen);

    gWaist.add(gAbdomen);
}

function createRobotTorso(gAbdomen, yAbdomen) {

    'use strict';

    var gTorso = new THREE.Object3D();
    var xTorso = 14, yTorso = 6, zTorso = 10;
    gTorso.position.set(0, yAbdomen / 2 + yTorso / 2, 0);

    var pTorsoMaterial = new THREE.MeshBasicMaterial({color: colors.YELLOW,wireframe: false });
    var pTorso = new THREE.Mesh(new THREE.BoxGeometry(xTorso, yTorso, zTorso), pTorsoMaterial);
    pTorso.position.set(0, 0, 0);
    primitives.push(pTorso);
    gTorso.add(pTorso);

    createRobotHead(gTorso, yTorso, zTorso);
    createRobotArm(gTorso, xTorso, zTorso, robotSide.LEFT);
    createRobotArm(gTorso, xTorso, zTorso, robotSide.RIGHT);

    gAbdomen.add(gTorso);
}

function createRobotHead(gTorso, yTorso, zTorso) {

    'use strict';

    var gHead = new THREE.Object3D();
    var xHead = 4, yHead = 4, zHead = 4;
    gHead.position.set(0, yTorso / 2 + yHead / 2, zTorso / 5);

    var pHeadMaterial = new THREE.MeshBasicMaterial({color: colors.RED,wireframe: false });
    var pHead = new THREE.Mesh(new THREE.BoxGeometry(xHead, yHead, zHead), pHeadMaterial);
    pHead.position.set(0, 0, 0);
    primitives.push(pHead);
    gHead.add(pHead);

    createRobotEye(gHead, xHead, yHead, zHead, robotSide.LEFT);
    createRobotEye(gHead, xHead, yHead, zHead, robotSide.RIGHT);
    createRobotAntenna(gHead, xHead, yHead, zHead, robotSide.LEFT);
    createRobotAntenna(gHead, xHead, yHead, zHead, robotSide.RIGHT);

    gTorso.add(gHead);
}


function createRobotEye(gHead, xHead, yHead, zHead, side) {

    'use strict'

    var  gEye = new THREE.Object3D();
    var xEye = 1, yEye = 1, zEye = 1;
    gEye.position.set(side * (xHead/4), yHead/8, zHead/2);

    var pArmMaterial = new THREE.MeshBasicMaterial({color: colors.BLACK,wireframe: false });
    var pEye = new THREE.Mesh(new THREE.BoxGeometry(xEye, yEye, zEye), pArmMaterial);
    pEye.position.set(0, 0, 0);
    primitives.push(pEye);
    gEye.add(pEye);

    gHead.add(gEye);
}

function createRobotAntenna(gHead, xHead, yHead, zHead, side) {

    'use strict'

    var gAntenna = new THREE.Object3D();
    var rAntenna = 0.5, hAntenna = 3;
    gAntenna.position.set(side * (rAntenna + (xHead/2)), (3 * yHead) / 8, -zHead / 8);

    var pAntennaMaterial = new THREE.MeshBasicMaterial({color: colors.BLACK,wireframe: false });
    var pAntenna = new THREE.Mesh(new THREE.CylinderGeometry(rAntenna, rAntenna, hAntenna), pAntennaMaterial);
    pAntenna.position.set(0, 0, 0);
    primitives.push(pAntenna);
    gAntenna.add(pAntenna);

    gHead.add(gAntenna);
}

function createRobotArm(gTorso, xTorso, zTorso, side) {

    'use strict';

    var gArm = new THREE.Object3D();
    var xArm = 3, yArm = 6, zArm = 3;
    gArm.position.set(side * (xTorso / 2 + xArm / 2), 0, - ( 7 * zTorso) / 20);

    var pArmMaterial = new THREE.MeshBasicMaterial({color: colors.RED,wireframe: false });
    var pArm = new THREE.Mesh(new THREE.BoxGeometry(xArm, yArm, zArm), pArmMaterial);
    pArm.position.set(0, 0, 0);
    primitives.push(pArm);
    gArm.add(pArm);

    var pForearmMaterial = new THREE.MeshBasicMaterial({color: colors.BLUE,wireframe: false });
    var xForearm = 3, yForearm = 3, zForearm = 10;
    var pForearm = new THREE.Mesh(new THREE.BoxGeometry(xForearm, yForearm, zForearm), pForearmMaterial);
    pForearm.position.set(0, -yArm / 2 - yForearm / 2, (7 * zArm) / 6);
    primitives.push(pForearm);
    gArm.add(pForearm);

    createRobotExhaustPipe(gArm, xArm, yArm, side);    

    gTorso.add(gArm);

}

function createRobotExhaustPipe(gArm, xArm, yArm, side) {

    'use strict';

    var gExhaustPipe = new THREE.Object3D();
    var radExhaustPipe = 0.5, hExhaustPipe = 5;
    gExhaustPipe.position.set(side * (xArm / 2 + radExhaustPipe / 2), - (yArm / 12), 0);

    var pExhaustPipeMaterial = new THREE.MeshBasicMaterial({color: colors.BLACK,wireframe: false });
    var pExhaustPipe = new THREE.Mesh(new THREE.CylinderGeometry(radExhaustPipe, radExhaustPipe, hExhaustPipe), pExhaustPipeMaterial);
    pExhaustPipe.position.set(0, 0, 0);
    primitives.push(pExhaustPipe);
    gExhaustPipe.add(pExhaustPipe);

    var pTopExhaustPipeMaterial = new THREE.MeshBasicMaterial({color: colors.SILVER,wireframe: false });
    var radTopExhaustPipe = 0.2, hTopExhaustPipe = 2;
    var pTopExhaustPipe = new THREE.Mesh(new THREE.CylinderGeometry(radTopExhaustPipe, radTopExhaustPipe, hTopExhaustPipe), pTopExhaustPipeMaterial);
    pTopExhaustPipe.position.set(0, hExhaustPipe / 2 + hTopExhaustPipe / 2, 0);
    primitives.push(pTopExhaustPipe);
    gExhaustPipe.add(pTopExhaustPipe);

    gArm.add(gExhaustPipe);
}

function createRobotThigh(gWaist, xWaist, yWaist, zWaist, side) {
    
    'use strict';

    var gThigh = new THREE.Object3D();
    var xThigh = 2, yThigh = 4, zThigh = 2;
    gThigh.position.set(side * (3 * xWaist) / 10, -yWaist / 2 - yThigh / 2, -zWaist / 10);

    var pThighMaterial = new THREE.MeshBasicMaterial({color: colors.PURPLE,wireframe: false });
    var pThigh = new THREE.Mesh(new THREE.BoxGeometry(xThigh, yThigh, zThigh), pThighMaterial);
    pThigh.position.set(0, 0, 0);
    primitives.push(pThigh);
    gThigh.add(pThigh);

    createRobotLeg(gThigh, yThigh, side);

    gWaist.add(gThigh);
}

function createRobotLeg(gThigh, yThigh, side) {

    'use strict';

    var gLeg = new THREE.Object3D();
    var xLeg = 4, yLeg = 10, zLeg = 4;
    gLeg.position.set(0, -yThigh / 2 - yLeg / 2, 0);

    var pLegMaterial = new THREE.MeshBasicMaterial({color: colors.GREEN,wireframe: false });
    var pLeg = new THREE.Mesh(new THREE.BoxGeometry(side * xLeg, yLeg, zLeg), pLegMaterial);
    pLeg.position.set(0, 0, 0);
    primitives.push(pLeg);
    gLeg.add(pLeg);

    var radTopWheel = 2, radBottomWheel = 2, heightWheel = 2;

    var pWheelMaterial = new THREE.MeshBasicMaterial({color: colors.BLACK,wireframe: false });

    var pTopWheel = new THREE.Mesh(new THREE.CylinderGeometry(radTopWheel, radTopWheel, heightWheel), pWheelMaterial);
    pTopWheel.rotation.z = Math.PI / 2;
    pTopWheel.position.set(side * (xLeg / 2 + heightWheel / 2), yLeg / 5, zLeg / 4);
    primitives.push(pTopWheel);
    gLeg.add(pTopWheel);

    var pBottomWheel = new THREE.Mesh(new THREE.CylinderGeometry(radBottomWheel, radBottomWheel, heightWheel), pWheelMaterial);
    pBottomWheel.rotation.z = Math.PI / 2;
    pBottomWheel.position.set(side * (xLeg / 2 + heightWheel / 2),  - (3 * yLeg) / 10, zLeg / 4);
    primitives.push(pBottomWheel);
    gLeg.add(pBottomWheel);

    createRobotFoot(gLeg, yLeg, zLeg);

    gThigh.add(gLeg);
}

function createRobotFoot(gLeg, yLeg, zLeg) {

    'use strict';

    var gFoot = new THREE.Object3D();
    var xFoot = 4, yFoot = 2, zFoot = 4;
    gFoot.position.set(0, - yLeg / 2 - yFoot / 2, zLeg / 2);

    var pFootMaterial = new THREE.MeshBasicMaterial({color: colors.CYAN,wireframe: false });
    var pFoot = new THREE.Mesh(new THREE.BoxGeometry(xFoot, yFoot, zFoot), pFootMaterial);
    pFoot.position.set(0, 0, 0);
    primitives.push(pFoot);
    gFoot.add(pFoot);

    gLeg.add(gFoot);
}

function createTrailer() {
    
    'use strict';

    var gContainer;

    trailer = new THREE.Object3D();
    trailer.position.set(0, 0, 0);

    createTrailerContainer(gContainer);

    scene.add(trailer);
}

function createTrailerContainer(gContainer) {

    'use strict'

    var gContainer = new THREE.Object3D();
    var xContainer = 14, yContainer = 16, zContainer = 36;

    var pContainerMaterial = new THREE.MeshBasicMaterial({color: colors.YELLOW, wireframe: false });
    var pContainer = new THREE.Mesh(new THREE.BoxGeometry(xContainer, yContainer, zContainer), pContainerMaterial);
    pContainer.position.set(0, 0, 0);
    primitives.push(pContainer);
    gContainer.add(pContainer);

    trailer.add(gContainer)

    var pWheelMaterial = new THREE.MeshBasicMaterial({color: colors.BLACK,wireframe: false });

    var radTopWheel = 2, radBottomWheel = 2, heightWheel = 2;
    
    var pRightBackWheel = new THREE.Mesh(new THREE.CylinderGeometry(radTopWheel, radBottomWheel, heightWheel), pWheelMaterial);
    pRightBackWheel.rotation.z = Math.PI / 2;
    pRightBackWheel.position.set(- xContainer * 5 / 14, -yContainer / 2, zContainer / 3);
    primitives.push(pRightBackWheel);
    gContainer.add(pRightBackWheel);

    var pLeftBackWheel = new THREE.Mesh(new THREE.CylinderGeometry(radTopWheel, radBottomWheel, heightWheel), pWheelMaterial);
    pLeftBackWheel.rotation.z = Math.PI / 2;
    pLeftBackWheel.position.set(xContainer * 5 / 14,  -yContainer / 2, zContainer / 3);
    primitives.push(pLeftBackWheel);
    gContainer.add(pLeftBackWheel);
    
    var pRightFrontWheel = new THREE.Mesh(new THREE.CylinderGeometry(radTopWheel, radBottomWheel, heightWheel), pWheelMaterial);
    pRightFrontWheel.rotation.z = Math.PI / 2;
    pRightFrontWheel.position.set(- xContainer * 5 / 14, -yContainer / 2, zContainer * 5 / 36);
    primitives.push(pRightFrontWheel);
    gContainer.add(pRightFrontWheel);

    var pLeftFrontWheel = new THREE.Mesh(new THREE.CylinderGeometry(radTopWheel, radBottomWheel, heightWheel), pWheelMaterial);
    pLeftFrontWheel.rotation.z = Math.PI / 2;
    pLeftFrontWheel.position.set(xContainer * 5 / 14,  -yContainer / 2, zContainer * 5 / 36);
    primitives.push(pLeftFrontWheel);
    gContainer.add(pLeftFrontWheel);
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

    wireframe = false;

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
    
            //robotMaterial.wireframe = !robotMaterial.wireframe;
            wireframe = !wireframe;
            primitives.forEach(primitive => {
                primitive.material.wireframe = wireframe;
            });
            break;
    }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}