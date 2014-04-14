all:
	@echo "Targets:"
	@echo ""
	@echo "  clean"
	@echo "  deploy"
	@echo "  img"
	@echo "  freeze"
	@echo "  test"
	@echo "  test_frozen"
	@echo "  upload"
	@echo ""

deploy: clean img freeze upload

clean:
	rm -rf website/crossbario/build
	scons -uc

img:
	scons

freeze:
	python website/crossbario/__init__.py -f

upload:
	python website/crossbario/upload.py --bucket "crossbar.io" --directory "build"

test:
	python website/crossbario/__init__.py -d --widgeturl "http://127.0.0.1:8090/widget" -p 8050

test_socketserver:
	python website/crossbario/__init__.py -d -s

test_frozen:
	python website/crossbario/__init__.py -f -d
