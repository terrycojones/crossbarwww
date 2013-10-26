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

deploy: clean freeze upload

clean:
	rm -rf website/crossbario/build

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


SVG_FILES = crossbar_hiw_architecture.svg \
            crossbar_hiw_call_stored_procedure.svg

svg:
	@for f in $(SVG_FILES); \
	   do \
	      scour -i design/$$f -o website/crossbario/static/img/$$f \
	      	--enable-viewboxing \
	      	--enable-id-stripping \
	      	--enable-comment-stripping \
	      	--shorten-ids \
	      	--indent=none \
	   ; done

png: svg
	@for f in $(SVG_FILES); \
	   do \
	      inkscape.exe -z -e website/crossbario/static/img/$$f.png website/crossbario/static/img/$$f \
	   ; done

#"C:\Program Files (x86)\Inkscape\inkscape.exe" -z -e crossbar_hiw_architecture.png crossbar_hiw_architecture.svg
#"C:\Program Files (x86)\Inkscape\inkscape.exe" -z -e crossbar_hiw_architecture.png -w 1024 crossbar_hiw_architecture.svg

