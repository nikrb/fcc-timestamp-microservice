'use strict';
const express = require('express');
const moment = require( 'moment');

const app = express();

 app.set('port', (process.env.PORT));

app.use('/', express.static(process.cwd() + '/public'));

app.get( '/', (req,res) => {
  res.sendFile( process.cwd() + '/views/index.html');
});

app.get( '/:p', (req,res) => {
  let stamp = null;
  let natural = null;
  const ts = moment.unix( req.params.p);
  if( ts.isValid()){
    stamp = req.params.p;
    natural = ts.format( "MMMM D, YYYY");
  } else {
    const nd = moment( req.params.p, "MMMM D, YYYY");
    if( nd.isValid()){
      stamp = nd.unix();
      natural = nd.format( "MMMM D, YYYY");
    }
  }
  res.send( { unix: stamp, natural: natural});
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
