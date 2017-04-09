

exports.find = function(req, res, next) {
    var posts = db.collection('posts');
    var search = {};
    if (req.query.title) {
        search.title = req.query.title;
    }

    if (req.query.dis && req.query.log && req.query.lat) {
        var distance = +req.query.dis;
        var longitude = +req.query.log;
        var latitude = +req.query.lat;
        var milesToRadian = function(miles) {
            var earthRadiusInMiles = 3959;
            return miles / earthRadiusInMiles;
        };
        search.loc = {
            $geoWithin: {
                $centerSphere: [
                    [longitude, latitude], milesToRadian(distance)
                ]
            }
        };
    }

    posts.find(search).toArray(function(err, docs) {
        if (err) {
            console.log(err);
        }
        next(docs);
    });
};
