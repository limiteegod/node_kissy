var fs= require('fs');

//异步读取文件
fs.readFile('orderid.txt','utf-8',function(err,data){
    if(err){
        console.error(err);
    }else{
        var lineArray = data.toString("utf8").split('\n');
        for(var key in lineArray)
        {
            console.log('db.print_queen_C0002.save({ "_id" : NumberLong(' + key + '), "orderId" : "' + lineArray[key].substr(0, 32) + '", "gameCode" : "T01", "termCode" : "14108" });');
        }
        //console.log(lineArray);
    }
});
console.log("Ending ..");