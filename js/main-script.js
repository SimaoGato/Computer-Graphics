//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var scene, renderer;

/* cameras vars */ var camera, frontCamera, upperCamera, lateralCamera, perspectiveCamera, ortogonalCamera;
var isFrontCamera = false, isUpperCamera = false, isLateralCamera = false, isPerspectiveCamera = true, isOrtogonalCamera = false;

/* Robot */ var robot;
            const primitives = [];
            var wireframe;

/* Trailer */ var trailer;

var armTranslateIn = false;
var armTranslateOut = false;
var rightArmPosition = { x: 0, y: 0, z: 0};
var leftArmPosition = { x: 0, y: 0, z: 0};
var pRightExhaustPipe, pLeftExhaustPipe, gRightExhaustPipe, gLeftExhaustPipe, pTopRightExhaustPipe, pTopLeftExhaustPipe;

var pRightArm, pRightForearm, pLeftArm, pLeftForearm, pArm, pForearm;
var gRightArm, gLeftArm, gArm;

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

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize);
    window.addEventListener("keyup", onKeyUp);
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
    createTrailer();
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

////////////
/* UPDATE */
////////////
function update(){
    'use strict';
    if(isFrontCamera) camera = frontCamera;
    if(isLateralCamera) camera = lateralCamera;
    if(isUpperCamera) camera = upperCamera;
    if(isPerspectiveCamera) camera = perspectiveCamera;
    if(isOrtogonalCamera) camera = ortogonalCamera;

    if((rightArmPosition.x - 0.1 < -8.5) || (leftArmPosition.x + 0.1 > 8.5)) armTranslateOut = false;
    if((rightArmPosition.x + 0.1 > -5.5) || ((leftArmPosition.x - 0.1 < 5.5))) armTranslateIn = false;
    if(leftArmPosition.x - 0.1 < 5.5) armTranslateIn = false;
    if(armTranslateIn) {
        rightArmPosition.x += 0.1;
        gRightArm.position.set(rightArmPosition.x, rightArmPosition.y, rightArmPosition.z);
        leftArmPosition.x -= 0.1;
        gLeftArm.position.set(leftArmPosition.x, leftArmPosition.y, leftArmPosition.z);
    }

    if(armTranslateOut) {
        rightArmPosition.x -= 0.1;
        gRightArm.position.set(rightArmPosition.x, rightArmPosition.y, rightArmPosition.z);
        leftArmPosition.x += 0.1;
        gLeftArm.position.set(leftArmPosition.x, leftArmPosition.y, leftArmPosition.z);
    }
    
}

/////////////
/* DISPLAY */
/////////////
function render() {
    'use strict';
    renderer.render(scene, camera);

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
    ortogonalCamera.position.x = -20;
    ortogonalCamera.position.y = -10;
    ortogonalCamera.position.z = 20;
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
    frontCamera.position.z = 20;
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
    lateralCamera.position.x = -20;
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

    var pWaistMaterial = new THREE.MeshBasicMaterial({color: colors.BROWN,wireframe: wireframe });
    var xWaist = 10, yWaist = 4, zWaist = 10;
    var pWaist = new THREE.Mesh(new THREE.BoxGeometry(xWaist, yWaist, zWaist), pWaistMaterial);
    
    gWaist.position.set(0, yWaist / 2, 0);
    
    pWaist.position.set(0, 0, 0);
    primitives.push(pWaist);
    gWaist.add(pWaist);

    var pWheelMaterial = new THREE.MeshBasicMaterial({color: colors.BLACK,wireframe: wireframe });
    
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

    var pAbdomenMaterial = new THREE.MeshBasicMaterial({color: colors.ORANGE,wireframe: wireframe });
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

    var pTorsoMaterial = new THREE.MeshBasicMaterial({color: colors.YELLOW,wireframe: wireframe });
    var pTorso = new THREE.Mesh(new THREE.BoxGeometry(xTorso, yTorso, zTorso), pTorsoMaterial);
    pTorso.position.set(0, 0, 0);
    primitives.push(pTorso);
    gTorso.add(pTorso);

    createRobotHead(gTorso, yTorso, zTorso);
    createRobotLeftArm(gTorso, xTorso, zTorso, robotSide.LEFT);
    createRobotRightArm(gTorso, xTorso, zTorso, robotSide.RIGHT);

    gAbdomen.add(gTorso);
}

