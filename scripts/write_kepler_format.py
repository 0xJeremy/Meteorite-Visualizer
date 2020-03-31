import csv

input_file = 'output.csv'
output_file = 'kepler.txt'
cols_to_remove = [9]

cols_to_remove = sorted(cols_to_remove, reverse=True)
row_count = 0

with open(input_file, "r") as source:
    reader = csv.reader(source)
    with open(output_file, "w", newline='') as result:
        for row in reader:
        	result.write("[\n")
        	for i in range(len(row)):
        		if i is len(row)-1:
        			break
        		if i in [0, 2, 3, 5, 6]:
        			result.write("\t\t'{}',\n".format(row[i].replace("'", '')))
        		else:
	        		result.write("\t\t{},\n".format(row[i].replace("'", '')))
        	result.write("\t\t{}\n".format(row[-1]))
        	result.write("],\n")
