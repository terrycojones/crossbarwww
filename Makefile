all:
	@echo "Main targets:"
	@echo ""
	@echo "  test         : test the Web site locally"
	@echo "  test_frozen  : freeze and test the Web site locally"
	@echo "  deploy       : build images, freeze and publish the Web site"
	@echo ""
	@echo "More targets:"
	@echo ""
	@echo "  clean        : clean everything"
	@echo "  img          : build images"
	@echo "  freeze       : build static Web site"
	@echo "  upload       : upload Web site to S3"
	@echo "  requirements : install software packages required to build the Web site"
	@echo ""

requirements:
	# pip install --egg scons # Fails on Windows, so install manually
	pip install taschenmesser
	pip install scour
	pip install boto
	pip install flask
	pip install jinja2-highlight
	pip install mistune
	pip install frozen-flask

clean:
	rm -rf website/crossbario/build
	rm -rf website/crossbario/build_uploaded
	scons -uc

img:
	scons img

freeze:
	python website/crossbario/__init__.py -f

test: img
	python website/crossbario/__init__.py -d --widgeturl '' -p 8080

test_frozen: img
	python website/crossbario/__init__.py -f -d --widgeturl '' -p 8080

upload:
	scons upload

deploy: img freeze upload