function createRobotHead(gTorso, yTorso, zTorso) {

    'use strict';

    var gHead = new THREE.Object3D();
    var xHead = 4, yHead = 4, zHead = 4;
    gHead.position.set(0, yTorso / 2 + yHead / 2, zTorso / 5);

    var pHeadMaterial = new THREE.MeshBasicMaterial({color: colors.RED,wireframe: wireframe });
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

    var pArmMaterial = new THREE.MeshBasicMaterial({color: colors.BLACK,wireframe: wireframe });
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

    var pAntennaMaterial = new THREE.MeshBasicMaterial({color: colors.BLACK,wireframe: wireframe });
    var pAntenna = new THREE.Mesh(new THREE.CylinderGeometry(rAntenna, rAntenna, hAntenna), pAntennaMaterial);
    pAntenna.position.set(0, 0, 0);
    primitives.push(pAntenna);
    gAntenna.add(pAntenna);

    gHead.add(gAntenna);
}

function createRobotRightArm(gTorso, xTorso, zTorso, side) {

    'use strict';

    gRightArm = new THREE.Object3D();
    var xArm = 3, yArm = 6, zArm = 3;
    gRightArm.position.set(side * (xTorso / 2 + xArm / 2), 0, - ( 7 * zTorso) / 20);

    var pArmMaterial = new THREE.MeshBasicMaterial({color: colors.RED,wireframe: wireframe });
    pRightArm = new THREE.Mesh(new THREE.BoxGeometry(xArm, yArm, zArm), pArmMaterial);
    pRightArm.position.set(0, 0, 0);
    primitives.push(pRightArm);
    gRightArm.add(pRightArm);

    var pForearmMaterial = new THREE.MeshBasicMaterial({color: colors.BLUE,wireframe: wireframe });
    var xForearm = 3, yForearm = 3, zForearm = 10;
    pRightForearm = new THREE.Mesh(new THREE.BoxGeometry(xForearm, yForearm, zForearm), pForearmMaterial);
    pRightForearm.position.set(0, -yArm / 2 - yForearm / 2, (7 * zArm) / 6);
    primitives.push(pRightForearm);
    gRightArm.add(pRightForearm);

    rightArmPosition.x = gRightArm.position.x;
    rightArmPosition.y = gRightArm.position.y;
    rightArmPosition.z = gRightArm.position.z;

    gRightExhaustPipe = new THREE.Object3D();
    var result = createRobotExhaustPipe(gRightArm, xArm, yArm, gRightExhaustPipe, pRightExhaustPipe, side);
    pRightExhaustPipe = result[0];
    pTopRightExhaustPipe = result[1];

    gTorso.add(gRightArm);
}

function createRobotLeftArm(gTorso, xTorso, zTorso, side) {
    'use strict';

    gLeftArm = new THREE.Object3D();
    var xArm = 3, yArm = 6, zArm = 3;
    gLeftArm.position.set(side * (xTorso / 2 + xArm / 2), 0, - ( 7 * zTorso) / 20);

    var pArmMaterial = new THREE.MeshBasicMaterial({color: colors.RED,wireframe: wireframe });
    pLeftArm = new THREE.Mesh(new THREE.BoxGeometry(xArm, yArm, zArm), pArmMaterial);
    pLeftArm.position.set(0, 0, 0);
    primitives.push(pLeftArm);
    gLeftArm.add(pLeftArm);

    var pForearmMaterial = new THREE.MeshBasicMaterial({color: colors.BLUE,wireframe: wireframe });
    var xForearm = 3, yForearm = 3, zForearm = 10;
    pLeftForearm = new THREE.Mesh(new THREE.BoxGeometry(xForearm, yForearm, zForearm), pForearmMaterial);
    pLeftForearm.position.set(0, -yArm / 2 - yForearm / 2, (7 * zArm) / 6);
    primitives.push(pLeftForearm);
    gLeftArm.add(pLeftForearm);

    leftArmPosition.x = gLeftArm.position.x;
    leftArmPosition.y = gLeftArm.position.y;
    leftArmPosition.z = gLeftArm.position.z;

    gLeftExhaustPipe = new THREE.Object3D();
    var result = createRobotExhaustPipe(gLeftArm, xArm, yArm, gLeftExhaustPipe, pLeftExhaustPipe, side);
    pLeftExhaustPipe = result[0];
    pTopLeftExhaustPipe = result[1];

    gTorso.add(gLeftArm);
}

