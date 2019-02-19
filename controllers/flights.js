var Flight = require('../models/flight');
var Ticket = require('../models/ticket');
module.exports = { 
    new: newFlight, 
    create,
    index,
    show
};

function show(req,res,next){ 
    Flight.findById(req.params.id, function(err,flight){ 
        Ticket.find({flight: flight._id}, function(err,tickets) {
            if(err){ 
                next(err);
            }
            console.log(`ticket: ${tickets}`);
            res.render('flights/show', {
                flight,tickets
            });
        }); 
    });
}

function index(req,res){ 
    Flight.find({}, function(err, flights){ 
        res.render('flights/index',{flight: 'All flights', flights});
    });
}

function create(req,res){ 
    for(let key in req.body){ 
        if(req.body[key] === '') delete req.body[key];
    }
    var flight = new Flight(req.body);
    flight.save(function(err){ 
        if(err){
        console.log(err)
        return res.render('/flights/new');
        }
        console.log(flight);
        //res.redirect('/flights');
        res.redirect(`/flights/${flight._id}`);
    });
}

function newFlight(req, res){ 
    res.render('flights/new');
}