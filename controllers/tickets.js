var Ticket = require('../models/ticket'); 

module.exports = { 
    new: newTicket, 
    create
}; 

function create(req, res, next){ 
    req.body.flight = req.params.id
    Ticket.create(req.body, function(err, ticket){ 
        if(err){ 
            console.log(err);
            return next(err);
        }else{ 
        res.redirect(`/flights/${req.params.id}`);
        }
    });
}

function newTicket(req,res) { 
    Ticket.find({}, function(err, tickets){ 
        res.render('tickets/new', { 
            title: 'Add Ticket', 
            tickets, flightId: req.params.id
        });
    });
}