function createRobotExhaustPipe(gArm, xArm, yArm, gExhaustPipe, pExhaustPipe, side) {

    'use strict';

    var radExhaustPipe = 0.5, hExhaustPipe = 5;
    gExhaustPipe.position.set(side * (xArm / 2 + radExhaustPipe / 2), - (yArm / 12), 0);

    var pExhaustPipeMaterial = new THREE.MeshBasicMaterial({color: colors.BLACK,wireframe: wireframe });
    pExhaustPipe = new THREE.Mesh(new THREE.CylinderGeometry(radExhaustPipe, radExhaustPipe, hExhaustPipe), pExhaustPipeMaterial);
    pExhaustPipe.position.set(0, 0, 0);
    primitives.push(pExhaustPipe);
    gExhaustPipe.add(pExhaustPipe);

    var pTopExhaustPipeMaterial = new THREE.MeshBasicMaterial({color: colors.SILVER,wireframe: wireframe });
    var radTopExhaustPipe = 0.2, hTopExhaustPipe = 2;
    var pTopExhaustPipe = new THREE.Mesh(new THREE.CylinderGeometry(radTopExhaustPipe, radTopExhaustPipe, hTopExhaustPipe), pTopExhaustPipeMaterial);
    pTopExhaustPipe.position.set(0, hExhaustPipe / 2 + hTopExhaustPipe / 2, 0);
    primitives.push(pTopExhaustPipe);

    gExhaustPipe.add(pTopExhaustPipe);

    gArm.add(gExhaustPipe);

    return [pExhaustPipe, pTopExhaustPipe];
}

function createRobotThigh(gWaist, xWaist, yWaist, zWaist, side) {
    
    'use strict';

    var gThigh = new THREE.Object3D();
    var xThigh = 2, yThigh = 4, zThigh = 2;
    gThigh.position.set(side * (3 * xWaist) / 10, -yWaist / 2 - yThigh / 2, -zWaist / 10);

    var pThighMaterial = new THREE.MeshBasicMaterial({color: colors.PURPLE,wireframe: wireframe });
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

    var pLegMaterial = new THREE.MeshBasicMaterial({color: colors.GREEN,wireframe: wireframe });
    var pLeg = new THREE.Mesh(new THREE.BoxGeometry(side * xLeg, yLeg, zLeg), pLegMaterial);
    pLeg.position.set(0, 0, 0);
    primitives.push(pLeg);
    gLeg.add(pLeg);

    var radTopWheel = 2, radBottomWheel = 2, heightWheel = 2;

    var pWheelMaterial = new THREE.MeshBasicMaterial({color: colors.BLACK,wireframe: wireframe });

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

    var pFootMaterial = new THREE.MeshBasicMaterial({color: colors.CYAN,wireframe: wireframe });
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
    trailer.position.set(0, 9.5, -30);

    createTrailerContainer(gContainer);

    scene.add(trailer);
}

