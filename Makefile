# Build an upload file
.PHONY: build
build:
	mkdir -p dist
	cd extension && zip -r ../dist/extension.zip *

# Clean dist
.PHONY: clean
clean:
	rm -rf dist

# Search WINUSER
.PHYNY: get_winuser
get_winuser:
	$(eval WINUSER=$(shell echo $$PATH | grep -o '/mnt/c/Users/[a-zA-Z]*' | sed  's/\/mnt\/c\/Users\///g' | head -n 1))

# Build and copy to $WINUSER/Downloads/
.PHONY: build_wsl
build_wsl: build get_winuser
	cp dist/extension.zip /mnt/c/Users/$(WINUSER)/Downloads/

.PHONY: copy_wsl
copy_wsl: get_winuser
	mkdir -p /mnt/c/Users/$(WINUSER)/Downloads/tategaki-ni-narou
	cp -r . /mnt/c/Users/$(WINUSER)/Downloads/tategaki-ni-narou