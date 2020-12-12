Feature: Professor Assignment
  As an administrator
  I want to assign professors to course offerings
  So that they create and submit deliverables

  Scenario: An administrator assigns a professor to an offering
    Given I successfully log in as an administrator
    And there exists a user with email "myemail@email.com" name "John Smith"
    And there exists a course with code "COMP 4004"
    And the current term is "Jan 2021 - Apr 2021"
    And there exists a course offering for course with code "COMP 4004" section "A" for the current term
    When I visit the show page for for course with code "COMP 4004" section "A" for the current term
    And I click the "Assign prof" button
    And I select the user with name "John Smith"
    And I click the "Assign" button
    Then the professor for the course offering has name "John Smith"
