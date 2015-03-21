// This web worker performs some computations
// and returns the result


for (var j = 0; j <10; j++){
var sum = 0;
for (var i = 0; i < 45000000; i++) {
    sum += Math.pow(i, 5)
   
    }
     postMessage(sum *j);
}
	
