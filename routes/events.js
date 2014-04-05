var userdata = [
    {
        "id": 0,
        "username": "Willis",
        "email": "gutierrezfleming@quilm.com",
        "events": [
            {
                "id": 0,
                "name": "tempor"
            }
        ]
    },
    {
        "id": 1,
        "username": "Tonia",
        "email": "martinezmalone@neocent.com",
        "events": [
            {
                "id": 0,
                "name": "ut"
            }
        ]
    },
    {
        "id": 2,
        "username": "Louise",
        "email": "sosafinch@exosis.com",
        "events": [
            {
                "id": 0,
                "name": "enim"
            }
        ]
    },
    {
        "id": 3,
        "username": "Anderson",
        "email": "taylormueller@pulze.com",
        "events": [
            {
                "id": 0,
                "name": "qui"
            }
        ]
    },
    {
        "id": 4,
        "username": "Christie",
        "email": "palmercopeland@intergeek.com",
        "events": [
            {
                "id": 0,
                "name": "aliqua"
            }
        ]
    }
]

exports.findAll = function(req, res) {
	res.render('events', {
                        title: "Events",
                        userdata: userdata,
                        });

};

exports.findById = function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
};
