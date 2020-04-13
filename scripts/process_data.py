import csv

input_file = 'input.csv'
output_file = 'output_1.csv'
cols_to_remove = [5,9]

cols_to_remove = sorted(cols_to_remove, reverse=True)
row_count = 0

with open(input_file, "r") as source:
    reader = csv.reader(source)
    with open(output_file, "w", newline='') as result:
        writer = csv.writer(result)
        for row in reader:
            row_count += 1
            print('\r{0}'.format(row_count), end='')
            for col_index in cols_to_remove:
                del row[col_index]
            writer.writerow(row)
