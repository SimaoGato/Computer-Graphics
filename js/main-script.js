//////////////////////
/* GLOBAL VARIABLES */
//////////////////////

/* cameras vars */ var frontCamera, upperCamera, lateralCamera, perspectiveCamera;


/////////////////////
/* CREATE SCENE(S) */
/////////////////////
function createScene(){
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

}

////////////////////////////////
/* INITIALIZE ANIMATION CYCLE */
////////////////////////////////
function init() {
    'use strict';

}

/////////////////////
/* ANIMATION CYCLE */
/////////////////////
function animate() {
    'use strict';

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

}

///////////////////////
/* KEY UP CALLBACK */
///////////////////////
function onKeyUp(e){
    'use strict';

}