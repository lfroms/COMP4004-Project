Feature: Term Creation
  As an administrator
  I want to create terms
  So that deadlines can be enforced

  Scenario: An administrator successfully creates a term
    Given I successfully log in as an administrator
    And I am on the term index
    When I click the "New term" button
    And I select start date "September 1 2020" and end date "December 15 2020"
    And I select registration deadline "September 1 2020"
    And I select withdrawal deadline "October 1 2020"
    And I enter per credit fee 1000.00
    And I click the "Create" button
    Then there now exists a term with start date "September 1 2020" and end date "December 15 2020"

  Scenario: Start date and end date left blank
    Given I successfully log in as an administrator
    And I am on the term index
    When I click the "New term" button
    And I select registration deadline "September 1 2020"
    And I select withdrawal deadline "October 1 2020"
    And I enter per credit fee 1000.00
    And I click the "Create" button
    Then I receive a message saying "Start and End date cannot be blank"

  Scenario: Registration deadline left blank
    Given I successfully log in as an administrator
    And I am on the term index
    When I click the "New term" button
    And I select start date "September 1 2020" and end date "December 15 2020"
    And I select withdrawal deadline "October 1 2020"
    And I click the "Create" button
    Then I receive a message saying "Registration deadline cannot be blank"

  Scenario: Withdrawal deadline left blank
    Given I successfully log in as an administrator
    And I am on the term index
    When I click the "New term" button
    And I select start date "September 1 2020" and end date "December 15 2020"
    And I select registration deadline "September 1 2020"
    And I click the "Create" button
    Then I receive a message saying "Withdrawal deadline cannot be blank"

  Scenario: Per credit fee is negative
    Given I successfully log in as an administrator
    And I am on the term index
    When I click the "New term" button
    And I select start date "September 1 2020" and end date "December 15 2020"
    And I select registration deadline "September 1 2020"
    And I select withdrawal deadline "October 1 2020"
    And I enter per credit fee -1
    And I click the "Create" button
    Then I receive a message saying "Per credit fee must be positive"

  Scenario: Registration is after end date
    Given I successfully log in as an administrator
    And I am on the term index
    When I click the "New term" button
    And I select start date "September 1 2020"
    And I select end date "December 15 2020"
    And I select registration deadline "December 20 2020"
    And I select withdrawal deadline "October 1 2020"
    And I click the "Create" button
    Then I receive a message saying "Registration deadline must be before end date"

  Scenario: Withdrawal is after end date
    Given I successfully log in as an administrator
    And I am on the term index
    When I click the "New term" button
    And I select start date "September 1 2020"
    And I select end date "December 15 2020"
    And I select registration deadline "September 1 2020"
    And I select withdrawal deadline "December 20 2020"
    And I click the "Create" button
    Then I receive a message saying "Withdrawal deadline must be before end date"

  Scenario: Registration is before start date
    Given I successfully log in as an administrator
    And I am on the term index
    When I click the "New term" button
    And I select start date "September 1 2020"
    And I select end date "December 15 2020"
    And I select registration deadline "August 1 2020"
    And I select withdrawal deadline "October 1 2020"
    And I click the "Create" button
    Then I receive a message saying "Registration deadline must be after start date"

    Scenario: Withdrawal is before start date
    Given I successfully log in as an administrator
    And I am on the term index
    When I click the "New term" button
    And I select start date "September 1 2020"
    And I select end date "December 15 2020"
    And I select registration deadline "September 1 2020"
    And I select withdrawal deadline "August 1 2020"
    And I click the "Create" button
    Then I receive a message saying "Withdrawal deadline must be after start date"