function createTrailerContainer(gContainer) {

    'use strict'

    var gContainer = new THREE.Object3D();
    var xContainer = 14, yContainer = 13, zContainer = 36;

    var pContainerMaterial = new THREE.MeshBasicMaterial({color: colors.WHITE, wireframe: wireframe });
    var pContainer = new THREE.Mesh(new THREE.BoxGeometry(xContainer, yContainer, zContainer), pContainerMaterial);
    pContainer.position.set(0, 0, 0);
    primitives.push(pContainer);
    gContainer.add(pContainer);
    
    trailer.add(gContainer);

    createWheelAxe(gContainer, xContainer, yContainer, zContainer);
    createContainerBottomFront(gContainer, xContainer, yContainer, zContainer);
    createContainerBottomMiddle(gContainer, xContainer, yContainer, zContainer);
    createContainerBottomBack(gContainer, xContainer, yContainer, zContainer);
}

function createWheelAxe(gContainer, xContainer, yContainer, zContainer) {
    
    'use strict'
    
    var gWheelAxe = new THREE.Object3D();
    var xWheelAxe = 8, yWheelAxe = 3, zWheelAxe = 11;
    gWheelAxe.position.set(0, - yContainer / 2 - yWheelAxe / 2, - zContainer / (36 / 8.5));
    
    var pWheelAxeMaterial = new THREE.MeshBasicMaterial({color: colors.PINK, wireframe: wireframe });
    var pWheelAxe = new THREE.Mesh(new THREE.BoxGeometry(xWheelAxe, yWheelAxe, zWheelAxe), pWheelAxeMaterial);
    pWheelAxe.position.set(0, 0, 0);
    primitives.push(pWheelAxe);
    gWheelAxe.add(pWheelAxe);
    
    var pWheelMaterial = new THREE.MeshBasicMaterial({color: colors.BLACK,wireframe: wireframe });
    
    var radTopWheel = 2, radBottomWheel = 2, heightWheel = 2;
    
    var pRightBackWheel = new THREE.Mesh(new THREE.CylinderGeometry(radTopWheel, radBottomWheel, heightWheel), pWheelMaterial);
    pRightBackWheel.rotation.z = Math.PI / 2;
    pRightBackWheel.position.set(- xWheelAxe / 2, - yWheelAxe / 3, - zWheelAxe / (11 / 3.5));
    primitives.push(pRightBackWheel);
    gWheelAxe.add(pRightBackWheel);
    
    var pLeftBackWheel = new THREE.Mesh(new THREE.CylinderGeometry(radTopWheel, radBottomWheel, heightWheel), pWheelMaterial);
    pLeftBackWheel.rotation.z = Math.PI / 2;
    pLeftBackWheel.position.set(xWheelAxe / 2, - yWheelAxe / 3, - zWheelAxe / (11 / 3.5));
    primitives.push(pLeftBackWheel);
    gWheelAxe.add(pLeftBackWheel);
    
    var pRightFrontWheel = new THREE.Mesh(new THREE.CylinderGeometry(radTopWheel, radBottomWheel, heightWheel), pWheelMaterial);
    pRightFrontWheel.rotation.z = Math.PI / 2;
    pRightFrontWheel.position.set(xWheelAxe / 2, - yWheelAxe / 3, zWheelAxe / (11 / 3.5));
    primitives.push(pRightFrontWheel);
    gWheelAxe.add(pRightFrontWheel);
    
    var pLeftFrontWheel = new THREE.Mesh(new THREE.CylinderGeometry(radTopWheel, radBottomWheel, heightWheel), pWheelMaterial);
    pLeftFrontWheel.rotation.z = Math.PI / 2;
    pLeftFrontWheel.position.set(- xWheelAxe / 2, - yWheelAxe / 3, zWheelAxe / (11 / 3.5));
    primitives.push(pLeftFrontWheel);
    gWheelAxe.add(pLeftFrontWheel);
    
    gContainer.add(gWheelAxe);
}

