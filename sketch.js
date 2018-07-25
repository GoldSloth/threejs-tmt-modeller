var camera;
function enableRender(data) {
    console.log("Initiated render")
    console.log(data)
    var width = document.getElementById("render").offsetWidth;
    var height = document.getElementById("render").offsetHeight;
    var scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
    var controls = new THREE.OrbitControls(camera);
    controls.enableDamping = true;
    controls.enablePan = false;
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    document.getElementById("render").appendChild(renderer.domElement);

    
    var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
    var markerMaterial = new THREE.MeshLambertMaterial({color: 0xffff00});
    var amblight = new THREE.AmbientLight(0xffffff, 0.3)
    var Light = new THREE.PointLight(0xffffff, 0.5)
    Light.position.copy(camera.position);
    Light.lookAt(controls.target.x, controls.target.y, controls.target.z)
    scene.add(amblight)
    scene.add(Light)
    camera.position.z = 20;
    controls.update();
    camera.lookAt(0, 0, 0)
    controls.update();
    var marker = drawMarker(markerMaterial)
    scene.add(marker)
    for (var i=0;i<data.length;i++) {
        var items = drawShapebox(data[i], material)
        var cube = items[0]
        scene.add(cube);
        scene.add(items[1])
    }
    

    //var centerMaterial = new THREE.MeshBasicMaterial({color: 0xFFFF00});
    //var marker = drawMarker(centerMaterial)
    //scene.add(marker);

    function draw() {
        requestAnimationFrame(draw);
        renderer.render(scene, camera);
        camera.lookAt(0, 0, 0)
        controls.update();
        Light.position.copy(camera.position);
  
    }
    draw()

}
