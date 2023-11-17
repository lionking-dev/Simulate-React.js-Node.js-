const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const port = process.env.PORT || 5000;

mongoose.connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
   useUnifiedTopology: true,
//    useCreateIndex: true,
    }) // Replace "testdb" with the actual database name
  .then(() => {
    console.log('Connected to mongodb.');
  })
  .catch((error) => {
    console.log("Not connected!");
  });

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Add this line to parse request bodies as JSON

// Order processor class
class OrderProcessor {
  constructor(id, maxProcessingTime) {
    this.id = id;
    this.orders = [];
    this.totalTime = 0;
    this.maxProcessingTime = maxProcessingTime
  }

  processOrder(order) {
    const processingTime = Math.random() * this.maxProcessingTime;
    this.orders.push(order);
    this.totalTime += processingTime;

    console.log(`Order processor ${this.id} processed order ${order.id} in ${processingTime} seconds`);
    return `Order processor ${this.id} processed order ${order.id} in ${processingTime} seconds`;
  }
}

app.post('/api/simulate', (req, res) => {
  
  const { numOrders, maxProcessingTime, numOrderProcessors } = req.body;
  const orderProcessors = [];

  let result_0 = [];
  let result_1 = [];

  for (let i = 0; i < numOrderProcessors; i++) {
    orderProcessors.push(new OrderProcessor(i + 1, maxProcessingTime));
  }

  // Create orders
  for (let i = 0; i < numOrders; i++) {
    const order = { id: i + 1 };

    const processorIndex = i % numOrderProcessors;
    const processor = orderProcessors[processorIndex];
    result_0[i] = processor.processOrder(order);
  }

  // Calculate statistics
  let i = 0;
  for (const processor of orderProcessors) {
    const avgProcessingTime = processor.totalTime / processor.orders.length;
    console.log(`Order processor ${processor.id} processed ${processor.orders.length} orders with an average processing time of ${avgProcessingTime} seconds`);
    result_1[i] = `Order processor ${processor.id} processed ${processor.orders.length} orders with an average processing time of ${avgProcessingTime} seconds`;
    i ++;
  }

  res.status(200).send({
    result_0: result_0,
    result_1: result_1
  })
});

app.use((err, req, res, next) => {
  const status = err.name && err.name === 'ValidationError' ? 400 : 500;
  res.status(status).send({ message: err.message });
});


app.listen(port, () => {
  console.log('Server listening at http://localhost:5000');
});

