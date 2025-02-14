Feature: Course Registration
  As a student
  I want to register in courses
  So that I can earn credit

  @CourseRegSuccessNoPrereq
  Scenario: A student successfully registers in a course with no prerequisites
    Given I successfully log in as a user with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And the current term has per credit fee 1000 registration deadline later than today
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A" for the current term
    And I am viewing the list of offered courses for the current term
    When I click the enroll button next to course code "COMP 4004" section "A"
    And I click the "Confirm" button
    Then I receive a message saying "Enrolled"
    And student with email "student@email.com" now owes 1000 in fees

  @CourseRegSuccessPrereq
  Scenario: A student successfully registers in a course with prerequisites
    Given I successfully log in as a user with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And the current term has per credit fee 1000 registration deadline later than today
    And there exists a course with code "COMP 3004"
    And there exists a course with code "COMP 4004"
    And course with code "COMP 4004" has prerequisite "COMP 3004"
    And there exists a course offering for course with code "COMP 4004" section "A" for the current term
    And student with email "student@email.com" has passed course with code "COMP 3004"
    And I am viewing the list of offered courses for the current term
    When I click the enroll button next to course code "COMP 4004" section "A"
    And I click the "Confirm" button
    Then I receive a message saying "Enrolled"
    And student with email "student@email.com" now owes 1000 in fees

  @CourseRegMissingPrereq
  Scenario: A student attempts to register in a course with not-taken prerequisites
    Given I successfully log in as a user with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And the current term has per credit fee 1000 registration deadline later than today
    And there exists a course with code "COMP 3004"
    And there exists a course with code "COMP 4004"
    And course with code "COMP 4004" has prerequisite "COMP 3004"
    And there exists a course offering for course with code "COMP 4004" section "A" for the current term
    And I am viewing the list of offered courses for the current term
    When I click the enroll button next to course code "COMP 4004" section "A"
    And I click the "Confirm" button
    Then I receive a message saying "You do not have the required prerequisites."

  @CourseRegFailedPrereq
  Scenario: A student attempts to register in a course with failed prerequisites
    Given I successfully log in as a user with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And the current term has per credit fee 1000 registration deadline later than today
    And there exists a course with code "COMP 3004"
    And there exists a course with code "COMP 4004"
    And course with code "COMP 4004" has prerequisite "COMP 3004"
    And there exists a course offering for course with code "COMP 4004" section "A" for the current term
    And student with email "student@email.com" has failed course with code "COMP 3004"
    And I am viewing the list of offered courses for the current term
    When I click the enroll button next to course code "COMP 4004" section "A"
    And I click the "Confirm" button
    Then I receive a message saying "You do not have the required prerequisites."

  @CourseRegTooLate
  Scenario: Registration deadline has passed
    Given I successfully log in as a user with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And the current term has registration deadline earlier than today
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A" capacity 1 for the current term
    And I am viewing the list of offered courses for the current term
    Then there is no enroll button for course code "COMP 4004" section "A"

  @CourseRegFull
  Scenario: A course is already full
    Given I successfully log in as a user with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And the current term has per credit fee 1000 registration deadline later than today
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A" capacity 1 for the current term
    And a student is already enrolled in course offering with code "COMP 4004" section "A"
    And I am viewing the list of offered courses for the current term
    Then I receive a message saying "Full"

  @CourseRegDup
  Scenario: Student is already enrolled in course
    Given I successfully log in as a user with email "student@email.com"
    And student with email "student@email.com" is a self-enrolling user
    And the current term has per credit fee 1000 registration deadline later than today
    And there exists a course with code "COMP 4004"
    And there exists a course offering for course with code "COMP 4004" section "A" for the current term
    And student with email "student@email.com" is enrolled in course with code "COMP 4004" section "A"
    And I am viewing the list of offered courses for the current term
    Then I receive a message saying "Enrolled"



