import { NoteTopic } from '../professional-notes.service';

export const htmlNotes: NoteTopic = {
  id: 'html',
  title: 'HTML Complete Guide',
  description: 'Master HTML5 from basics to advanced, including Semantics, Forms, Multimedia, and Accessibility. Includes 100+ interview questions and detailed theory.',
  icon: 'fab fa-html5',
  chapters: [
    {
      id: 'html-ch1',
      title: '1. Introduction to HTML',
      estimatedMinutes: 15,
      content: `
        <h2>Introduction to HTML</h2>
        <p><strong>HTML (HyperText Markup Language)</strong> is the standard language used to create and structure web pages. It is the backbone of every website on the internet.</p>
        
        <h3>1. What is HTML?</h3>
        <ul>
          <li><strong>HyperText:</strong> Refers to the hyperlinks that an HTML page may contain. It allows users to navigate between web pages.</li>
          <li><strong>Markup Language:</strong> Refers to the tags used to define the page layout and the elements within the page.</li>
        </ul>
        <p>HTML is <em>not</em> a programming language. It does not contain logic (like variables, loops, or conditionals). Instead, it is a declarative language used to describe the structure of content.</p>

        <h3>2. Brief History</h3>
        <p>HTML was invented by Tim Berners-Lee in 1991. The language has evolved through several versions:</p>
        <ul>
          <li><strong>HTML 1.0 (1993):</strong> The first official release.</li>
          <li><strong>HTML 2.0 (1995):</strong> Introduced standard core features.</li>
          <li><strong>HTML 3.2 (1997):</strong> Added support for tables, applets, and complex text flow around images.</li>
          <li><strong>HTML 4.01 (1999):</strong> Became a highly stable standard used for years.</li>
          <li><strong>HTML5 (2014):</strong> The current major version, introducing semantic tags, native multimedia (audio/video), and APIs (Canvas, Geolocation).</li>
        </ul>

        <h3>3. Real-World Analogy</h3>
        <p>Think of building a house. HTML is the foundation, walls, and structural frame. CSS is the interior design, paint, and aesthetics. JavaScript is the electricity, plumbing, and moving parts (doors, elevators).</p>

        <div class="note-interview-box">
          <h4>Interview Question</h4>
          <p><strong>Q: Is HTML a programming language? Why or why not?</strong></p>
          <p><em>Ans:</em> No, HTML is a markup language. It lacks programming logic like loops, conditional statements, and variables. It is solely used to structure and format content on a web page.</p>
        </div>
      `
    },
    {
      id: 'html-ch2',
      title: '2. HTML Document Structure',
      estimatedMinutes: 20,
      content: `
        <h2>HTML Document Structure</h2>
        <p>Every HTML document must follow a standard boilerplate structure to be parsed correctly by web browsers.</p>

        <h3>The Boilerplate</h3>
        <pre><code class="language-html">
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
    &lt;title&gt;My First HTML Page&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
    &lt;h1&gt;Welcome to HTML!&lt;/h1&gt;
    &lt;p&gt;This is a basic paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
        </code></pre>

        <h3>Explanation of Elements</h3>
        <ul>
          <li><code>&lt;!DOCTYPE html&gt;</code>: Document Type Declaration. It tells the browser that this is an HTML5 document. It is not an HTML tag, but an instruction to the browser.</li>
          <li><code>&lt;html&gt;</code>: The root element of an HTML page. The <code>lang="en"</code> attribute declares the primary language of the document, which helps screen readers and search engines.</li>
          <li><code>&lt;head&gt;</code>: Contains meta-information about the document (character set, viewport, title, linked CSS/JS). Content inside the head is <em>not visible</em> on the page.</li>
          <li><code>&lt;meta charset="UTF-8"&gt;</code>: Specifies the character encoding. UTF-8 covers almost all characters and symbols in the world.</li>
          <li><code>&lt;meta name="viewport" ...&gt;</code>: Crucial for responsive design. It tells the browser how to control the page's dimensions and scaling on mobile devices.</li>
          <li><code>&lt;title&gt;</code>: Sets the title of the document, shown in the browser's title bar or tab. Highly important for SEO.</li>
          <li><code>&lt;body&gt;</code>: Contains all the visible content (headings, paragraphs, images, links, tables).</li>
        </ul>

        <div class="note-interview-box">
          <h4>Interview Question</h4>
          <p><strong>Q: What happens if you forget the DOCTYPE declaration?</strong></p>
          <p><em>Ans:</em> The browser will render the page in "Quirks Mode", an older rendering mode that emulates the non-standard behavior of old browsers. This can break modern CSS layouts and HTML5 features.</p>
        </div>
      `
    },
    {
      id: 'html-ch3',
      title: '3. Essential Tags & Attributes',
      estimatedMinutes: 25,
      content: `
        <h2>Essential HTML Tags & Attributes</h2>
        
        <h3>1. Tags and Elements</h3>
        <p>An HTML element typically consists of a start tag, content, and an end tag: <code>&lt;tagname&gt;Content goes here...&lt;/tagname&gt;</code>.</p>
        <p>However, some tags are <em>empty elements</em> (self-closing), like <code>&lt;img&gt;</code> or <code>&lt;br&gt;</code>.</p>

        <h3>2. Common Tags</h3>
        <table class="notes-table">
          <thead>
            <tr><th>Tag</th><th>Description</th><th>Example</th></tr>
          </thead>
          <tbody>
            <tr><td><code>&lt;h1&gt;</code> to <code>&lt;h6&gt;</code></td><td>Headings. H1 is the most important, H6 the least. Used for SEO and structure.</td><td><code>&lt;h1&gt;Main Title&lt;/h1&gt;</code></td></tr>
            <tr><td><code>&lt;p&gt;</code></td><td>Paragraph. Used to format blocks of text.</td><td><code>&lt;p&gt;Hello World&lt;/p&gt;</code></td></tr>
            <tr><td><code>&lt;a&gt;</code></td><td>Anchor element. Used to create hyperlinks.</td><td><code>&lt;a href="url"&gt;Link text&lt;/a&gt;</code></td></tr>
            <tr><td><code>&lt;img&gt;</code></td><td>Image element (self-closing). Embeds an image.</td><td><code>&lt;img src="img.jpg" alt="Description"&gt;</code></td></tr>
            <tr><td><code>&lt;ul&gt; / &lt;ol&gt;</code></td><td>Unordered (bulleted) and Ordered (numbered) lists.</td><td><code>&lt;ul&gt;&lt;li&gt;Item&lt;/li&gt;&lt;/ul&gt;</code></td></tr>
            <tr><td><code>&lt;div&gt;</code></td><td>A generic block-level container.</td><td><code>&lt;div class="container"&gt;...&lt;/div&gt;</code></td></tr>
            <tr><td><code>&lt;span&gt;</code></td><td>A generic inline container.</td><td><code>&lt;span class="highlight"&gt;Text&lt;/span&gt;</code></td></tr>
          </tbody>
        </table>

        <h3>3. Attributes</h3>
        <p>Attributes provide additional information about HTML elements. They are always specified in the <strong>start tag</strong> and usually come in name/value pairs.</p>
        <ul>
          <li><strong>href:</strong> Specifies the URL for a link.</li>
          <li><strong>src:</strong> Specifies the path to an image or media file.</li>
          <li><strong>alt:</strong> Provides alternate text for an image if it cannot be displayed. Crucial for screen readers.</li>
          <li><strong>id:</strong> Provides a unique identifier for an element. Cannot be reused on the same page.</li>
          <li><strong>class:</strong> Provides a non-unique identifier used to target multiple elements with CSS or JavaScript.</li>
          <li><strong>style:</strong> Used to add inline CSS styles directly to an element.</li>
        </ul>

        <div class="note-interview-box">
          <h4>Interview Question</h4>
          <p><strong>Q: What is the difference between an ID and a Class?</strong></p>
          <p><em>Ans:</em> An <code>id</code> must be unique within an HTML document, meaning it can only be applied to one single element. A <code>class</code> can be reused across multiple elements. IDs have higher CSS specificity than classes.</p>
        </div>
      `
    },
    {
      id: 'html-ch4',
      title: '4. Block vs. Inline Elements',
      estimatedMinutes: 15,
      content: `
        <h2>Block-Level vs. Inline Elements</h2>
        <p>Understanding the default display behavior of HTML elements is crucial for layout design.</p>

        <h3>Block-Level Elements</h3>
        <p>A block-level element always starts on a new line and takes up the full width available (stretches out to the left and right as far as it can).</p>
        <ul>
          <li>They have a top and bottom margin by default.</li>
          <li>Examples: <code>&lt;div&gt;</code>, <code>&lt;h1&gt; - &lt;h6&gt;</code>, <code>&lt;p&gt;</code>, <code>&lt;form&gt;</code>, <code>&lt;header&gt;</code>, <code>&lt;footer&gt;</code>, <code>&lt;section&gt;</code>.</li>
        </ul>
        <pre><code class="language-html">
&lt;div style="background-color: blue;"&gt;This is a block element. It takes the full width.&lt;/div&gt;
        </code></pre>

        <h3>Inline Elements</h3>
        <p>An inline element does not start on a new line and only takes up as much width as necessary.</p>
        <ul>
          <li>You cannot easily set their <code>width</code> or <code>height</code> properties in CSS (unless you change their display to inline-block).</li>
          <li>Examples: <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>, <code>&lt;img&gt;</code>, <code>&lt;strong&gt;</code>, <code>&lt;em&gt;</code>, <code>&lt;button&gt;</code>.</li>
        </ul>
        <pre><code class="language-html">
&lt;span style="background-color: red;"&gt;This is an inline element.&lt;/span&gt;
        </code></pre>

        <div class="note-tip-box">
          <h4>Pro Tip</h4>
          <p>You can change the default behavior of any element using CSS by modifying its <code>display</code> property (e.g., <code>display: block;</code> or <code>display: inline;</code>).</p>
        </div>
      `
    },
    {
      id: 'html-ch5',
      title: '5. HTML5 Semantic Elements',
      estimatedMinutes: 20,
      content: `
        <h2>Semantic HTML</h2>
        <p>Semantic HTML introduces tags that clearly describe their meaning to both the browser and the developer. Prior to HTML5, developers relied heavily on generic <code>&lt;div&gt;</code> tags with id or class attributes (e.g., <code>&lt;div id="header"&gt;</code>).</p>

        <h3>Why Semantic HTML Matters</h3>
        <ol>
          <li><strong>SEO (Search Engine Optimization):</strong> Search engines can better understand the structure and content of a page, potentially improving rankings.</li>
          <li><strong>Accessibility:</strong> Screen readers use semantic tags to help visually impaired users navigate the page effectively.</li>
          <li><strong>Maintainability:</strong> It is easier for developers to read and maintain the code.</li>
        </ol>

        <h3>Important Semantic Tags</h3>
        <ul>
          <li><code>&lt;header&gt;</code>: Represents introductory content, typically a group of introductory or navigational aids.</li>
          <li><code>&lt;nav&gt;</code>: Represents a section of a page whose purpose is to provide navigation links.</li>
          <li><code>&lt;main&gt;</code>: Specifies the main content of a document. There should be only one main element per page.</li>
          <li><code>&lt;section&gt;</code>: Represents a generic standalone section of a document, which doesn't have a more specific semantic tag to represent it.</li>
          <li><code>&lt;article&gt;</code>: Specifies independent, self-contained content (e.g., a blog post, news article). It should make sense on its own.</li>
          <li><code>&lt;aside&gt;</code>: Used for content aside from the content it is placed in (e.g., a sidebar).</li>
          <li><code>&lt;footer&gt;</code>: Defines a footer for a document or section (typically containing authorship, copyright, or contact information).</li>
          <li><code>&lt;figure&gt; & &lt;figcaption&gt;</code>: Used for self-contained content, like images, diagrams, or code snippets, often with a caption.</li>
        </ul>

        <div class="note-interview-box">
          <h4>Interview Question</h4>
          <p><strong>Q: What is the difference between &lt;article&gt; and &lt;section&gt;?</strong></p>
          <p><em>Ans:</em> An <code>&lt;article&gt;</code> is intended to be independently distributable or reusable (e.g., a forum post, a magazine or newspaper article, a blog entry). A <code>&lt;section&gt;</code> is a thematic grouping of content, typically with a heading. An article can contain sections, and a section can contain articles.</p>
        </div>
      `
    },
    {
      id: 'html-ch6',
      title: '6. HTML Forms and Inputs',
      estimatedMinutes: 35,
      content: `
        <h2>Forms and Inputs</h2>
        <p>Forms are the primary method for collecting user input on a web page.</p>

        <h3>The &lt;form&gt; Element</h3>
        <p>The <code>&lt;form&gt;</code> tag acts as a container for UI controls. It has two highly important attributes:</p>
        <ul>
          <li><strong>action:</strong> Defines the URL (API endpoint) where the form data should be sent.</li>
          <li><strong>method:</strong> Defines the HTTP method to use (usually <code>GET</code> or <code>POST</code>). 
            <ul>
              <li><em>GET:</em> Appends form data to the URL. Unsafe for sensitive data. Limited size.</li>
              <li><em>POST:</em> Sends form data in the HTTP request body. Safer and supports large amounts of data.</li>
            </ul>
          </li>
        </ul>

        <h3>Common Input Types</h3>
        <p>The <code>&lt;input&gt;</code> tag is extremely versatile, changing behavior based on its <code>type</code> attribute.</p>
        <pre><code class="language-html">
&lt;form action="/submit-data" method="POST"&gt;
  &lt;!-- Text Input --&gt;
  &lt;label for="username"&gt;Username:&lt;/label&gt;
  &lt;input type="text" id="username" name="user_name" required&gt;

  &lt;!-- Password Input --&gt;
  &lt;label for="password"&gt;Password:&lt;/label&gt;
  &lt;input type="password" id="password" name="user_pwd" minlength="8" required&gt;

  &lt;!-- Radio Buttons (Only one can be selected in a group sharing the same 'name') --&gt;
  &lt;p&gt;Select Gender:&lt;/p&gt;
  &lt;input type="radio" id="male" name="gender" value="male"&gt;
  &lt;label for="male"&gt;Male&lt;/label&gt;
  &lt;input type="radio" id="female" name="gender" value="female"&gt;
  &lt;label for="female"&gt;Female&lt;/label&gt;

  &lt;!-- Checkbox --&gt;
  &lt;input type="checkbox" id="subscribe" name="subscribe" value="yes"&gt;
  &lt;label for="subscribe"&gt;Subscribe to newsletter&lt;/label&gt;

  &lt;!-- Dropdown (Select) --&gt;
  &lt;label for="country"&gt;Country:&lt;/label&gt;
  &lt;select id="country" name="country"&gt;
    &lt;option value="india"&gt;India&lt;/option&gt;
    &lt;option value="usa"&gt;USA&lt;/option&gt;
  &lt;/select&gt;

  &lt;!-- Submit Button --&gt;
  &lt;button type="submit"&gt;Register&lt;/button&gt;
&lt;/form&gt;
        </code></pre>

        <h3>Important Attributes</h3>
        <ul>
          <li><strong>name:</strong> Crucial! This is the key used to identify the data on the server when the form is submitted.</li>
          <li><strong>value:</strong> Specifies the default or submitted value of an input.</li>
          <li><strong>placeholder:</strong> Provides a short hint that describes the expected value of an input field.</li>
          <li><strong>required:</strong> Specifies that an input field must be filled out before submitting the form (HTML5 native validation).</li>
          <li><strong>disabled:</strong> Disables the input, preventing interaction. Disabled inputs are <em>not</em> submitted with the form.</li>
        </ul>

        <div class="note-interview-box">
          <h4>Interview Question</h4>
          <p><strong>Q: Why should every &lt;input&gt; have an associated &lt;label&gt;?</strong></p>
          <p><em>Ans:</em> For accessibility. Screen readers read out the label associated with the focused input. Additionally, clicking the label text will focus the input or toggle the radio/checkbox, improving UX, especially on mobile.</p>
        </div>
      `
    },
    {
      id: 'html-ch7',
      title: '7. HTML Tables',
      estimatedMinutes: 20,
      content: `
        <h2>HTML Tables</h2>
        <p>Tables allow web developers to arrange data into rows and columns. They should strictly be used for tabular data and <strong>never for page layout</strong>.</p>

        <h3>Basic Structure</h3>
        <pre><code class="language-html">
&lt;table border="1"&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th&gt;Student ID&lt;/th&gt;
      &lt;th&gt;Name&lt;/th&gt;
      &lt;th&gt;Grade&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;
  &lt;tbody&gt;
    &lt;tr&gt;
      &lt;td&gt;101&lt;/td&gt;
      &lt;td&gt;Aman Verma&lt;/td&gt;
      &lt;td&gt;A&lt;/td&gt;
    &lt;/tr&gt;
    &lt;tr&gt;
      &lt;td&gt;102&lt;/td&gt;
      &lt;td&gt;Neha Sharma&lt;/td&gt;
      &lt;td&gt;B+&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
  &lt;tfoot&gt;
    &lt;tr&gt;
      &lt;td colspan="3"&gt;Total Students: 2&lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tfoot&gt;
&lt;/table&gt;
        </code></pre>

        <h3>Elements</h3>
        <ul>
          <li><code>&lt;table&gt;</code>: The container for the entire table.</li>
          <li><code>&lt;tr&gt;</code>: Table Row.</li>
          <li><code>&lt;th&gt;</code>: Table Heading. Text is bold and centered by default. Used for semantic headers.</li>
          <li><code>&lt;td&gt;</code>: Table Data (standard cell).</li>
          <li><code>&lt;thead&gt;, &lt;tbody&gt;, &lt;tfoot&gt;</code>: Semantic grouping tags. Useful for styling and allowing the body to scroll independently of the header.</li>
        </ul>

        <h3>Spanning Rows and Columns</h3>
        <p>Sometimes you need a cell to span across multiple columns or rows.</p>
        <ul>
          <li><code>colspan="n"</code>: Makes a cell span 'n' columns.</li>
          <li><code>rowspan="n"</code>: Makes a cell span 'n' rows.</li>
        </ul>

        <div class="note-interview-box">
          <h4>Interview Question</h4>
          <p><strong>Q: Why shouldn't we use tables for layout?</strong></p>
          <p><em>Ans:</em> Before CSS flexbox/grid, developers used tables to create grid layouts. This is a terrible practice because: 1) It creates deeply nested, unmaintainable code. 2) It destroys accessibility (screen readers get confused). 3) It is extremely difficult to make responsive for mobile devices.</p>
        </div>
      `
    },
    {
      id: 'html-ch8',
      title: '8. Audio, Video, and Iframes',
      estimatedMinutes: 20,
      content: `
        <h2>Multimedia and Embedded Content</h2>
        <p>HTML5 introduced native tags to embed audio and video without relying on third-party plugins (like Flash).</p>

        <h3>1. Audio Tag</h3>
        <p>Embeds sound content.</p>
        <pre><code class="language-html">
&lt;audio controls&gt;
  &lt;source src="horse.ogg" type="audio/ogg"&gt;
  &lt;source src="horse.mp3" type="audio/mpeg"&gt;
  Your browser does not support the audio element.
&lt;/audio&gt;
        </code></pre>
        <ul>
          <li><code>controls</code>: Adds browser-default play, pause, and volume controls.</li>
          <li><code>autoplay</code>: Starts playing automatically (often blocked by modern browsers unless muted).</li>
          <li><code>loop</code>: Replays the audio automatically.</li>
        </ul>

        <h3>2. Video Tag</h3>
        <p>Embeds video content.</p>
        <pre><code class="language-html">
&lt;video width="320" height="240" controls poster="thumbnail.jpg"&gt;
  &lt;source src="movie.mp4" type="video/mp4"&gt;
  Your browser does not support the video tag.
&lt;/video&gt;
        </code></pre>
        <ul>
          <li><code>poster</code>: Specifies an image to be shown while the video is downloading, or until the user hits the play button.</li>
        </ul>

        <h3>3. Iframes</h3>
        <p>An iframe (Inline Frame) is used to embed another HTML document within the current HTML document. Frequently used for embedding YouTube videos or Google Maps.</p>
        <pre><code class="language-html">
&lt;iframe src="https://www.youtube.com/embed/tgbNymZ7vqY" 
        width="100%" height="300" 
        style="border:none;" title="YouTube video"&gt;
&lt;/iframe&gt;
        </code></pre>

        <div class="note-interview-box">
          <h4>Interview Question</h4>
          <p><strong>Q: What are the security concerns with Iframes?</strong></p>
          <p><em>Ans:</em> Iframes can be targeted by "Clickjacking" attacks. To mitigate this, developers use the <code>sandbox</code> attribute to restrict what the iframe can do (e.g., preventing it from running scripts or submitting forms) and use HTTP headers like <code>X-Frame-Options</code> to prevent their own site from being embedded elsewhere.</p>
        </div>
      `
    },
    {
      id: 'html-ch9',
      title: '9. Meta Tags & SEO Basics',
      estimatedMinutes: 25,
      content: `
        <h2>Meta Tags and Search Engine Optimization (SEO)</h2>
        <p>The <code>&lt;head&gt;</code> section of an HTML document contains metadata—data about data. This information isn't displayed on the page but is crucial for browsers, social media platforms, and search engines.</p>

        <h3>Important Meta Tags</h3>
        
        <h4>1. Viewport Meta Tag (Crucial for Mobile)</h4>
        <pre><code class="language-html">
&lt;meta name="viewport" content="width=device-width, initial-scale=1.0"&gt;
        </code></pre>
        <p>This tells the browser to set the width of the page to follow the screen-width of the device, and sets the initial zoom level to 100%. Without this, websites look tiny on mobile phones.</p>

        <h4>2. SEO Meta Tags</h4>
        <pre><code class="language-html">
&lt;meta name="description" content="Quenrix is the best platform to learn coding online."&gt;
&lt;meta name="keywords" content="HTML, CSS, JavaScript, coding tutorials"&gt;
&lt;meta name="author" content="Quenrix Academy"&gt;
        </code></pre>
        <p>The <code>description</code> tag is extremely important. It is the snippet of text that appears below the link in Google Search results.</p>

        <h4>3. Open Graph Tags (Social Media)</h4>
        <p>These tags dictate how your page looks when shared on Facebook, LinkedIn, or Twitter (link previews).</p>
        <pre><code class="language-html">
&lt;meta property="og:title" content="Learn HTML in 2026"&gt;
&lt;meta property="og:description" content="A complete guide to modern HTML."&gt;
&lt;meta property="og:image" content="https://quenrix.com/html-banner.jpg"&gt;
&lt;meta property="og:url" content="https://quenrix.com/course/html"&gt;
        </code></pre>

        <h3>Basic SEO HTML Practices</h3>
        <ul>
          <li><strong>Use exactly one <code>&lt;h1&gt;</code> tag</strong> per page, containing the main topic.</li>
          <li><strong>Use descriptive title tags</strong> (<code>&lt;title&gt;</code>).</li>
          <li><strong>Use <code>alt</code> attributes</strong> on all images.</li>
          <li><strong>Write descriptive link text</strong>. Don't use "Click Here"; use "Read the HTML tutorial".</li>
          <li><strong>Use semantic tags</strong> (nav, main, article) to structure the document.</li>
        </ul>

        <div class="note-interview-box">
          <h4>Interview Question</h4>
          <p><strong>Q: Does Google still use the meta "keywords" tag for ranking?</strong></p>
          <p><em>Ans:</em> No, Google officially announced years ago that they no longer use the keywords meta tag for web ranking due to keyword stuffing abuses. However, the description meta tag is still highly valuable for click-through rates.</p>
        </div>
      `
    },
    {
      id: 'html-ch10',
      title: '10. HTML5 APIs & Advanced Features',
      estimatedMinutes: 30,
      content: `
        <h2>HTML5 Advanced Features and APIs</h2>
        <p>HTML5 brought several native JavaScript APIs that previously required complex third-party libraries or plugins.</p>

        <h3>1. Web Storage (LocalStorage & SessionStorage)</h3>
        <p>Provides a way for web pages to store data locally within the user's browser, securely and efficiently.</p>
        <ul>
          <li><strong>LocalStorage:</strong> Stores data with no expiration date. Data persists even when the browser is closed.</li>
          <li><strong>SessionStorage:</strong> Stores data for one session. Data is deleted when the browser tab is closed.</li>
        </ul>
        <pre><code class="language-javascript">
// Storing data
localStorage.setItem("username", "Aman");
// Retrieving data
let user = localStorage.getItem("username");
        </code></pre>

        <h3>2. Geolocation API</h3>
        <p>Allows the user to share their geographical location with the web application (requires user permission).</p>
        <pre><code class="language-javascript">
navigator.geolocation.getCurrentPosition(function(position) {
  console.log("Lat: " + position.coords.latitude);
  console.log("Lon: " + position.coords.longitude);
});
        </code></pre>

        <h3>3. Canvas API</h3>
        <p>The <code>&lt;canvas&gt;</code> element is used to draw graphics, on the fly, via JavaScript. Used for games, graphs, and complex animations.</p>
        <pre><code class="language-html">
&lt;canvas id="myCanvas" width="200" height="100"&gt;&lt;/canvas&gt;
        </code></pre>

        <h3>4. Data Attributes</h3>
        <p>HTML5 allows you to store extra information on standard HTML elements without requiring hacks. You prefix custom attributes with <code>data-</code>.</p>
        <pre><code class="language-html">
&lt;button data-user-id="12345" data-role="admin" onclick="checkUser(this)"&gt;Delete User&lt;/button&gt;
        </code></pre>
        <p>You can access these in JS easily using <code>element.dataset.userId</code>.</p>

        <div class="note-interview-box">
          <h4>Interview Question</h4>
          <p><strong>Q: What is the difference between LocalStorage and Cookies?</strong></p>
          <p><em>Ans:</em> 
          1. <strong>Capacity:</strong> LocalStorage can hold up to ~5MB, Cookies only 4KB. <br>
          2. <strong>Transmission:</strong> Cookies are automatically sent to the server with every HTTP request. LocalStorage data never leaves the client (unless manually sent via AJAX). <br>
          3. <strong>Expiration:</strong> Cookies can have a set expiration date. LocalStorage persists until manually cleared.</p>
        </div>
      `
    }
  ]
};
