PACKAGER = zip
PROJECT_NAME = zendesk-widget
SOURCES = app.css app.js assets manifest.json templates translations
SWITCHES = -r

default: zip
zip: clean
	$(PACKAGER) $(SWITCHES) $(PROJECT_NAME) $(SOURCES)

clean:
	rm -f $(PROJECT_NAME).zip
