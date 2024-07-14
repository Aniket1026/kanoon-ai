# Sanvidhaan AI

Kanoon AI is an intelligent legal assistant trained on the Indian Law. It leverages advanced AI models and a robust backend to provide users with accurate and comprehensive answers to queries related to the Basic Indian Law.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)

## Introduction

Kanoon AI aims to simplify legal understanding for the common man by providing a user-friendly platform to query and receive detailed responses about the Indian Constitution. It combines the power of natural language processing with the richness of the Indian legal system.

## Features

- **Query the Indian Law:** Ask questions and receive detailed responses.
- **Streamlined Responses:** Uses a Retrieval-Augmented Generation (RAG) model to ensure accurate and relevant answers.
- **User-Friendly Interface:** A clean and intuitive interface built with Next.js and Shadcn for styling.
- **Persisted Storage:** Utilizes Chroma DB for efficient storage and retrieval of legal documents.

## Tech Stack

- **Frontend:** Next.js, React, Shadcn
- **Backend:** FastAPI
- **Database:** Chroma DB
- **Machine Learning Models:** Google Generative AI, Sentence Transformers

## Architecture

The architecture of Kanoon AI is designed to be modular and scalable, adhering to SOLID principles.

1. **Frontend:** Built using Next.js with a focus on client-side rendering , streaming responses and static site generation.
2. **Backend:** FastAPI serves as the backend framework, providing RESTful API endpoints.
3. **Database:** Chroma DB is used for storing and retrieving embeddings of the documents.
4. **Machine Learning:** Utilizes Google Generative AI for generating responses based on retrieved context.
5. **Document Processing:** Documents are loaded and split using PyPDFLoader and text splitters, with embeddings generated using Sentence Transformers.
