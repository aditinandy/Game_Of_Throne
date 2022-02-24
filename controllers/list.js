const List = require('../models/list');

exports.gettotalList = (req, res, next) => {
    List.find().then(list => {
        if(list) {
            x = []
            list.forEach(lis =>{
                x.push(lis)
            })
            // console.log(x)
            res.render('home.ejs', {
                data: x,
                pageTitle: "user Profile",
                path: '/'
            });
            return res.json({isSuccess: true, msg: 'returns a list(array) of all the places where the battle has taken place.', list: x});
        } else if ( !list ) {
            return res.json({isSuccess: false, msg: 'something went wrong..'});
        }
    })

}

exports.getList = (req, res, next) => {
    List.find().then(list => {
        if(list) {
            x = []
            list.forEach(lis =>{
                x.push(lis.location)
            })
            console.log(x)
            res.render('list.ejs', {
                data1: x,
                pageTitle: "user Profile",
                path: '/list'
            });
            return res.json({isSuccess: true, msg: 'returns a list(array) of all the places where the battle has taken place.', list: x});
        } else if ( !list ) {
            return res.json({isSuccess: false, msg: 'something went wrong..'});
        }
    })
}

exports.getCount = (req, res, next) => {
    x = new Set()
    List.find().then(list => {
        if(list) {
            // x.add(list)
            // console.log(x)
            list.forEach(lis =>{
                x.add(lis.battle_type)
            })
            console.log(x);
            // Set to Array
            y = Array.from(x);
            len = y.length;
            res.render('count.ejs', {
                count: len,
                list: y,
                pageTitle: "user Profile",
                path: '/count'
            });
            return res.json({isSuccess: true, msg: ' returns the total number of battles that occurred.', length: len, list: y});
        } else if ( !list ) {
            return res.json({isSuccess: false, msg: 'something went wrong..'});
        }
    })
}

exports.getSearch = (req, res, next) => {
    try {  
        List.find({$or:[{attacker_king:{'$regex':req.query.dsearch}},
        {defender_king:{'$regex':req.query.dsearch}}
        ,{name:{'$regex':req.query.dsearch}}
        ,{year:{'$regex':req.query.dsearch}}
        ,{battle_number:{'$regex':req.query.dsearch}}
        ,{battle_type:{'$regex':req.query.dsearch}}
        ,{location:{'$regex':req.query.dsearch}} ]},(err,data)=>{  
        if(err){  
        console.log(err);  
        }else{  
        res.render('home.ejs',{data:data});
        }  
        })  
        } catch (error) {  
        console.log(error);  
        } 
} 

exports.getSearchKing = (req, res, next) => {
    const king = req.query.king;
    const location = req.query.location;
    const battle_type = req.query.battle_type;
    var noMatch = null;
    const filters = req.query;
    // console.log(Object.entries(req.query).length == 0)
    if (Object.entries(req.query).length == 0){
        List.find().then(list => {
            if(list) {
                x = []
                list.forEach(lis =>{
                    x.push(lis.battle_type)
                })
                console.log(x)
                return res.json({isSuccess: true, msg: 'return the list of battles.', list: x});
            } else if ( !exist_user ) {
                return res.json({isSuccess: false, msg: 'something went wrong..'});
            }
        })
    }
    else if (req.query.king) {
        List.find({ $or: [{attacker_king: king}, {defender_king: king}] }).then(lis => {
            const filteredUsers = lis.filter(list => {
                let isValid = true;
                for (key in filters) {
                    isValid = isValid && list[key] == filters[key];
                }
                return isValid;
            // return res.send(list);
            });
            // return res.send(filteredUsers);
            return res.send(lis);
        })
        
    } 
    else if (Object.entries(req.query).length > 1) {
        List.find({}).then(lis => {
            // console.log(lis)
            const filteredUsers = lis.filter(list => {
                // console.log(list)
                let isValid = true;
                for (key in filters) {
                isValid = isValid && list[key] == filters[key];
                // console.log(list[key], filters[key])
                }
                return isValid;
            });
            return res.send(filteredUsers);
        })
    }
    else {
        List.find().then(list => {
            if(list) {
                x = []
                list.forEach(lis =>{
                    x.push(lis.battle_type)
                })
                console.log(x)
                return res.json({isSuccess: true, msg: 'return the list of battles.', list: x});
            } else if ( !exist_user ) {
                return res.json({isSuccess: false, msg: 'something went wrong..'});
            }
        })
    }
    
    
//     const filters = req.query;
//   const filteredUsers = data.filter(user => {
//     let isValid = true;
//     for (key in filters) {
//       console.log(key, user[key], filters[key]);
//       isValid = isValid && user[key] == filters[key];
//     }
//     return isValid;
//   });
//   res.send(filteredUsers);
    // console.log(typeof(king))
    // console.log(typeof(location))
    // console.log(typeof(battle_type))
    // console.log(!battle_type)
    //     if (!req.query.king && !req.query.battle_type && !req.query.location) {
    //         List.find().then(list => {
    //             if(list) {
    //                 x = []
    //                 list.forEach(lis =>{
    //                     x.push(lis.location)
    //                 })
    //                 return res.json({isSuccess: true, msg: 'return the list of battles.', list: x});
    //             } else if ( !exist_user ) {
    //                 return res.json({isSuccess: false, msg: 'something went wrong..'});
    //             }
    //         })
    //     }
    //     else if((king == req.query.king && !battle_type && !location)) {
    //         const regex = new RegExp(escapeRegex(req.query.king), 'gi');
    //         List.find({ $or: [{attacker_king: regex}, {defender_king: regex}] }, function(err, king){
    //            if(err){
    //                console.log(err);
    //            } else {
    //               if(king.length < 1) {
    //                   noMatch = "No king match that query, please try again.";
    //               }
    //               res.json({isSuccess: true, msg: `search by ${req.query.king}`, Match: king});
    //            }
    //         });
    //     } 
    //     else if (req.query.king || req.query.location || req.query.battle_type) {
    //         const regex1 = new RegExp(escapeRegex(req.query.king), 'gi');
    //         const regex2 = new RegExp(escapeRegex(req.query.location), 'gi');
    //         const regex3 = new RegExp(escapeRegex(req.query.battle_type), 'gi');
    //         List.find({ $and: [{location: regex2}, {battle_type: regex3}, {$or: [{attacker_king: regex1}, {defender_king: regex1}]}] }, function(err, king){
    //             if(err){
    //                 console.log(err);
    //             } else {
    //                 if(king.length < 1) {
    //                     noMatch = "No king match that query, please try again.";
    //                 }
    //                 res.json({isSuccess: true, msg: `search by ${req.query.king}, ${req.query.location}, ${req.query.battle_type}`, Match: king});
    //             }
    //         });
    // }
      
    //    else {
    //         List.find({}, function(err, king){
    //             if(err){
    //                 console.log(err);
    //             } else {
    //             if(king.length < 1) {
    //                 noMatch = "No king match that query, please try again.";
    //             }
    //             res.json({isSuccess: true, msg: "All Kings", Match: king});
    //             }
    //         });
    //   }
    }
  
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};