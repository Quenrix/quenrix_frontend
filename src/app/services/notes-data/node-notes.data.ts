import { NoteTopic } from '../professional-notes.service';

export const nodeNotes: NoteTopic = {
  id: 'node',
  title: 'Node.js & Express Topper Notes',
  description: 'Deep dive into Node.js, Event Loop, Express middleware, REST APIs, and Authentication.',
  icon: 'fab fa-node-js',
  chapters: [
    {
      id: 'node-ch1',
      title: '1. Introduction to Node.js & V8',
      estimatedMinutes: 15,
      content: `
        <h2>What is Node.js?</h2>
        <p>Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside of a web browser.</p>
        <p>It is built on Chrome's V8 JavaScript engine. This engine compiles JavaScript directly into native machine code, making it incredibly fast.</p>
        
        <h3>Key Characteristics</h3>
        <ul>
          <li><strong>Asynchronous and Event-Driven:</strong> All APIs of Node.js library are asynchronous, that is, non-blocking.</li>
          <li><strong>Single-Threaded but Highly Scalable:</strong> Node.js uses a single-threaded model with event looping.</li>
          <li><strong>No Buffering:</strong> Node.js applications never buffer any data; they simply output the data in chunks.</li>
        </ul>
      `
    },
    {
      id: 'node-ch2',
      title: '2. Express.js Fundamentals',
      estimatedMinutes: 20,
      content: `
        <h2>Express.js</h2>
        <p>Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.</p>
        
        <h3>Basic Routing</h3>
        <pre><code class="language-javascript">
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
        </code></pre>
        
        <h3>Middleware</h3>
        <p>Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application's request-response cycle.</p>
      `
    }
  ]
};
