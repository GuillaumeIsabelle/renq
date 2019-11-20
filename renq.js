#!/usr/bin/env node

//Rename a sequence of file starting from a number and bring it to 1.
//ex.   0060-0100 will became 0001-0040
//


//@STCGoal TODO Get from ENV
var defaultRenamer = "git mv";
var defaultExt = "jpg";


var debug = 0;

var pad = require('pad-number');

var args = process.argv.slice(2);

var p = require('./package.json');

console.log(`// -- RENQ Guillaume D.Isabelle Sequence Renamer,
//\tversion : ${p.version}`);
if (debug > 0)
{

    console.log(`DEBUG:: 0: ${process.args[0]}`);
    console.log(`DEBUG:: 1: ${process.args[1]}`);
    console.log(`DEBUG:: 2: ${process.args[2]}`);
}


if (args[0] == "--help" || args[0] == "--h" || args[0] == "-h" )
{
   showHelp();
}
else{
    runProgram();
}

function runProgram()
{
    
    var start = args[0]? args[0] : -1;
    var end =args[1]? args[1]  : -1; 
    // if (end != -1 ) end += 1;
    var ext = args[2]? args[2] : defaultExt;
    var spad = args[3]? args[3] :4; //padding
    var renamer =  args[4]? args[4] : defaultRenamer;
  
    
    if (start == -1 || end == -1)
    {
console.warn("\nQUITTING, must specify a starting/ending number for the offsetted sequence.");
showHelp();
    }
    else {

        var c = 1;
        for (let i =  x = start; i <= end; i++) {
            // console.log(pad(10, 4)); // '0010'
            var ofn = pad(i,spad) + `.${ext}`;
            var nfn = pad(c,spad) + `.${ext}`;
            
            console.log(`${renamer} ${ofn} ${nfn}`)
            
            
            c++;
            
        }
    }
}




function showHelp()
{
    console.log(`
    ===SYNOPSIS===
    ${process.argv.slice(0)[0]} [startNo] [endNo] [ext] ([pad] [mv cmd])
    ex.
    ${process.argv.slice(0)[0]} 60 89 jpg
    ${process.argv.slice(0)[0]} 60 89 jpg 4
    ${process.argv.slice(0)[0]} 60 89 jpg 4 "git mv"
    ${process.argv.slice(0)[0]} 60 89 jpg 4 "mv"
    

    
    `);
}