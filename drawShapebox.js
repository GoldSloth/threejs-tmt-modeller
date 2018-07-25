function drawShapebox(shapeBoxData, material) {
    var s = shapeBoxData;
    var geometry = new THREE.BoxGeometry(s.dim.x, s.dim.y, s.dim.z)
    var shiftVector = new THREE.Vector3(-s.dim.x/2, -s.dim.y/2, s.dim.z/2)
    var adjShift = new THREE.Vector3(-s.off.x, -s.off.y, s.off.z)
    shiftVector.add(adjShift)
    
    geometry.vertices[0].x += s.corner4.x;
    geometry.vertices[0].y += s.corner4.y;
    geometry.vertices[0].z += s.corner4.z;
        
    geometry.vertices[1].x += s.corner1.x;
    geometry.vertices[1].y += s.corner1.y;
    geometry.vertices[1].z -= s.corner1.z;
    
    geometry.vertices[2].x += s.corner8.x;
    geometry.vertices[2].y -= s.corner8.y;
    geometry.vertices[2].z += s.corner8.z;
    
    geometry.vertices[3].x += s.corner5.x;
    geometry.vertices[3].y -= s.corner5.y;
    geometry.vertices[3].z -= s.corner5.z;
    
    geometry.vertices[4].x -= s.corner2.x;
    geometry.vertices[4].y += s.corner2.y;
    geometry.vertices[4].z -= s.corner2.z;
    
    geometry.vertices[5].x -= s.corner3.x;
    geometry.vertices[5].y += s.corner3.y;
    geometry.vertices[5].z += s.corner3.z;
    
    geometry.vertices[6].x -= s.corner6.x;
    geometry.vertices[6].y -= s.corner6.y;
    geometry.vertices[6].z -= s.corner6.z;
    
    geometry.vertices[7].x -= s.corner7.x;
    geometry.vertices[7].y -= s.corner7.y;
    geometry.vertices[7].z += s.corner7.z;
    
    geometry.translate(shiftVector.x, shiftVector.y, shiftVector.z)
    
    var shapebox = new THREE.Mesh(geometry, material);
    shapebox.position.x = -s.pos.x
    shapebox.position.y = -s.pos.y
    shapebox.position.z = s.pos.z
    line = drawEdges(geometry, shapebox)
    return [shapebox, line];
}