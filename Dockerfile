FROM tiangolo/uvicorn-gunicorn-fastapi:python3.7
COPY requirements.txt .
COPY ./Backend /app
RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt
CMD ["gunicorn","-w" ,"4" ,"-b", "localhost:8081","-k" ,"uvicorn.workers.UvicornWorker", "main:app"]
# CMD ["gunicorn","-w" ,"4" ,"-b", "0.0.0.0:8081","-k" ,"uvicorn.workers.UvicornWorker", "main:app"]