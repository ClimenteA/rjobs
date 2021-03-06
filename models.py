from datetime import date

from peewee import (
    SqliteDatabase,
    Model,
    CharField, 
    DateField, 
    TextField, 
    ForeignKeyField,
    chunked
)


DATABASE = "jobs.db"
DB = SqliteDatabase(DATABASE)


class BaseModel(Model):
    class Meta:
        database = DB


class Jobs(BaseModel):
    website      = CharField()
    link         = TextField()
    title        = CharField(default="") 
    company      = CharField(default="")
    description  = TextField(default="")
    tags         = CharField(default="")
    status       = CharField(default="new") 
    date         = DateField(default=date.today())

    class Meta:
        # Unique constrain index - from columns
        indexes = (
            (('website', 'title', 'company', 'description'), True),
        )


class Users(BaseModel):
    username = CharField(unique=True)
    password = CharField()


class UserApplications(BaseModel):
    user = ForeignKeyField(Users)
    job  = ForeignKeyField(Users)
    status = CharField() 


with DB:
    DB.create_tables([Jobs, Users, UserApplications])


def save_list_dict(MyModel, data_source, chunk_size=100):
    """
        Insert rows 100 at a time.
        Save a list of dicts [{}, {} etc] to a model in chunks

    """
    with DB.atomic():
        for batch in chunked(data_source, chunk_size):
            MyModel.insert_many(batch).execute()


