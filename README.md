#About
This is an app that shows subscriber data about the Ticket requester in the sidebar of Zendesk. Please note that you'll need an active [AWeber account](https://www.aweber.com) to use this app.
If you are a current AWeber customer who wants to install this plugin, please [visit our Knowledge Base for more information](https://help.aweber.com/entries/21911321-How-Do-I-Integrate-Zendesk-with-AWeber-), and remember, we're always [here to help!](https://www.aweber.com/contact-us.htm)

#Development

##Dependencies
 - [Node.js](https://nodejs.org/en/) == 7.9.0
 - [Ruby](https://www.ruby-lang.org/) >= 2.3.x

##Installation
Install the [Zendesk Apps Tools (ZAT)](https://github.com/zendesk/zendesk_apps_tools). Then install the Node.js tools.

```
gem install zendesk_apps_tools
npm install webpack foreman karma-cli
```

##Running the app
The following command will run two processes one for the server `zat server --path=./dist` and the other to watch for changes `webpack --watch`.

```
nf start
```
Navigate to zendesk, login and append the query parameter of `zat=true`. (Make sure to enable the loading of unsafe scripts!)

#Structure
Here are a list of important files within the structure. For more information on the structure, please see the [Zendesk Scaffold App](https://github.com/zendesk/app_scaffold/).

| Filename                      | Description                                                   |
|:------------------------------|:--------------------------------------------------------------|
| settings.yml                  | Used for development purposes. Set the app_key parameter here.|
| dist/manifest.json            | Used for packaging and configuration for Zendesk              |
| src/javascripts/legacy_app.js | The main application                                          |
| templates                     | Handlebars.js templates for the app                           |
| src/stylesheets/common.scss   | CSS styles for the app                                        |

All Zendesk apps are written using JavaScript and Handlebars.js.  You can use the included makefile to generate a zip file suitable for upload to your Zendesk account.  Feel free to make modifications, and to send a pull request if others will find them useful.

#Copyright
Copyright (c) 2010-2017 AWeber Communications, Inc. See LICENSE for more detail.
