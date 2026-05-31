import { NoteTopic } from '../professional-notes.service';

export const sqlNotes: NoteTopic = {
  id: 'sql',
  title: 'SQL Topper Notes',
  description: 'Master Relational Databases, Joins, Subqueries, Normalization, and Indexing.',
  icon: 'fas fa-database',
  chapters: [
    {
      id: 'sql-ch1',
      title: '1. SQL Basics & Queries',
      estimatedMinutes: 20,
      content: `
        <h2>Introduction to SQL</h2>
        <p>SQL (Structured Query Language) is the standard language for dealing with Relational Databases.</p>
        
        <h3>Basic Commands</h3>
        <ul>
          <li><strong>SELECT:</strong> Extracts data from a database.</li>
          <li><strong>UPDATE:</strong> Updates data in a database.</li>
          <li><strong>DELETE:</strong> Deletes data from a database.</li>
          <li><strong>INSERT INTO:</strong> Inserts new data into a database.</li>
        </ul>
        
        <pre><code class="language-sql">
SELECT * FROM Users WHERE age > 18 ORDER BY name ASC;
        </code></pre>
      `
    }
  ]
};
