Feature: See friends management

Scenario: The user wants to see the friends management tab
  Given A not logged user
  When The user logs opens the friends management tab
  Then The user sees the friends management view