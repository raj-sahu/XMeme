import datetime
from typing import List, Optional

import databases
import requests
import sqlalchemy
from fastapi import FastAPI, HTTPException
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

app = FastAPI(title="XMeme",
              description="This is a very fancy project to share dope Memes",
              )

# MODELS


class MemeIn(BaseModel):
    name: str
    caption: str
    url: str


class Meme(BaseModel):
    id: int
    name: str
    caption: str
    url: str
    upload_time: datetime.datetime


###########################################################    DB     ######################################################

DATABASE_URL = "sqlite:///./test.db"
database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()
uploadedMemes = sqlalchemy.Table(
    "Memes",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String),
    sqlalchemy.Column("caption", sqlalchemy.String),
    sqlalchemy.Column("url", sqlalchemy.String),
    sqlalchemy.Column("upload_time", sqlalchemy.DateTime),
)
engine = sqlalchemy.create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

metadata.create_all(engine)


@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

#############################################################################################################################


@app.get("/memes/", response_model=List[Meme])
async def get_top_100_memes():
    N = await database.fetch_all("SELECT count(*) FROM Memes")
    N = N[0][0]
    print("--------------------------"*5, "\n\t\t\t\tNO OF ITEMS\n",
          N, "\n-", "--------------------------"*5)
    query = f"SELECT * FROM (SELECT * FROM Memes LIMIT 100 OFFSET {N}-100) "

    return await database.fetch_all(query)


@app.get("/memes/{id}")
async def get_meme(id: int):
    query = uploadedMemes.select().where(uploadedMemes.c.id == id)
    response = await database.fetch_all(query)
    try:
        print("--------------------------"*5, "\n\t\t\t\tData\n",
              response[0], "\n-", "--------------------------"*5)
    except:
        raise HTTPException(status_code=404, detail="Item not found")

    return response[0]


async def sendRequest(url):
    try:
        page = requests.get(url)

    except Exception as e:
        print("error:", e)
        return False

    if (page.status_code != 200):
        return False

    return page.headers['content-type'][:5] == 'image'


@ app.post("/memes/")
async def upload_meme(meme: MemeIn):
    ImageUrl = await sendRequest(meme.url)
    if(ImageUrl == False):
        raise HTTPException(status_code=415, detail="Cant Fetch Image fom URL")
    query = uploadedMemes.insert().values(
        name=meme.name, caption=meme.caption, url=meme.url, upload_time=datetime.datetime.now())
    last_record_id = await database.execute(query)
    print("--------------------------"*5, "\n\t\t\t\tDATA INSERTED  \n",
          f"\nId={last_record_id}\n", "---------------------------"*5)
    return {"id": last_record_id}
