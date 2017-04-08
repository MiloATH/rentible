exports.item = function(req, res) {
    res.render('item', {
        name: 'Example',
        description: 'Example description'
    });
};
