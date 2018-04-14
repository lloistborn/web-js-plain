document.addEventListener("DOMContentLoaded", theDomHasLoaded, false);
 
var timer ;

function theDomHasLoaded(e) {
    var buttonStart = document.getElementById('start');
    var buttonStop = document.getElementById('stop');
    var buttonSort = document.getElementById('sort');

    buttonStart.onclick = function(e) {     
        e.stopImmediatePropagation();
        buttonStart.disabled = true;

        timer = setInterval(randomData, 1000);

        function randomData() {
            var shuffledData = shuffle(TABLE_DATA);   
            loadData(shuffledData);
        }
    };

    buttonStop.onclick = function(e) {
        buttonStart.disabled = false;
        clearInterval(timer);        
    };

    buttonSort.onclick = function() {
        var sortedData = TABLE_DATA.sortAscBy("id");
        var sortedData = sortedData.sortDescBy("price");        
        loadData(sortedData);
    };
}

function loadData(data) {
    var tableRef = document.getElementsByClassName("table")[0].getElementsByTagName('tbody')[0];

    while(tableRef.hasChildNodes())
    {
        tableRef.removeChild(tableRef.firstChild);
    }
    const lengthCells = 4;
    const lengthData = TABLE_DATA.length;

    for (var i = 0; i < lengthData; i++) {
        var newRow   = tableRef.insertRow(tableRef.rows.length);
        var cellId  = newRow.insertCell(0);
        var cellImage = newRow.insertCell(1);
        var cellName  = newRow.insertCell(2);
        var cellPrice  = newRow.insertCell(3);        

        var DOM_img = document.createElement("img");
        DOM_img.src = data[i].thumbnailUrl;

        var id  = document.createTextNode(data[i].id);
        // var image  = document.createTextNode(DOM_img);
        var name  = document.createTextNode(data[i].name);
        var price  = document.createTextNode(data[i].price);

        cellId.appendChild(id);
        cellImage.appendChild(DOM_img);
        cellName.appendChild(name);
        cellPrice.appendChild(price);
    }
}

Array.prototype.sortAscBy = function(p) {
    return this.slice(0).sort(function(a, b) {
        var x = parseInt(a[p]);
        var y = parseInt(b[p]);

        if (x > y) {
            return 1;
        } else if(x < y) {
            return -1
        } else {
            return 0;
        }
        
    });
}
Array.prototype.sortDescBy = function(p) {
    return this.slice(0).sort(function(a, b) {
        var x = parseInt(a[p]);
        var y = parseInt(b[p]);

        if (x > y) {
            return -1;
        } else if(x < y) {
            return 1
        } else {
            return 0;
        }
        
    });
}

function shuffle(array) {
    var counter = array.length;

    while (counter > 0) {
        var index = Math.floor(Math.random() * counter);

        counter--;

        var temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}