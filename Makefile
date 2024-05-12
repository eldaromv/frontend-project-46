install:
	npm ci
gendiff:
	node bin/gendiff.js
make lint:
	npx eslint .
make fix:
	npx eslint --fix .
test-coverage:
	npm test -- --coverage --coverageProvider=v8