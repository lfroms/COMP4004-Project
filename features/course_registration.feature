Feature: Course Registration
  As a student
  I want to register in courses
  So that I can earn credit

  Scenario: A student successfully registers in a course with no prerequisites
    Given that I am logged in as a student with email "student@email.com"
    And I am viewing the list of offered courses for term "Fall2020"
    When I select course offering for course with code "COMP4004" with section "A"
    And I select the option to register
    Then student with email "student@email.com" is enrolled in course offering for course with code "COMP4004" with section "A"

  Scenario: A student successfully registers in a course with prerequisites
    Given that I am logged in as a student with email "student@email.com"
    And that student with email "student@email.com" has not completed course with code "COMP3004"
    And I am viewing the list of offered courses for term "Fall2020"
    When I select course offering for course with code "COMP4004" with section "A"
    And course with code "COMP4004" has prerequisite "COMP3004"
    And I select the option to register
    Then I receive an error message saying "You do not have the prerequisites for course COMP4004"
    And student with email "student@email.com" is not enrolled in course offering for course with code "COMP4004" with section "A"

  #TODO: add scenario for registering a course you're already registered in

