gunicorn -w 4 -b 0.0.0.0:8081 -k uvicorn.workers.UvicornWorker main:app --chdir ./Backend/
# sudo docker run -d --net="host" xmeme_app