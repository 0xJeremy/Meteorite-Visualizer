input_file = 'sample-data-meteorite.js'
output_file = 'sample-data-meteorite-small.js'

allowed_lines = 100000
counter = 0

with open(input_file, 'r') as f:
	with open(output_file, 'w') as result:
		for line in f:
			counter += 1
			if counter == allowed_lines:
				break
			result.write(line)
