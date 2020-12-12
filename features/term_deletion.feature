Feature: Term Deletion
  As an administrator
  I want to delete terms
  So that they no longer exist

  @TermDeleteSuccess
  Scenario: An administrator deletes a term
    Given I successfully log in as an administrator
    And there exists a term "Jan 2021 - May 2021"
    And I am on the term index
    When I click the delete button next to the term with name "Jan 2021 - May 2021"
    And I click the "Confirm" button
    Then the term with name "Jan 2021 - May 2021" no longer exists

  @TermDeleteCancel
  Scenario: An administrator cancels deletion of a term
    Given I successfully log in as an administrator
    And there exists a term "Jan 2021 - May 2021"
    And I am on the term index
    When I click the delete button next to the term with name "Jan 2021 - May 2021"
    And I click the "Cancel" button
    Then there still exists a term with name "Jan 2021 - May 2021"
