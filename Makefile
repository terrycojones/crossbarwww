all:
	@echo "Targets:"
	@echo ""
	@echo "  clean"
	@echo "  deploy"
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
	python website/crossbario/__init__.py -d

test_socketserver:
	python website/crossbario/__init__.py -d -s

test_frozen:
	python website/crossbario/__init__.py -f -d
