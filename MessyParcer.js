function download(data, filename, type) {
    var file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        var a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);  
        }, 0); 
    }
}   

function pythonParse(pattern, toMatch, bShortest) {
    pattern = pattern.replace(/\\/g,"\\\\");
    pattern = pattern.replace(/\$/g, "\\$");
    pattern = pattern.replace(/\^/g, "\\^");
    pattern = pattern.replace(/\(/g, "\\(");
    pattern = pattern.replace(/\)/g, "\\)");
    pattern = pattern.replace(/\[/g, "\\[");
    pattern = pattern.replace(/\]/g, "\\]");
    pattern = pattern.replace(/\%/g, "\\%");
    pattern = pattern.replace(/\?/g, "\\?");
    pattern = pattern.replace(/\:/g, "\\:");
    pattern = pattern.replace(/\//g, "\\/");
    pattern = pattern.replace(/\*/g, "\\*");
    pattern = pattern.replace(/\./g, "\\.");
    pattern = pattern.replace(/\+/g, "\\+");
    pattern = pattern.replace(/\|/g, "\\|");

    var lazy = "";
    if(bShortest)
        lazy = "?";

    // Replace the parse pattern {} with (.*) regex pattern
    pattern = pattern.replace(/\{\}/g, "(.*" + lazy + ")");

    // Then you can use this pattern to retrieve the result
    var matches = toMatch.match(new RegExp(pattern));
    // Count results
    if(!matches)
        return "";
    if(matches.length > 2) {
     matches.shift();
        return matches;
    }
    else {
        return matches[1];
    }
}
function merge(obj, src) {
    for (var key in src) {
        if (src.hasOwnProperty(key)) obj[key] = src[key];
    }
    return obj;
}
var state;
state = "Off"
function parseToArr(file) {
    console.log("In parseToArr");
    var result = file.split('\r')

    var kwords;
    var parts;
    var exctracted = []
    // Actual stuff +--------------------------------------------------------------------------+

    kwords = ["this", "addBox", "addShapeBox", "setRotationPoint"];
    parts = {}
    for (x in kwords) {
        parts[kwords[x]] = [];
    }
    for (x in result) {
        for (y in kwords) {
            if (result[x].includes(kwords[y])) {
                parts[kwords[y]].push(result[x]);
            }
        }
    }
    for (x in parts) {
        for (y in parts[x]) {
            while (parts[x][y].includes("\t")) {
                parts[x][y] = parts[x][y].replace("\t", "");
            }

            while (parts[x][y].includes(" ")) {
                parts[x][y] = parts[x][y].replace(" ", "");
            }

            while (parts[x][y].includes("[")) {
                parts[x][y] = parts[x][y].replace('[', '(');
            }
            while (parts[x][y].includes("]")) {
                parts[x][y] = parts[x][y].replace(']', ')');
            }
        }
    }
    console.log("\/ Parts \/");
    console.log(parts)
    var exctracted;
    textured = [];
    rot = [];
    boxes = [];
    for (x in parts) {
        for (y in parts[x]) {
            if (parts[x][y].includes('this')) {
                texturef = "{}({})=newModelRendererTurbo(this,{},{},textureX,textureY);{}"

                // bodyModel(0)=new ModelRendererTurbo(this, 0, 0, textureX, textureY); // Import Box0
                exctracted = pythonParse(texturef, parts[x][y], true)
                type = exctracted[0]

                num = parseInt(exctracted[1])
                tX = parseInt(exctracted[2])
                tY = parseInt(exctracted[3])
                textured.push({"type": type, "num": num, "tX": tX ,"tY": tY})
            }
            if (parts[x][y].includes('addBox')) {
                // bodyModel(0).addBox(0F,0F,0F, 3, 3, 3, 0F); // Import Box0
                var addbox = "{}({}).addBox({}F,{}F,{}F,{},{},{},{}F);"
                exctracted = pythonParse(addbox, parts[x][y], true)
                type = exctracted[0]

                num = parseInt(exctracted[1])
                offX = parseFloat(exctracted[2])
                offY = parseFloat(exctracted[3])
                offZ = parseFloat(exctracted[4])
                dimX = parseInt(exctracted[5])
                dimY = parseInt(exctracted[6])
                dimZ = parseInt(exctracted[7])
                x0 = parseFloat(0)
                y0 = parseFloat(0)
                z0 = parseFloat(0)
                x1 = parseFloat(0)
                y1 = parseFloat(0)
                z1 = parseFloat(0)
                x2 = parseFloat(0)
                y2 = parseFloat(0)
                z2 = parseFloat(0)
                x3 = parseFloat(0)
                y3 = parseFloat(0)
                z3 = parseFloat(0)
                x4 = parseFloat(0)
                y4 = parseFloat(0)
                z4 = parseFloat(0)
                x5 = parseFloat(0)
                y5 = parseFloat(0)
                z5 = parseFloat(0)
                x6 = parseFloat(0)
                y6 = parseFloat(0)
                z6 = parseFloat(0)
                x7 = parseFloat(0)
                y7 = parseFloat(0)
                z7 = parseFloat(0)
                part1 = {"type": type, "num": num, "offX": offX, "offY": offY, "offZ": offZ, "dimX": dimX,  "dimY": dimY, "dimZ": dimZ, "z0": z0, "y0": y0, "x0": x0, "z1": z1, "y1": y1, "x1": x1, "z2": z2, "y2": y2, "x2": x2, "z3": z3, "y3": y3, "x3": x3, "z4": z4, "y4": y4, "x4": x4, "z5": z5, "y5": y5, "x5": x5, "z6": z6, "y6": y6, "x6": x6, "z7": z7, "y7": y7, "x7": x7};
                boxes.push(part1)
            }
            if (parts[x][y].includes('addShapeBox')) {
                // bodyModel(1).addShapeBox(0F,0F,0F, 3, 3, 3, 0F, 0F, 0F, -2F, 0F, 0F, 0F, 0F, 0F, 0F, 0F, 0F, 2F, 0F, 0F, -2F, 0F, 0F, 0F, 0F, 0F, 0F, 0F, 0F, 2F); // Import Box1
                var shapeBoxF = "{}({}).addShapeBox({}F,{}F,{}F,{},{},{},0F,{}F,{}F,{}F,{}F,{}F,{}F,{}F,{}F,{}F,{}F,{}F,{}F,{}F,{}F,{}F,{}F,{}F,{}F,{}F,{}F,{}F,{}F,{}F,{}F);"
                exctracted = pythonParse(shapeBoxF, parts[x][y], true)
                type = exctracted[0]
                num = parseInt(exctracted[1])
                offX = parseFloat(exctracted[2])
                offY = parseFloat(exctracted[3])
                offZ = parseFloat(exctracted[4])
                dimX = parseInt(exctracted[5])
                dimY = parseInt(exctracted[6])
                dimZ = parseInt(exctracted[7])
                x0 = parseFloat(exctracted[8])
                y0 = parseFloat(exctracted[9])
                z0 = parseFloat(exctracted[10])
                x1 = parseFloat(exctracted[11])
                y1 = parseFloat(exctracted[12])
                z1 = parseFloat(exctracted[13])
                x2 = parseFloat(exctracted[14])
                y2 = parseFloat(exctracted[15])
                z2 = parseFloat(exctracted[16])
                x3 = parseFloat(exctracted[17])
                y3 = parseFloat(exctracted[18])
                z3 = parseFloat(exctracted[19])
                x4 = parseFloat(exctracted[20])
                y4 = parseFloat(exctracted[21])
                z4 = parseFloat(exctracted[22])
                x5 = parseFloat(exctracted[23])
                y5 = parseFloat(exctracted[24])
                z5 = parseFloat(exctracted[25])
                x6 = parseFloat(exctracted[26])
                y6 = parseFloat(exctracted[27])
                z6 = parseFloat(exctracted[28])
                x7 = parseFloat(exctracted[29])
                y7 = parseFloat(exctracted[30])
                z7 = parseFloat(exctracted[31])
                part1 = {"type": type, "num": num, "offX": offX, "offY": offY, "offZ": offZ, "dimX": dimX,  "dimY": dimY, "dimZ": dimZ, "z0": z0, "y0": y0, "x0": x0, "z1": z1, "y1": y1, "x1": x1, "z2": z2, "y2": y2, "x2": x2, "z3": z3, "y3": y3, "x3": x3, "z4": z4, "y4": y4, "x4": x4, "z5": z5, "y5": y5, "x5": x5, "z6": z6, "y6": y6, "x6": x6, "z7": z7, "y7": y7, "x7": x7};
                boxes.push(part1)
            }
            if (parts[x][y].includes('setRotationPoint')) {
                // bodyModel(0).setRotationPoint(2F,2F,2F);
                rotatef = "{}({}).setRotationPoint({}F,{}F,{}F);"
                exctracted = pythonParse(rotatef, parts[x][y], true)
                type = exctracted[0]
                num = parseFloat(exctracted[1])
                posX = parseFloat(exctracted[2])
                posY = parseFloat(exctracted[3])
                posZ = parseFloat(exctracted[4])
                rot.push({"type": type, "num": num, "posX": posX ,"posY": posY,"posZ": posZ})
            }
        }
    }
    if (textured.length != boxes.length || rot.length != boxes.length) {
        console.log("Major Parsing Error! BREXIT WAS A MISTAKE!")
    }
    render = []; 

    boxes.sort(function(a, b){
        return a.num-b.num
    })
    rot.sort(function(a, b){
        return a.num-b.num
    })
    console.log("Datas")
    console.log(boxes)
    console.log(rot)
    for (var x=0; x<boxes.length; x++) {
        var currentBox = boxes[x]
        var counts = 0
        for (var i=0; i<rot.length; i++) {
            var currentRotation = rot[i]
            if (currentBox.num == currentRotation.num && currentBox.type == currentRotation.type) {
                for (var item in currentRotation) {
                    boxes[x][item] = currentRotation[item]
                    counts++
                }
            }

        }
        if (counts == 0) {
            console.log("No matches found")
        }
    }
    return boxes
}
var mainData
function main(evt) {
    var contents
    // Fuction decs
    var file = document.getElementById("file").files[0];
    console.log(file);
    if (file) {
        alert("Name: " + file.name + "\n" + "Last Modified Date :" + file.lastModifiedDate);
        var reader = new FileReader();
        reader.readAsText(file);
        reader.onload = (function(file) {
            console.log("");
            var renderDat = parseToArr(file.currentTarget.result);
            console.log("Definitive result")
            console.log(renderDat)
            var resultant = []
            for (var i = 0; i<renderDat.length;i++) {
                fishcake = {};
                fishcake.dim = new THREE.Vector3(renderDat[i].dimX, renderDat[i].dimY, renderDat[i].dimZ)
                fishcake.num = renderDat[i].num;
                fishcake.off = new THREE.Vector3(renderDat[i].offX, renderDat[i].offY, renderDat[i].offZ)
                fishcake.pos = new THREE.Vector3(renderDat[i].posX, renderDat[i].posY, renderDat[i].posZ)
                fishcake.type = renderDat[i].type;
                try {    
                    fishcake.corner1 = new THREE.Vector3(renderDat[i].x0, renderDat[i].y0, renderDat[i].z0)
                    fishcake.corner2 = new THREE.Vector3(renderDat[i].x1, renderDat[i].y1, renderDat[i].z1)
                    fishcake.corner3 = new THREE.Vector3(renderDat[i].x2, renderDat[i].y2, renderDat[i].z2)
                    fishcake.corner4 = new THREE.Vector3(renderDat[i].x3, renderDat[i].y3, renderDat[i].z3)
                    fishcake.corner5 = new THREE.Vector3(renderDat[i].x4, renderDat[i].y4, renderDat[i].z4)
                    fishcake.corner6 = new THREE.Vector3(renderDat[i].x5, renderDat[i].y5, renderDat[i].z5)
                    fishcake.corner7 = new THREE.Vector3(renderDat[i].x6, renderDat[i].y6, renderDat[i].z6)
                    fishcake.corner8 = new THREE.Vector3(renderDat[i].x7, renderDat[i].y7, renderDat[i].z7)
                    resultant.push(fishcake)
                } catch(ReferenceError) {
                    fishcake.corner1 = new THREE.Vector3(0, 0, 0)
                    fishcake.corner2 = new THREE.Vector3(0, 0, 0)
                    fishcake.corner3 = new THREE.Vector3(0, 0, 0)
                    fishcake.corner4 = new THREE.Vector3(0, 0, 0)
                    fishcake.corner5 = new THREE.Vector3(0, 0, 0)
                    fishcake.corner6 = new THREE.Vector3(0, 0, 0)
                    fishcake.corner7 = new THREE.Vector3(0, 0, 0)
                    fishcake.corner8 = new THREE.Vector3(0, 0, 0)
                    resultant.push(fishcake)
                }
            }
            enableRender(resultant)
        })
     }
}
