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


SVG_FILES = crossbar_arch.svg \
            crossbar_arch_new.svg \
				crossbar_components.svg \
				crossbar_hiw_architecture.svg \
            crossbar_hiw_call_stored_procedure.svg \
            crossbar_hiw_client_to_client_pubsub.svg \
            crossbar_hiw_publish_from_database.svg \
            crossbar_icon.svg \
            crossbar_icon_inverted.svg \
            github.svg \
            github_highlighted.svg \
            wamp_grey.svg \
            zeichnung.svg \
            zeichnung2.svg \
            crossbar_arch_android.svg \
            crossbar_arch_arduino.svg \
            crossbar_arch_crossbar.svg \
            crossbar_arch_crossbar_bs.svg \
            crossbar_arch_html5.svg \
            crossbar_arch_ios.svg \
            crossbar_arch_java.svg \
            crossbar_arch_node.svg \
            crossbar_arch_oracle.svg \
            crossbar_arch_postgresql.svg \
            crossbar_arch_python.svg \
            crossbar_arch_raspberry.svg \

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

