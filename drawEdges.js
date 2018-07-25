function drawEdges(geometry, position) {
    var edges = new THREE.EdgesGeometry(geometry);
    var line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({color: 0x0f0f0f}));
    line.position.copy(position.position)
    return line
}