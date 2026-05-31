import { NoteTopic } from '../professional-notes.service';

export const jsNotes: NoteTopic = {
  id: 'js',
  title: 'JavaScript Deep Dive',
  description: 'Master JavaScript from basic syntax to advanced concepts like Closures, Promises, Async/Await, and the DOM.',
  icon: 'fab fa-js-square',
  chapters: [
    {
      id: 'js-ch1',
      title: '1. JS Variables and Data Types',
      estimatedMinutes: 20,
      content: `
        <h2>JavaScript Basics</h2>
        <p>JavaScript is a high-level, interpreted, loosely typed, and multi-paradigm programming language. It is the core scripting language of the web.</p>

        <h3>Variable Declarations (var, let, const)</h3>
        <ul>
          <li><strong>var:</strong> Function-scoped. Can be redeclared and updated. Hoisted to the top of its scope and initialized with <code>undefined</code>. (Avoid using in modern JS).</li>
          <li><strong>let:</strong> Block-scoped. Can be updated but not redeclared within the same scope. Hoisted but not initialized (Temporal Dead Zone).</li>
          <li><strong>const:</strong> Block-scoped. Cannot be updated or redeclared. Must be initialized at declaration. Note: If a <code>const</code> holds an object or array, the properties/elements <em>can</em> be mutated.</li>
        </ul>

        <h3>Data Types</h3>
        <p>JavaScript has 8 Data Types (7 primitives and 1 object).</p>
        <ol>
          <li><strong>String:</strong> <code>let name = "Quenrix";</code></li>
          <li><strong>Number:</strong> Both integer and floating-point. <code>let age = 25;</code></li>
          <li><strong>BigInt:</strong> For huge numbers. <code>let big = 9007199254740991n;</code></li>
          <li><strong>Boolean:</strong> <code>true</code> or <code>false</code>.</li>
          <li><strong>Undefined:</strong> A variable that has not been assigned a value.</li>
          <li><strong>Null:</strong> Intentional absence of any object value. (typeof null returns 'object' due to a legacy bug).</li>
          <li><strong>Symbol:</strong> Unique and immutable identifier.</li>
          <li><strong>Object:</strong> Collections of properties (arrays, functions, and standard objects fall under this).</li>
        </ol>
      `
    },
    {
      id: 'js-ch2',
      title: '2. Functions & Scope',
      estimatedMinutes: 25,
      content: `
        <h2>Functions and Scope</h2>

        <h3>Function Declarations vs. Expressions</h3>
        <pre><code class="language-javascript">
// Function Declaration (Hoisted)
function add(a, b) {
  return a + b;
}

// Function Expression (Not Hoisted)
const subtract = function(a, b) {
  return a - b;
};

// Arrow Function (ES6)
const multiply = (a, b) => a * b;
        </code></pre>

        <h3>Arrow Functions vs Regular Functions</h3>
        <p>Arrow functions do not have their own <code>this</code> binding. They inherit <code>this</code> from the enclosing lexical context. They also do not have an <code>arguments</code> object.</p>

        <h3>Scope</h3>
        <ul>
          <li><strong>Global Scope:</strong> Variables declared outside any function or block. Accessible everywhere.</li>
          <li><strong>Function Scope:</strong> Variables declared inside a function (using var, let, or const) are only accessible within that function.</li>
          <li><strong>Block Scope:</strong> Introduced in ES6. Variables declared with <code>let</code> or <code>const</code> inside a block <code>{}</code> (like an if statement or for loop) are only accessible within that block.</li>
        </ul>

        <h3>Closures</h3>
        <p>A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). In other words, a closure gives you access to an outer function's scope from an inner function.</p>
        <pre><code class="language-javascript">
function makeCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const counter = makeCounter();
console.log(counter()); // 1
console.log(counter()); // 2
        </code></pre>

        <div class="note-interview-box">
          <h4>Interview Question</h4>
          <p><strong>Q: What is hoisting?</strong></p>
          <p><em>Ans:</em> Hoisting is JavaScript's default behavior of moving declarations to the top of the current scope. Variable declarations (using var) and function declarations are hoisted. However, variable initializations are not hoisted.</p>
        </div>
      `
    },
    {
      id: 'js-ch3',
      title: '3. Asynchronous JavaScript',
      estimatedMinutes: 35,
      content: `
        <h2>Asynchronous JavaScript</h2>
        <p>JavaScript is a single-threaded, non-blocking, asynchronous, concurrent programming language. It uses an Event Loop to handle async operations.</p>

        <h3>Callbacks</h3>
        <p>A function passed as an argument to another function, to be executed later. Extensive use of callbacks leads to "Callback Hell" (Pyramid of Doom).</p>

        <h3>Promises (ES6)</h3>
        <p>An object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.</p>
        <p>States: <em>Pending</em>, <em>Fulfilled</em>, <em>Rejected</em>.</p>
        <pre><code class="language-javascript">
const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    let success = true;
    if(success) resolve("Data fetched!");
    else reject("Error occurred");
  }, 1000);
});

myPromise
  .then(data => console.log(data))
  .catch(err => console.error(err));
        </code></pre>

        <h3>Async / Await (ES8)</h3>
        <p>Syntactic sugar on top of Promises, making asynchronous code look synchronous and easier to read.</p>
        <pre><code class="language-javascript">
async function fetchData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Fetch failed", error);
  }
}
fetchData();
        </code></pre>

        <div class="note-interview-box">
          <h4>Interview Question</h4>
          <p><strong>Q: Explain the Event Loop.</strong></p>
          <p><em>Ans:</em> The Event Loop continuously checks the Call Stack and the Task Queue (Callback Queue). If the Call Stack is empty, it takes the first task from the Task Queue and pushes it to the Call Stack for execution. Microtasks (like Promise callbacks) have a higher priority and are executed before Macrotasks (like setTimeout).</p>
        </div>
      `
    }
  ]
};
