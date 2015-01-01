all:
	@echo "Targets:"
	@echo ""
	@echo "  clean"
	@echo "  img"
	@echo "  freeze"
	@echo "  upload"
	@echo "  publish"
	@echo "  test"
	@echo "  test_frozen"
	@echo ""

requirements:
	#pip install scons # fails on Windows, so install manually
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

freeze: img
	python website/crossbario/__init__.py -f

upload:
#	python website/crossbario/upload.py --bucket 'crossbar.io' --directory 'build'
	python website/crossbario/upload.py --bucket 'www-crossbario' --directory 'build'

publish: img freeze upload

test: img
	python website/crossbario/__init__.py -d -p 8080

test_no_network: img
	python website/crossbario/__init__.py -d --nonetwork --widgeturl 'http://127.0.0.1:8090/widget' -p 8080 --cstatic 'http://127.0.0.1:8888'

test_socketserver:
	python website/crossbario/__init__.py -d -s --widgeturl 'http://127.0.0.1:8090/widget' -p 8080

test_frozen: img freeze
	python website/crossbario/__init__.py -f -d --widgeturl 'http://127.0.0.1:8090/widget' -p 8080
