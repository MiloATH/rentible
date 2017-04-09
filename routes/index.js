exports.index = function(req, res) {

    find(req, res, function(result) {
        res.render('index', {
            title: 'Rentible',
            data: result
        });
    })
};
