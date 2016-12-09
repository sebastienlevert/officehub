# OfficeHub for Office 365

### Summary

This solution is a sample solution on how to integrate AngularJS and the Microsoft Graph. The mission of this sample is to give you simple guidance on the authentication pieces and how to call the Microsoft Graph from within a fully client-site application like the OfficeHub.

Because of the cloud nature of the Microsoft Graph, this solution will work in an Office 365 and Azure environment but the approach shown in this sample won't work in an on premises installation of Exchange or SharePoint.

Here is what you get with this sample:
- Automatic authentication with AngularJS and the Microsoft Graph
- Use of the Exchange API within the Microsoft Graph
- Use of the OneDrive API within the Microsoft Graph

This solution is implemented using:

- NodeJS : Task runner enabling pretty much every other dependencies
- Bower : A component manager targeting JavaScript and CSS libraries
- Yeoman : Used as its scaffolding engine
- gulp-angular : Base scaffolding generator
- Visual Studio Code : IDE used to develop and store project specific settings
- jQuery : Because jQuery (!)
- AngularJS 1.5 : Base SPA framework
- ADAL : Azure Active Directory Authentication Library javascript implementation
- angular-adal : Specific AngularJS implementation of ADAL
- Office UI Fabric : CSS framework easing the layout of the application (because I'm lazy) and components
- ngOfficeUiFabric : AngularJS set of directives allowing an easy integration of the Office UI Fabric in views

The entire solution is self-contained as a website that can be hosted on any platform you want. In this scenario, I chose to host my client-side application on a NodeJS web server on Microsoft Azure.

### Applies to
-  Office 365 Multi Tenant (MT)
-  Office 365 Dedicated (D)

### Documentation

A blog series will be used soon to explain how we did this solution in details. Here is the provided plan:

* [Part 1: AngularJS and the Microsoft Graph : Getting started with the OfficeHub](http://sebastienlevert.com/2016/06/18/introducing-the-officehub/)
* [Part 2: AngularJS and the Microsoft Graph : A journey to the cloud](#)
* [Part 3: AngularJS and the Microsoft Graph : Create your applicationn](#)
* [Part 4: AngularJS and the Microsoft Graph : Connect to the Graph](#)
* [Part 5: AngularJS and the Microsoft Graph : Consume the Graph](#)
* [Part 6: AngularJS and the Microsoft Graph : Make it look sexy](#)

### Spolution

### Set up your environment

Before starting, you'll need to install some prerequisites:

- Install Node.js on your machine https://nodejs.org/en/
- Clone the repository `git clone https://github.com/sebastienlevert/officehub.git`
- Install the gulp package `npm install gulp --global`
- Install the gulp package `npm install bower --global`
- Install the NodeJS package dependencies `npm install` 
- Install the Bower package dependencies `bower install` 
- Run the sample by running `gulp serve`

### Solution
Solution                | Author(s)
------------------------|----------
OfficeHub | Sébastien Levert

### Version history
Version  | Date | Comments
---------| -----| --------
1.0 | October 10, 2016 | Initial release

### Disclaimer

THIS CODE IS PROVIDED AS IS WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.