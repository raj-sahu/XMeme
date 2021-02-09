from typing import Optional, List
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.responses import HTMLResponse
import databases
import sqlalchemy
import datetime

app = FastAPI(title="XMeme",
              description="This is a very fancy project to share dope Memes",
              )

# MODELS


class MemeIn(BaseModel):
    name: str
    caption: str
    meme_url: str


class Meme(BaseModel):
    id: int
    name: str
    caption: str
    meme_url: str
    upload_time: datetime.datetime


###########################################################    DB     ######################################################
inMemoryDb = []
DATABASE_URL = "sqlite:///./test.db"
database = databases.Database(DATABASE_URL)
metadata = sqlalchemy.MetaData()
uploadedMemes = sqlalchemy.Table(
    "Memes",
    metadata,
    sqlalchemy.Column("id", sqlalchemy.Integer, primary_key=True),
    sqlalchemy.Column("name", sqlalchemy.String),
    sqlalchemy.Column("caption", sqlalchemy.String),
    sqlalchemy.Column("meme_url", sqlalchemy.String),
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


@app.get("/", response_class=HTMLResponse)
async def read_root():
    img_content = """
        <html>
         <head>
            <title> XMeme </title>
         </head>
        <body id="particle">
            <h2 align="center">Memes</h2>"""
    for meme in inMemoryDb:
        img_content += f"<span> <img src=\"{meme['meme_url']}\" alt=\"ImgNotLoaded\"></span>"
    img_content += """
        </body>
    </html>
    """
    return HTMLResponse(content=img_content, status_code=200)


# @app.get("/items/{item_id}")
# async def read_item(item_id: int, q: Optional[str] = None):
#     return {"item_id": item_id, "q": q}

# @app.post("/memes")
# def upload_meme(meme: MemeIn):
#     inMemoryDb.append(meme.dict())
#     return inMemoryDb[-1]
@app.get("/memes/", response_model=List[Meme])
async def read_notes():
    query = uploadedMemes.select()
    # database.fetch
    return await database.fetch_all(query)


@app.post("/memes/", response_model=Meme)
async def upload_meme(meme: MemeIn):
    query = uploadedMemes.insert().values(
        name=meme.name, caption=meme.caption, meme_url=meme.meme_url, upload_time=datetime.datetime.now())
    last_record_id = await database.execute(query)
    return {**meme.dict(), "id": last_record_id}
