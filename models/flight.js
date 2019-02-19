var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

var destinationSchema = new Schema({ 
    airport: {
        type: String, 
        enum: ['AUS', 'DAL', 'LAX', 'SEA']
    },
    arrival: {
        type: Date,
        default: function(){ 
            return new Date().getFullYear() + 1;
        }
    }
},{
 timestamps: true   
});
var flightSchema = new Schema({ 
    airline: {
        type: String,
        enum: ['American','Southwest', 'United']
    },  
    airport: {
        type: String, 
        enum: ['AUS', 'DAL', 'LAX', 'SEA']
    },  
    flightNo:{
        type: Number, 
        min: 10,
        max: 9999
    }, 
    departs:{ 
        type: Date,
        default: function(){ 
            return new Date().getFullYear() + 1;
        }
    },
    destinations: [destinationSchema]

});

module.exports = mongoose.model('Flight', flightSchema);