# Architecture Notes

This document explains how the system could evolve beyond the basic assignment implementation.

---

## Scaling to 100k Users

To scale this system to handle a larger number of users, several improvements would be needed.

First, the backend API should run behind a load balancer so multiple server instances can handle incoming requests. This allows horizontal scaling.

Second, the database should move from a single MongoDB instance to a managed cluster (for example MongoDB Atlas) with proper indexing. Indexes on fields like `userId` and `createdAt` would significantly improve query performance.

Third, static assets from the frontend should be served via a CDN so the backend is not responsible for delivering UI files.

In a production environment the architecture might look like:

Client → CDN → Load Balancer → Multiple API Servers → Database Cluster

This setup ensures the system can handle a much higher number of concurrent users.

---

## Reducing LLM Cost

LLM calls can become expensive if every request triggers a new analysis.

To reduce cost:

1. Only analyze entries when the user explicitly requests analysis.
2. Store analysis results in the database so the same entry is never analyzed twice.
3. Limit the maximum text length for analysis.
4. Use smaller or cheaper models for simple classification tasks like emotion detection.

These steps help reduce unnecessary API calls to the LLM provider.

---

## Caching Repeated Analysis

Sometimes users may analyze the same text multiple times.

To avoid repeated LLM calls, the system can implement caching.

One simple approach is to store the analysis result directly in the journal entry document in MongoDB. If an entry already has emotion analysis data, the API can return the stored result instead of calling the LLM again.

Another option is to use Redis as a caching layer where the text content is hashed and used as a cache key.

This reduces response time and avoids repeated LLM costs.

---

## Protecting Sensitive Journal Data

Journal entries can contain very personal information, so protecting user data is important.

Some important steps include:

- Using HTTPS to encrypt data in transit
- Storing secrets such as API keys in environment variables
- Limiting access to the database
- Implementing authentication and authorization for users
- Avoiding logging sensitive journal content

In a real system, it may also be useful to encrypt journal entries before storing them in the database.

These practices help ensure that user data remains private and secure.