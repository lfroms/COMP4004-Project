Feature: Deliverable Creation
  As a professor
  I want to create deliverables
  So that students can be evaluated

  Scenario: A professor successfully creates deliverables for a course
    Given I successfully log in as a professor with email "prof@email.com"
    And the current term is "Aug 2020 - Dec 2020"
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A"
    And user with email "prof@email.com" is the professor for course offering for course with code "COMP 4004" with section "A" and term "Aug 2020 - Dec 2020"
    And I am viewing the deliverable creation form for course offering for course with code "COMP 4004" with section "A" and term "Aug 2020 - Dec 2020"
    When I enter deliverable title "final"
    And I enter deliverable description "final examination"
    And I enter deliverable weight "0.25"
    And I enter deliverable due date "12-15-20"
    And I click the "Create" button
    Then there exists a deliverable with title "final" with the description "final examination"

  Scenario: A field was left blank
    Given I successfully log in as a professor with email "prof@email.com"
    And the current term is "Aug 2020 - Dec 2020"
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A"
    And user with email "prof@email.com" is the professor for course offering for course with code "COMP 4004" with section "A" and term "Aug 2020 - Dec 2020"
    And I am viewing the deliverable creation form for course offering for course with code "COMP 4004" with section "A" and term "Aug 2020 - Dec 2020"
    When I enter deliverable title "final"
    And I enter deliverable description "final examination"
    And I enter deliverable due date "12-15-20"
    And I click the "Create" button
    Then I receive a message saying "You must enter a weight"

#TODO: make sure deliverables add up to 100
