import json
import random

with open('./meteorites.json') as f:
  data = json.load(f)

new_data = []

duplicates = {}

max_dups = 100

for d in data:
	if not (d['coordinates'][0] == 0 and d['coordinates'][1]==0):

		# print(d['name'].split(' ', 1)[0])
		key = ''.join([i for i in d['name'] if not i.isdigit()])
		if key in duplicates.keys():
			duplicates[key] += 1
		else:
			duplicates[key] = 1
		
		if duplicates[key] <= max_dups:
			new_data.append(d)



new_meteorites = open('./meteorites_modified.json','w+')

json.dump(new_data,new_meteorites)

len_new_data = len(new_data)
num_samples = 3000

randomList = random.sample(range(0, len(new_data)), num_samples)

end_small = int(.25*num_samples)
end_med = int(.55*num_samples)
end_large = num_samples

small = [new_data[i] for i in randomList[0:end_small]]
medium = [new_data[i] for i in randomList[end_small:end_med]]
large = [new_data[i] for i in randomList[end_med:num_samples]]



smallfile =  open('../src/meteorites_small.json','w+')
medfile =  open('../src/meteorites_medium.json','w+')
largefile =  open('../src/meteorites_large.json','w+')

json.dump(small,smallfile)
json.dump(medium,medfile)
json.dump(large,largefile)


