import { NoteTopic } from '../professional-notes.service';

export const reactNotes: NoteTopic = {
  id: 'react',
  title: 'React.js Topper Notes',
  description: 'Master React.js with Hooks, Context API, Redux Toolkit, and performance optimizations.',
  icon: 'fab fa-react',
  chapters: [
    {
      id: 'react-ch1',
      title: '1. React Basics & Components',
      estimatedMinutes: 20,
      content: `
        <h2>What is React?</h2>
        <p>React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".</p>
        
        <h3>Functional vs Class Components</h3>
        <p>Historically, class components were used for state and lifecycle methods. Today, Functional Components with Hooks are the standard.</p>
        <pre><code class="language-javascript">
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    &lt;div&gt;
      &lt;p&gt;You clicked {count} times&lt;/p&gt;
      &lt;button onClick={() => setCount(count + 1)}&gt;
        Click me
      &lt;/button&gt;
    &lt;/div&gt;
  );
}
export default Counter;
        </code></pre>
      `
    }
  ]
};
