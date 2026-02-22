# Base image
FROM python:3.11-slim

# Install system dependencies (Poppler)
RUN apt-get update \
    && apt-get install -y --no-install-recommends poppler-utils \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /chatbot-agents

# Install uv (package manager) and uvicorn (ASGI server)
RUN pip install --no-cache-dir uv uvicorn

# Copy dependency files first for Docker caching
COPY requirements.in uv.lock* setup.py ./

# Install dependencies from uv.lock (reproducible)
RUN if [ -f uv.lock ]; then \
        uv pip sync uv.lock; \
    else \
        uv pip compile requirements.in -o uv.lock && uv pip sync uv.lock; \
    fi

# Copy the application code
COPY . .

# Install your package itself into system Python
RUN uv pip install --system .

# Environment variables
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Expose FastAPI port
EXPOSE 8000

# Start FastAPI app with uvicorn
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
