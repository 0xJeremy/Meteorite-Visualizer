import json
import random

with open('./meteorites.json') as f:
  data = json.load(f)


randomList = random.sample(range(0, len(data)), 300)

small = [data[i] for i in randomList[0:100]]
medium = [data[i] for i in randomList[100:200]]
large = [data[i] for i in randomList[200:300]]



smallfile =  open('../src/meteorites_small.json','w+')
medfile =  open('../src/meteorites_medium.json','w+')
largefile =  open('../src/meteorites_large.json','w+')

json.dump(small,smallfile, indent=1)
json.dump(medium,medfile, indent=1)
json.dump(large,largefile, indent=1)


