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

clean:
	rm -rf website/crossbario/build
	scons -uc

img:
	scons

freeze:
	python website/crossbario/__init__.py -f

upload:
	python website/crossbario/upload.py --bucket "crossbar.io" --directory "build"

publish: img freeze upload

test:
	# python website/crossbario/__init__.py -d -p 8050
#	python website/crossbario/__init__.py -d --widgeturl "" -p 8050
	python website/crossbario/__init__.py -d --widgeturl "http://127.0.0.1:8090/widget" -p 8050

test_socketserver:
	python website/crossbario/__init__.py -d -s --widgeturl "http://127.0.0.1:8090/widget" -p 8050

test_frozen:
	python website/crossbario/__init__.py -f -d --widgeturl "http://127.0.0.1:8090/widget" -p 8050
