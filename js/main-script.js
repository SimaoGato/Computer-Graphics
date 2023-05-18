//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

var scene, renderer;

/* cameras vars */ var camera, frontCamera, upperCamera, lateralCamera, perspectiveCamera;

/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
    'use strict';

    scene = new THREE.Scene();

    scene.add(new THREE.AxisHelper(10));

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
    perspectiveCamera.position.x = 50;
    perspectiveCamera.position.y = 50;
    perspectiveCamera.position.z = 50;
    perspectiveCamera.lookAt(scene.position);
}

function createFrontCamera() {
    'use strict';
    frontCamera = new THREE.OrthographicCamera(window.innerWidth / -13,
                                         window.innerWidth / 13,
                                         window.innerHeight / 13,
                                         window.innerHeight / -13,
                                         0.1,
                                         1000);
    frontCamera.position.x = 50;
    frontCamera.position.y = 0;
    frontCamera.position.z = 0;
    frontCamera.lookAt(scene.position);
}

function createUpperCamera() {
    'use strict';
    upperCamera = new THREE.OrthographicCamera(window.innerWidth / -13,
                                         window.innerWidth / 13,
                                         window.innerHeight / 13,
                                         window.innerHeight / -13,
                                         0.1,
                                         1000);
    upperCamera.position.x = 0;
    upperCamera.position.y = 50;
    upperCamera.position.z = 0;
    upperCamera.lookAt(scene.position);
}

function createLateralCamera() {
    'use strict';
    lateralCamera = new THREE.OrthographicCamera(window.innerWidth / -13,
                                         window.innerWidth / 13,
                                         window.innerHeight / 13,
                                         window.innerHeight / -13,
                                         0.1,
                                         1000);
    lateralCamera.position.x = 0;
    lateralCamera.position.y = 0;
    lateralCamera.position.z = 50;
    lateralCamera.lookAt(scene.position);
}

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
    
    createPerspectiveCamera();
    createFrontCamera();
    createUpperCamera();
    createLateralCamera();

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
    }
}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}