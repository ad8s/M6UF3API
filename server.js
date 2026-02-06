require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3022;
// Middleware per parsejar el cos de les sol·licituds a JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Connecta't a MongoDB (modifica l'URI amb la teva pròpia cadena de connexió)

const uri = process.env.MONGO_URI;
console.log("URI: ", uri);

//const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true },  useNewUrlParser: true, useUnifiedTopology: true };
const clientOptions = { };

mongoose.connect(uri, clientOptions)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Definició del model de dades (un exemple simple d'un model de "Usuari")
const entradesSchema = new mongoose.Schema({ 
  nomAlumne: {
    type: String,
    required: true
  },
  cognom1: {
    type: String,
    required: true
  },
  cognom2: {
    type: String
  },
  dataEntradaTasca: {
    type: String,
    required: true
  },
  completa: {
    type: Boolean,
    required: true
  },
  observacions: {
    type: String
  }
}, {
  versionKey: false 
} );

const Entrades = mongoose.model('Entrades', entradesSchema, 'Entrades');


/******************************************************** */
/******************************************************** */
/******************************************************** */
/******************************************************** */
/******************************************************** */
/**
 * END POINTS
 */

// Ruta a l'arrel
app.get('/', (req, res) => {
  res.send('Your API is running!');
});

// Ruta per obtenir entrades entre dates
app.get('/list/:dataini/:datafi', async (req, res) => {
    try {
      const { dataini, datafi } = req.params;
      console.log("ENTRE DATES: ",dataini, datafi);
      const entrades = await Entrades.find({
        dataEntradaTasca: { $gte: dataini, $lte: datafi }
      });
  
      if (entrades.length === 0) {
        return res.status(404).json({ message: 'No entrada found in this date range' });
      }
  
      res.status(200).json(entrades);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching entrades', error: err.message });
    }
});

// Ruta per obtenir tots els usuaris
app.get('/list', async (req, res) => {
  try {
    const entrades = await Entrades.find( );
    res.status(200).json(entrades);
    console.log("working");
  } catch (err) {
    res.status(500).json({ message: 'Error fetching entrades', error: err.message });
  }
});

app.post('/add', async (req, res) => {
  try {
    const newEntrada = new Entrades(req.body);
    const savedEntrada = await newEntrada.save();
    res.status(201).json(savedEntrada);
    console.log("Added!");
  } catch (err) {
    res.status(500).json({ message: 'Error adding entrada', error: err.message });
  }
});

/******************************************************** */
/******************************************************** */
/******************************************************** */
/******************************************************** */
/******************************************************** */
// changed
// Inicia el servidor
app.listen(port,  '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${port}`);
});
