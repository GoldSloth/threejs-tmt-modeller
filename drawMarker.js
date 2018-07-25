function drawMarker(material, position) {
    var geometry = new THREE.OctahedronGeometry(0.5)
    var marker = new THREE.Mesh(geometry, material);
    return marker;
}