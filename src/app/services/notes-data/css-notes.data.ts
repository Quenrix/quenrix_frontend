import { NoteTopic } from '../professional-notes.service';

export const cssNotes: NoteTopic = {
  id: 'css',
  title: 'CSS Masterclass',
  description: 'Deep dive into CSS3, modern layouts (Flexbox/Grid), responsive design, and animations.',
  icon: 'fab fa-css3-alt',
  chapters: [
    {
      id: 'css-ch1',
      title: '1. CSS Fundamentals & Selectors',
      estimatedMinutes: 20,
      content: `
        <h2>CSS Fundamentals</h2>
        <p><strong>CSS (Cascading Style Sheets)</strong> describes how HTML elements should be displayed on screen, paper, or in other media.</p>

        <h3>How to add CSS</h3>
        <ol>
          <li><strong>Inline:</strong> using the <code>style</code> attribute inside HTML elements (Bad practice).</li>
          <li><strong>Internal:</strong> using a <code>&lt;style&gt;</code> element in the <code>&lt;head&gt;</code> section.</li>
          <li><strong>External:</strong> using a <code>&lt;link&gt;</code> element to link to an external CSS file (Best practice).</li>
        </ol>

        <h3>Basic Selectors</h3>
        <ul>
          <li><strong>Universal Selector (<code>*</code>):</strong> Selects all elements.</li>
          <li><strong>Element/Type Selector (<code>p</code>):</strong> Selects all elements of a specific type.</li>
          <li><strong>Class Selector (<code>.btn</code>):</strong> Selects elements with a specific class attribute.</li>
          <li><strong>ID Selector (<code>#header</code>):</strong> Selects a single unique element with a specific ID.</li>
        </ul>

        <h3>Combinators</h3>
        <table class="notes-table">
          <thead><tr><th>Selector</th><th>Name</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>div p</code></td><td>Descendant</td><td>Selects all &lt;p&gt; elements inside &lt;div&gt; elements.</td></tr>
            <tr><td><code>div &gt; p</code></td><td>Child</td><td>Selects all &lt;p&gt; elements that are direct children of a &lt;div&gt;.</td></tr>
            <tr><td><code>div + p</code></td><td>Adjacent Sibling</td><td>Selects the &lt;p&gt; directly after a &lt;div&gt;.</td></tr>
            <tr><td><code>div ~ p</code></td><td>General Sibling</td><td>Selects every &lt;p&gt; that comes after a &lt;div&gt; on the same level.</td></tr>
          </tbody>
        </table>

        <div class="note-interview-box">
          <h4>Interview Question</h4>
          <p><strong>Q: What is CSS Specificity?</strong></p>
          <p><em>Ans:</em> Specificity determines which CSS rule applies if multiple rules target the same element. The hierarchy is: Inline styles (highest) > IDs > Classes/Attributes/Pseudo-classes > Elements/Pseudo-elements (lowest). You can calculate it using a 4-number value (inline, id, class, element).</p>
        </div>
      `
    },
    {
      id: 'css-ch2',
      title: '2. The Box Model',
      estimatedMinutes: 25,
      content: `
        <h2>The CSS Box Model</h2>
        <p>All HTML elements can be considered as boxes. In CSS, the term "box model" is used when talking about design and layout.</p>

        <h3>Components of the Box Model</h3>
        <ul>
          <li><strong>Content:</strong> The actual content of the box, where text and images appear. Controlled by <code>width</code> and <code>height</code>.</li>
          <li><strong>Padding:</strong> Clears an area around the content. The padding is transparent and sits <em>inside</em> the border.</li>
          <li><strong>Border:</strong> A border that goes around the padding and content.</li>
          <li><strong>Margin:</strong> Clears an area outside the border. The margin is transparent and pushes other elements away.</li>
        </ul>

        <h3>box-sizing: border-box</h3>
        <p>By default (<code>box-sizing: content-box</code>), adding padding or borders increases the total size of the element beyond the specified width/height. This makes layouts difficult.</p>
        <p>Setting <code>box-sizing: border-box;</code> forces the padding and borders to be included <em>within</em> the element's specified width and height.</p>
        <pre><code class="language-css">
/* A common CSS reset */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
        </code></pre>

        <div class="note-interview-box">
          <h4>Interview Question</h4>
          <p><strong>Q: What is margin collapsing?</strong></p>
          <p><em>Ans:</em> Margin collapsing occurs when the vertical margins of two adjacent block-level elements touch. Instead of adding the margins together (e.g., bottom margin of 20px + top margin of 30px = 50px), the margins "collapse" into a single margin equal to the largest of the two values (30px).</p>
        </div>
      `
    },
    {
      id: 'css-ch3',
      title: '3. Flexbox Layout',
      estimatedMinutes: 30,
      content: `
        <h2>Flexbox (Flexible Box Layout)</h2>
        <p>Flexbox is a one-dimensional layout model used to align and distribute space among items in a container, even when their size is unknown or dynamic.</p>

        <h3>Flex Container Properties</h3>
        <ul>
          <li><code>display: flex;</code>: Establishes a flex context.</li>
          <li><code>flex-direction:</code> Defines the main axis (<code>row</code>, <code>column</code>, <code>row-reverse</code>, <code>column-reverse</code>).</li>
          <li><code>justify-content:</code> Aligns items along the <strong>main axis</strong> (<code>flex-start</code>, <code>center</code>, <code>space-between</code>, <code>space-around</code>, <code>space-evenly</code>).</li>
          <li><code>align-items:</code> Aligns items along the <strong>cross axis</strong> (<code>stretch</code>, <code>center</code>, <code>flex-start</code>, <code>flex-end</code>).</li>
          <li><code>flex-wrap:</code> Allows items to wrap onto multiple lines (<code>nowrap</code>, <code>wrap</code>, <code>wrap-reverse</code>).</li>
          <li><code>gap:</code> Controls the space between flex items.</li>
        </ul>

        <h3>Flex Item Properties</h3>
        <ul>
          <li><code>flex-grow:</code> Determines how much the item will grow relative to the rest of the flex items (default is 0).</li>
          <li><code>flex-shrink:</code> Determines how much the item will shrink (default is 1).</li>
          <li><code>flex-basis:</code> The default size of an element before the remaining space is distributed.</li>
          <li><code>flex:</code> A shorthand for grow, shrink, and basis (e.g., <code>flex: 1 1 auto;</code>).</li>
          <li><code>align-self:</code> Overrides the container's <code>align-items</code> property for a specific item.</li>
        </ul>

        <div class="note-tip-box">
          <h4>Quick Centering Trick</h4>
          <pre><code class="language-css">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
          </code></pre>
        </div>
      `
    },
    {
      id: 'css-ch4',
      title: '4. CSS Grid Layout',
      estimatedMinutes: 30,
      content: `
        <h2>CSS Grid Layout</h2>
        <p>CSS Grid is the most powerful layout system in CSS. It is a two-dimensional system, meaning it can handle both columns and rows, unlike flexbox which is largely a one-dimensional system.</p>

        <h3>Defining a Grid</h3>
        <pre><code class="language-css">
.grid-container {
  display: grid;
  grid-template-columns: 200px 1fr 1fr; /* 3 columns */
  grid-template-rows: auto 100px; /* 2 rows */
  gap: 15px; /* Spacing between rows and columns */
}
        </code></pre>

        <h3>Fractional Units (fr)</h3>
        <p>The <code>fr</code> unit represents a fraction of the available space in the grid container. <code>grid-template-columns: 1fr 2fr;</code> creates two columns, where the second is twice as wide as the first.</p>

        <h3>The repeat() Function</h3>
        <p>Used to generate repetitive patterns. <code>grid-template-columns: repeat(4, 1fr);</code> creates four equal-width columns.</p>

        <h3>Auto-fit and Auto-fill (Responsive Magic)</h3>
        <p>These keywords, combined with <code>minmax()</code>, create incredibly powerful responsive layouts without media queries.</p>
        <pre><code class="language-css">
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
        </code></pre>

        <h3>Placing Grid Items</h3>
        <p>You can explicitly place items using line numbers or named grid areas.</p>
        <pre><code class="language-css">
.header { grid-column: 1 / span 3; }
.sidebar { grid-column: 1 / 2; grid-row: 2 / 4; }
        </code></pre>
      `
    },
    {
      id: 'css-ch5',
      title: '5. Positioning & Z-Index',
      estimatedMinutes: 20,
      content: `
        <h2>Positioning Elements</h2>
        <p>The <code>position</code> property specifies the type of positioning method used for an element.</p>

        <ul>
          <li><strong>static:</strong> The default. Elements render in order, as they appear in the document flow. Top, bottom, left, right do not affect it.</li>
          <li><strong>relative:</strong> The element is positioned relative to its normal position. Setting <code>top: 20px</code> will move it 20px down from where it <em>would normally</em> be. It does not remove the element from the document flow; the space it originally occupied is preserved.</li>
          <li><strong>absolute:</strong> The element is removed from the normal document flow. It is positioned relative to its closest <em>positioned</em> ancestor (an ancestor with a position other than static). If no positioned ancestor exists, it uses the document body.</li>
          <li><strong>fixed:</strong> Removed from the normal flow. Positioned relative to the viewport (the browser window). It will not move when the page is scrolled (useful for sticky navbars).</li>
          <li><strong>sticky:</strong> Toggles between relative and fixed, depending on the scroll position. It behaves like <code>relative</code> until a given offset threshold is met in the viewport, then it acts like <code>fixed</code>.</li>
        </ul>

        <h3>Z-Index</h3>
        <p>The <code>z-index</code> property specifies the stack order of an element. An element with greater stack order is always in front of an element with a lower stack order.</p>
        <p><strong>Crucial Rule:</strong> <code>z-index</code> only works on <em>positioned</em> elements (position: relative, absolute, fixed, or sticky), or flex/grid items.</p>
      `
    }
  ]
};
