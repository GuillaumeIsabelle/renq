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

// if (process.argv[0] == )
var p = require('./package.json');

console.log(`// -- RENQ Guillaume D.Isabelle Sequence Renamer,
//\tversion : ${p.version}`);
if (debug > 0)
{
    console.log("-----------ARGS>>---------------");
    console.log(args);
console.log("-----------<<ARGS---------------");

try {
    console.log(process);
    console.log(`DEBUG:: 0: ${process.args[0]}`);
    console.log(`DEBUG:: 1: ${process.args[1]}`);
    console.log(`DEBUG:: 2: ${process.args[2]}`);
    
console.log("---------------------------");
console.log("---------------------------");
} catch (error) {
    
}
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
    if (debug>0 ) console.log(args);
    var start = -1;
    var end = -1;

     try { start = args[0]? Number(args[0]) : -1;} catch (error) {}
     try {  end =args[1]? Number(args[1])  : -1; } catch (error) {}

    // if (end != -1 ) end += 1;
    var ext = defaultExt;
    var spad = 4;
    var renamer =defaultRenamer;

    try { ext = args[2]? args[2] : defaultExt;} catch (error) {}
    try {   spad = args[3]? Number(args[3]) :4; } catch (error) {}
    
    try { renamer = args[4] ? args[4] : defaultRenamer; } catch (error) { }
    
     
    
    if (debug>0) { console.log(`start:${start} - end: ${end} - ext: ${ext} - spad: ${spad} - renamer: ${renamer}`);}
    
    if (start == -1 || end == -1)
    {
console.warn("\nQUITTING, must specify a starting/ending number for the offsetted sequence.");
showHelp();
    }
    else {
        var c = 1;
        

        console.log(`start:${start} - end: ${end} - ext: ${ext} - spad: ${spad} - renamer: ${renamer}`);

        for (let i = start; i <= end ; i++) {
            
            try {
                  // console.log(pad(10, 4)); // '0010'
            var ofn = pad(i,spad) + `.${ext}`;
            var nfn = pad(c,spad) + `.${ext}`;
            
            console.log(`${renamer} ${ofn} ${nfn}`)
            
            
            c++;
            } catch (error) {
                console.warn(error);
            }
          
            
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