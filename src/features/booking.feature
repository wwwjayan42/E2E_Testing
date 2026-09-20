Feature: Book a flight ticket
   @Regression 
  Scenario: Book a flight ticket
    Given I am on the ticket booking homepage
    When I select from "MAA" to "DEL" and dates "25" and "14"
    And I click done and search