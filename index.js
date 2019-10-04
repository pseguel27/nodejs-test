const express       = require("express");
const bodyParser    = require('body-parser');
const app           = express();
const Sequelize     = require('sequelize');

app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );

    
    const sequelize = new Sequelize('test', 'usrtest', '123456', {
        host: 'localhost',
        dialect: 'postgres'
    });

    sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });


    const Model = Sequelize.Model;

    class User extends Model {}

    User.init({
        // attributes
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        password: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        email: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        created_on: {
            type: Sequelize.STRING
            // allowNull defaults to true
        },
        last_login: {
            type: Sequelize.STRING
            // allowNull defaults to true
        }
    },
    {
        sequelize,
        modelName: 'user'

    });

    User.findAll({ attributes: ['user_id', 'username', 'email', 'created_on'] })
        .then(users => {
            console.log(JSON.stringify(users) )
        })
        .catch(err => {
            console.log(err)
        })

    /*User.findAll()
        .then(users => {
            console.log("All users:", JSON.stringify(users, null, 4));
    });*/


/*
const client = new Client(connectionData);
client.connect();
client.query('SELECT * FROM user')
    .then(response => {
        console.log(response);
        client.end();
    })
    .catch(err => {
        client.end();
    })
*/
//async function getBlogPost(id) {


/*
pool.query('SELECT * FROM user')
    .then(response => {
        console.log(response.rows);
        pool.end();
    });
*/
/*pool.query("SELECT * FROM user", function (err, result) {
    if (err) throw err;
    console.log('fields');
    console.log(result);
});
*/

let usuario = {
    nombre          : '',
    apellido        : ''
};

let respuesta = {
    error           : false,
    codigo          : 200,
    mensaje         : ''
};

app.get('/', function(req, res) {
 
    respuesta = {
        error       : true,
        codigo      : 200,
        mensaje     : 'Punto de inicio'
    };
 
    res.send(respuesta);
});

app.get('/usuario', function (req, res) {
    respuesta = {
        error       : false,
        codigo      : 200,
        mensaje     : ''
    };

    if(usuario.nombre === '' || usuario.apellido === ''){

        respuesta = {
            error   : true,
            codigo  : 501,
            mensaje : 'El usuario no ha sido creado'
        };

    }else{
        respuesta = {
            error   : false,
            codigo  : 200,
            mensaje : 'respuesta del usuario',
            respuesta: usuario
        };
    }
    res.send(respuesta);
});

app.post('/usuario', function (req, res){
    
    if(!req.body.nombre || !req.body.apellido) {
    
        respuesta = {
            error   : true,
            codigo  : 502,
            mensaje : 'El campo nombre y apellido son requeridos'
        };
    
    }else{
  
        if(usuario.nombre !== '' || usuario.apellido !== '') {
   
            respuesta = {
                error   : true,
                codigo  : 503,
                mensaje : 'El usuario ya fue creado previamente'
            };
  
        }else{
   
            usuario = {
                nombre  : req.body.nombre,
                apellido: req.body.apellido
            };
   
            respuesta = {
                error: false,
                codigo: 200,
                mensaje: 'Usuario creado',
                respuesta: usuario
            };
        }
 }
 
 res.send(respuesta);

});


app.put('/usuario', function (req, res) {
    
    if(!req.body.nombre || !req.body.apellido) {
  
        respuesta = {
            error   : true,
            codigo  : 502,
            mensaje : 'El campo nombre y apellido son requeridos'
        };

    }else{

        if(usuario.nombre === '' || usuario.apellido === '') {
            
            respuesta = {
                error   : true,
                codigo  : 501,
                mensaje : 'El usuario no ha sido creado'
            };
  
        }else{
            usuario = {
                nombre  : req.body.nombre,
                apellido: req.body.apellido
            };

            respuesta = {
                error   : false,
                codigo  : 200,
                mensaje : 'Usuario actualizado',
                respuesta: usuario
            };
        }
    }
 
    res.send( respuesta );
});

app.delete('/usuario', function (req, res) {
    
    if(usuario.nombre === '' || usuario.apellido === '') {
    
        respuesta = {
            error   : true,
            codigo  : 501,
            mensaje : 'El usuario no ha sido creado'
        };
 
    }else{
  
        respuesta = {
            error   : false,
            codigo  : 200, 
            mensaje : 'Usuario eliminado'
        };

        usuario = { 
            nombre      : '', 
            apellido    : '' 
        };
    }
    
    res.send(respuesta);

});


app.use(function(req, res, next) {
    
    respuesta = {
        error   : true, 
        codigo  : 404, 
        mensaje : 'URL no encontrada'
    };

    res.status(404).send(respuesta);

});


app.listen(3000, () => {

    console.log("El servidor está inicializado en el puerto 3000");

});