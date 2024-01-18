import pymongo
from dotenv import MONGO_STRING 

client = pymongo.MongoClient(MONGO_STRING)