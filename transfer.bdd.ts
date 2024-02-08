 Feature: Transfer funds
  As a bank customer
  I want to transfer funds from my account to another account
  So that I can make payments to others

  Scenario: Successful fund transfer
    Given I am logged in to my banking account
    And I have sufficient balance in my account

    When I initiate a transfer of $100 to account number 123456

    Then the transfer should be successful
    And the balance in my account should be updated accordingly
