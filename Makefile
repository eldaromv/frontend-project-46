install:
	npm ci
gendiff:
	node bin/gendiff.js
make lint:
	npx eslint .
make fix:
	npx eslint --fix .