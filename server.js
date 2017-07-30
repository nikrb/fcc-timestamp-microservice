const express = require('express');
const bodyParser = require('body-parser');
const moment = require( 'moment');

const app = express();

console.log( `using port [${process.env.PORT}] env [${process.env.NODE_ENV}]`);
app.set('port', (process.env.PORT || 8081));


app.use('/', express.static(process.cwd() + '/public'));

app.use( bodyParser.json());

app.get( '/', (req,res) => {
  res.sendFile( process.cwd() + '/public/index.html');
});

app.get( '/:p', (req,res) => {
  console.log( "parm:", req.params);
  const p = parseInt( req.params.p);
  const ts = moment.unix( p);
  console.log( ts);
  let stamp = null;
  let str = null;
  res.send( { unix: stamp, natural: str});
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