function createContainerBottomFront(gContainer, xContainer, yContainer, zContainer) {

    'use strict'
    
    var gWheelAxe = new THREE.Object3D();
    var xWheelAxe = 14, yWheelAxe = 3, zWheelAxe = 21;
    gWheelAxe.position.set(0, - yContainer / 2 - yWheelAxe / 2, 7.5);
    
    var pWheelAxeMaterial = new THREE.MeshBasicMaterial({color: colors.CYAN, wireframe: wireframe });
    var pWheelAxe = new THREE.Mesh(new THREE.BoxGeometry(xWheelAxe, yWheelAxe, zWheelAxe), pWheelAxeMaterial);
    pWheelAxe.position.set(0, 0, 0);
    primitives.push(pWheelAxe);
    gWheelAxe.add(pWheelAxe);

    gContainer.add(gWheelAxe);
}

function createContainerBottomMiddle(gContainer, xContainer, yContainer, zContainer) {

    'use strict'
    
    var gWheelAxe = new THREE.Object3D();
    var xWheelAxe = 14, yWheelAxe = 3, zWheelAxe = 3;
    gWheelAxe.position.set(0, - yContainer / 2 - yWheelAxe / 2, -8.5);
    
    var pWheelAxeMaterial = new THREE.MeshBasicMaterial({color: colors.GREEN, wireframe: wireframe });
    var pWheelAxe = new THREE.Mesh(new THREE.BoxGeometry(xWheelAxe, yWheelAxe, zWheelAxe), pWheelAxeMaterial);
    pWheelAxe.position.set(0, 0, 0);
    primitives.push(pWheelAxe);
    gWheelAxe.add(pWheelAxe);

    gContainer.add(gWheelAxe);
}

function createContainerBottomBack(gContainer, xContainer, yContainer, zContainer) {

    'use strict'
    
    var gWheelAxe = new THREE.Object3D();
    var xWheelAxe = 14, yWheelAxe = 3, zWheelAxe = 4;
    gWheelAxe.position.set(0, - yContainer / 2 - yWheelAxe / 2, -16);
    
    var pWheelAxeMaterial = new THREE.MeshBasicMaterial({color: colors.RED, wireframe: wireframe });
    var pWheelAxe = new THREE.Mesh(new THREE.BoxGeometry(xWheelAxe, yWheelAxe, zWheelAxe), pWheelAxeMaterial);
    pWheelAxe.position.set(0, 0, 0);
    primitives.push(pWheelAxe);
    gWheelAxe.add(pWheelAxe);

    gContainer.add(gWheelAxe);
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
            isFrontCamera = true;
            isUpperCamera = false;
            isLateralCamera = false;
            isPerspectiveCamera = false;
            isOrtogonalCamera = false;
            break;
        case 50: // 2 - Lateral Camera
            isLateralCamera = true;
            isFrontCamera = false;
            isUpperCamera = false;
            isPerspectiveCamera = false;
            isOrtogonalCamera = false;
            break;
        case 51: // 3 - Upper Camera
            isUpperCamera = true;
            isFrontCamera = false;
            isLateralCamera = false;
            isPerspectiveCamera = false;
            isOrtogonalCamera = false;
            break;
        case 52: // 4 - Perspective Camera
            isPerspectiveCamera = true;
            isFrontCamera = false;
            isLateralCamera = false;
            isUpperCamera = false;
            isOrtogonalCamera = false;
            break;
        case 53: // 4 - Ortogonal Camera
            isOrtogonalCamera = true;
            isFrontCamera = false;
            isLateralCamera = false;
            isUpperCamera = false;
            isPerspectiveCamera = false;
            break;
        case 54: // 6 - Wireframe
            wireframe = !wireframe;
            primitives.forEach(primitive => {
                primitive.material.wireframe = wireframe;
            });
            break;
        case 69: // 7 - Translate arms into body
        case 101:
            armTranslateIn = true;
            break;
        case 68:
        case 100:
            armTranslateOut = true;
            break;
    }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';
    switch (e.keyCode) {
        case 69:
        case 101:
            armTranslateIn = false;
            break;
        case 68:
        case 100:
            armTranslateOut = false;
            break;
    }
}