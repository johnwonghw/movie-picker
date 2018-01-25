import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';
import webpackHotMiddleware from 'webpack-hot-middleware';
import bodyParser from 'body-parser';

import request from 'request';


let app = express();

app.use(bodyParser.json())

const compiler = webpack(webpackConfig)

app.use(webpackMiddleware(compiler, {
  hot: true,
  publicPath: webpackConfig.output.publicPath,
  noInfo: true
}));
app.use(webpackHotMiddleware(compiler));



app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'))
});

app.post('/filter', (req, res) => {

  var options = { method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/movie',
  qs: 
   { with_genres: req.body.genre,
     page: '1',
     include_video: 'false',
     include_adult: 'false',
     language: 'en-US',
     api_key: 'e4e82c1a96616751394b36fcb138e94a' },
  body: '{}' };
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
    res.send(JSON.stringify(body))
  })

})

app.listen(3000, () => console.log('running host on local:3000'));

