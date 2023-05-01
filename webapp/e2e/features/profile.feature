Feature: See profile

Scenario: The user wants to see the profile
  Given A not logged user
  When The user logs opens the profile
  Then The user sees his profile