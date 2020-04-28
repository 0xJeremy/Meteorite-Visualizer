import csv
import re

input_file = 'output_for_json.csv'
output_file = 'meteorites.json'

row_count = 0

with open(input_file, "r") as source:
    reader = csv.reader(source)
    with open(output_file, "w", newline='') as result:
        result.write("[\n")
        for row in reader:
            if row_count == 0:
                row_count+=1
                continue

            if (len(row[3].split(' ')[0].split('/')) != 3 or row[4] == '' or row[5] == '' or row[2]=='' or row[2]=='0'
                # or int(row[3].split(' ')[0].split('/')[2]) < 1000) 
                or float(row[5]) < -90 or float(row[5]) > 90):
                continue

            if row_count == 1:
                result.write("{")
                row_count+=1
            else:
                result.write(",\n{")
            result.write(("\"coordinates\":[{},{}],").format(row[4],row[5]))
            result.write(("\"name\":\"{}\",").format(row[0]))
            result.write(("\"class\":\"{}\",").format(row[1]))
            result.write(("\"mass\":\"{}\",").format(str(round(float(row[2]), 3))))
            result.write(("\"year\":{}").format(row[3].split(' ')[0].split('/')[2]))
            result.write("}")
        result.write("]")