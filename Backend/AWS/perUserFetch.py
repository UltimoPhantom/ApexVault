import pymongo
client = pymongo.MongoClient("mongodb+srv://sphantomtnt:xuMDsG4SBsq5Z7ZH@cluster0.mklajvr.mongodb.net/Stocks?retryWrites=true&w=majority")
db = client["Stocks"]
collection = db["stocks"].find({"email":"z@z.com"})

for i in collection:
    print(i)
