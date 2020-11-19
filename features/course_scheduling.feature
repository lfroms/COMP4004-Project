Feature: Course Scheduling
  As an administrator
  I want to create courses offerings
  So that students can enroll in them

  Scenario: An administrator successfully creates a course offering
    Given that I am logged in as an administrator
    And I am viewing the course offering creation form for course with code "COMP4004"
    And there exists a term "Fall2020"
    And there does not exist a course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    When I enter section "A"
    And I select days "Friday"
    And I select time slot "1:00-4:00"
    And I select term "Fall2020"
    And I submit the form
    Then there exists a course offering for course with code "COMP4004" with section "A" days "Friday" time slot "1:00-4:00" and term "Fall2020"
    And I am viewing the details for course offering for course with code "COMP4004" with section "A" and term "Fall2020"

  Scenario: A field was left blank
    Given that I am logged in as an administrator
    And I am viewing the course offering creation form for course with code "COMP4004"
    And there exists a term "Fall2020"
    And there does not exist a course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    When I enter section "A"
    And I select time slot "1:00-4:00"
    And I select term "Fall2020"
    And I submit the form
    Then I receive an error message saying "days field cannot be blank"
    And there does not exist a course offering for course with code "COMP4004" with section "A" and term "Fall2020"

  Scenario: An administrator attemps to create a section that already exists
    Given that I am logged in as an administrator
    And I am viewing the course offering creation form for course with code "COMP4004"
    And there exists a term "Fall2020"
    And there exists a course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    When I enter section "A"
    And I select days "Friday"
    And I select time slot "1:00-4:00"
    And I select term "Fall2020"
    And I submit the form
    Then I receive an error message saying "A course offering for this term with this section name already exists"
    And there exists only one course offering for course with code "COMP4004" with section "A" and term "Fall2020"

  Scenario: An administrator attemps to create a course offering for a term that do not exist
    Given that I am logged in as an administrator
    And I am viewing the course creation form
    And there does not exist a term "Fall2020"
    And there does not exist a course offering for course with code "COMP4004" with section "A" and term "Fall2020"
    When I enter section "A"
    And I select days "Friday"
    And I select time slot "1:00-4:00"
    And I select term "Fall2020"
    And I submit the form
    Then I receive an error message saying "Term Fall2020 does not exist"
    And there does not exist a course offering for course with code "COMP4004" with section "A" and term "Fall2020"
