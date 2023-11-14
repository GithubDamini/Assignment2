/*import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import Template from './../template.js';
// Import the product routes
import productRoutes from './product.routes.js';

const app = express();

// Parse body params and attach them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// Compress response bodies for all request
app.use(compress());

// Secure apps by setting various HTTP headers
app.use(helmet());

// Enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Mount product routes at the /api/products path
app.use('/api/products', productRoutes);

// Serving a template for the root route
app.get('/', (req, res) => {
  res.status(200).send(Template());
});

// Remove the userRoutes since we're focusing on products
// If you still need user routes, you can add them as well
// app.use('/api/users', userRoutes);

export default app;
*/

import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
import productRoutes from './routes/product.routes.js'
 
import path from 'path'

const app = express()
const CURRENT_WORKING_DIR = process.cwd()



app.get('/', (req, res) => {
res.status(200).send(Template()) 
})

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', productRoutes)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors())
export default app