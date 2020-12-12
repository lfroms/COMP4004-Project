Feature: Term Creation
  As an administrator
  I want to create terms
  So that deadlines can be enforced

  Scenario: An administrator successfully creates a term
    Given I successfully log in as an administrator
    And I am on the term index
    When I click the "New term" button
    And I select start date "09-01-20" and end date "12-15-20"
    And I select registration deadline "09-01-20"
    And I select withdrawal deadline "10-01-20"
    And I enter per credit fee "1000.00"
    And I click the "Create" button
    Then there now exists a term with start date "September 1 2020" and end date "December 15 2020"

  Scenario: Start date and end date left blank
    Given I successfully log in as an administrator
    And I am on the term index
    When I click the "New term" button
    And I select registration deadline "09-01-20"
    And I select withdrawal deadline "10-01-20"
    And I enter per credit fee "1000.00"
    And I click the "Create" button
    Then I receive a message saying "You must select a start and end date"

  Scenario: Registration deadline left blank
    Given I successfully log in as an administrator
    And I am on the term index
    When I click the "New term" button
    And I select start date "09-01-20" and end date "12-15-20"
    And I select withdrawal deadline "10-01-2020"
    And I click the "Create" button
    Then I receive a message saying "You must select a registration deadline"

  Scenario: Withdrawal deadline left blank
    Given I successfully log in as an administrator
    And I am on the term index
    When I click the "New term" button
    And I select start date "09-01-2020" and end date "12-15-20"
    And I select registration deadline "09-01-2020"
    And I click the "Create" button
    Then I receive a message saying "You must select a withdrawal deadline"

  Scenario: Per credit fee is negative
    Given I successfully log in as an administrator
    And I am on the term index
    When I click the "New term" button
    And I select start date "09-01-2020" and end date "12-15-20"
    And I select registration deadline "09-01-2020"
    And I select withdrawal deadline "10-01-2020"
    And I enter per credit fee "-1"
    And I click the "Create" button
    Then there now exists a term with start date "September 1 2020" and end date "December 15 2020"

  Scenario: Registration is after end date
    Given I successfully log in as an administrator
    And I am on the term index
    When I click the "New term" button
    And I select start date "09-01-2020"
    And I select end date "12-15-20"
    And I select registration deadline "12-20-20"
    And I select withdrawal deadline "10-01-2020"
    And I enter per credit fee "1000.00"
    And I click the "Create" button
    Then I receive a message saying "Registration deadline must be before the end date of the term"

  Scenario: Withdrawal is after end date
    Given I successfully log in as an administrator
    And I am on the term index
    When I click the "New term" button
    And I select start date "09-01-2020"
    And I select end date "12-15-20"
    And I select registration deadline "09-01-2020"
    And I select withdrawal deadline "12-20-2020"
    And I enter per credit fee "1000.00"
    And I click the "Create" button
    Then I receive a message saying "Withdrawal deadline must be within the bounds of start date to end date of the term"

  Scenario: Withdrawal is before start date
    Given I successfully log in as an administrator
    And I am on the term index
    When I click the "New term" button
    And I select start date "09-01-2020"
    And I select end date "12-15-20"
    And I select registration deadline "09-01-2020"
    And I select withdrawal deadline "08-01-2020"
    And I enter per credit fee "1000.00"
    And I click the "Create" button
    Then I receive a message saying "Withdrawal deadline must be within the bounds of start date to end date of the term"
