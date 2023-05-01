Feature: Login into the application

Scenario: The user is not logged in the site
  Given A not logged user
  When The user goes to the login, fills the data in the form and presses submit
  Then The user enters the map page