import { NoteTopic } from '../professional-notes.service';

export const mongodbNotes: NoteTopic = {
  id: 'mongodb',
  title: 'MongoDB Topper Notes',
  description: 'Learn NoSQL basics, Document Databases, Aggregation Framework, and Performance Optimization.',
  icon: 'fas fa-leaf',
  chapters: [
    {
      id: 'mongodb-ch1',
      title: '1. NoSQL & MongoDB Basics',
      estimatedMinutes: 20,
      content: `
        <h2>What is MongoDB?</h2>
        <p>MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas.</p>
        
        <h3>Collections and Documents</h3>
        <ul>
          <li><strong>Database:</strong> Container for collections.</li>
          <li><strong>Collection:</strong> Equivalent to an RDBMS table. It exists within a single database.</li>
          <li><strong>Document:</strong> A record in a MongoDB collection and the basic unit of data.</li>
        </ul>
      `
    }
  ]
};
