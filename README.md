---

````
# AI Assisted Journal System

This project is a simple AI-assisted journaling system built as part of a technical assignment.

The idea behind the project is that users complete immersive nature sessions (for example forest, ocean, or mountain ambience) and then write a short journal entry about their experience. The system stores these entries and uses a Large Language Model (LLM) to analyze the emotional tone of the text.

The goal of this assignment is to demonstrate backend API design, frontend integration, and practical use of an LLM.

---

## Features

- Create journal entries
- View previous journal entries
- Analyze emotions in a journal entry using an LLM
- View simple insights about the user's journaling patterns

---

## Tech Stack

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

### Frontend
- React
- Axios
- Tailwind CSS

### AI Integration
- LLM used for emotion analysis

---

## API Endpoints

### Create Journal Entry

POST `/api/journal`

Example request:

```json
{
  "userId": "123",
  "ambience": "forest",
  "text": "I felt calm today after listening to the rain."
}
````

This endpoint stores a journal entry in the database.

---

### Get Journal Entries

GET `/api/journal/:userId`

Returns all journal entries for the given user.

---

### Analyze Journal Emotion

POST `/api/journal/analyze`

Example request:

```json
{
  "text": "I felt calm today after listening to the rain"
}
```

Example response:

```json
{
  "emotion": "calm",
  "keywords": ["rain", "nature", "peace"],
  "summary": "User experienced relaxation during the forest session"
}
```

This endpoint sends the journal text to an LLM and returns emotional insights.

---

### Insights API

GET `/api/journal/insights/:userId`

Example response:

```json
{
  "totalEntries": 8,
  "topEmotion": "calm",
  "mostUsedAmbience": "forest",
  "recentKeywords": ["focus", "nature", "rain"]
}
```

This endpoint returns basic insights about the user's journaling activity.

---

## Running the Project

### 1. Clone the repository

```
git clone <repository-url>
cd ai-journal-project
```

---

### 2. Install dependencies

Backend:

```
cd server
npm install
```

Frontend:

```
cd client
npm install
```

---

### 3. Setup Environment Variables

Create a `.env` file inside the **server** folder.

Example:

```
MONGO_URI=your_mongodb_connection_string
LLM_API_KEY=your_llm_api_key
PORT=5000
```

---

### 4. Run Backend

```
npm run dev
```

---

### 5. Run Frontend

```
npm run dev
```

Frontend usually runs on:

```
http://localhost:5173
```

Backend runs on:

```
http://localhost:5000
```

---

## Project Structure

```
project
│
├── client
│   ├── components
│   │   ├── JournalForm.jsx
│   │   ├── JournalList.jsx
│   │   └── Insights.jsx
│   └── App.jsx
│
└── server
    ├── models
    ├── controllers
    ├── routes
    └── server.js
```

---

## Architecture Notes

### Scaling to 100k Users

To support a larger number of users, the backend API could run behind a load balancer with multiple instances of the Node.js server. This allows requests to be distributed across several servers.

The database should also run on a managed MongoDB cluster with proper indexing on fields like `userId` and `createdAt` to improve performance.

Static frontend files could be served using a CDN so the backend focuses only on handling API requests.

A simplified production architecture might look like:

Client → CDN → Load Balancer → API Servers → Database Cluster

---

### Reducing LLM Cost

LLM calls can become expensive if every request triggers a new analysis.

To reduce cost:

* Only analyze entries when the user clicks the Analyze button
* Store analysis results so the same entry is not analyzed again
* Limit text length for analysis
* Use smaller models for simple emotion detection tasks

---

### Caching Repeated Analysis

Sometimes the same journal entry might be analyzed multiple times.

One approach is to store the analysis result directly in the journal document. If the analysis already exists, the API can return that instead of calling the LLM again.

For larger systems, a caching layer like Redis could also be used.

---

### Protecting Sensitive Journal Data

Journal entries may contain personal information, so protecting user data is important.

Some basic practices include:

* Using HTTPS to encrypt data in transit
* Storing secrets in environment variables
* Restricting database access
* Avoiding logging sensitive journal content
* Implementing authentication and authorization

In a real system, journal data could also be encrypted before being stored in the database.

---

## Notes

The UI in this project is intentionally simple because the main goal of the assignment is to demonstrate backend API design and LLM integration rather than advanced frontend styling.

This project was built as part of a technical assignment focused on API design and practical LLM usage.

```

```


```




```
