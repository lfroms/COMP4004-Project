Feature: Deliverable Creation
  As a professor
  I want to create deliverables
  So that students can be evaluated

  Scenario: A professor successfully creates deliverables for a course
    Given that I am logged in as a professor with email "prof@email.com"
    And there exists a term "Fall2020"
    And there exists a course with code "COMP4004"
    And there exists a course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    And user with email "prof@email.com" is the professor for course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    And I am viewing the deliverable creation form for course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    When I enter title "final"
    And I enter description "final examination"
    And I enter due date "12-15-20"
    And I enter weight "100"
    And I submit the form
    Then there exists a deliverable with title "final" course offering for course with code "COMP4004" with section "A" and term "Fall2020"

  Scenario: A field was left blank
    Given that I am logged in as a professor with email "prof@email.com"
    And there exists a term "Fall2020"
    And there exists a course with code "COMP4004"
    And there exists a course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    And user with email "prof@email.com" is the professor for course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    And I am viewing the deliverable creation form for course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    When I enter title "final"
    And I enter description "final examination"
    And I enter due date "12-15-20"
    And I submit the form
    Then I receive an error message saying "weight field cannot be blank"
    Then there does not exist a deliverable with title "final" course offering for course with code "COMP4004" with section "A" and term "Fall2020"

  Scenario: A deliverable already exists
    Given that I am logged in as a professor with email "prof@email.com"
    And there exists a term "Fall2020"
    And there exists a course with code "COMP4004"
    And there exists a course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    Then there exists a deliverable with title "final" course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    And user with email "prof@email.com" is the professor for course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    And I am viewing the deliverable creation form for course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    When I enter title "final"
    And I enter description "final examination"
    And I enter due date "12-15-20"
    And I enter weight "100"
    And I submit the form
    Then I receive an error message saying "deliverable final already exists"
    Then there exists only one deliverable with title "final" course offering for course with code "COMP4004" with section "A" and term "Fall2020"

  #TODO: make sure deliverables add up to 100
