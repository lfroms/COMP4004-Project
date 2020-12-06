# frozen_string_literal: true
require 'test_helper'

class SubmissionTest < ActiveSupport::TestCase
  test 'submission can be created with valid arguments' do
    submission = Submission.new(
      user: users(:not_admin),
       deliverable: deliverables(:first_deliverable),
        attachment_url: 'http://example.com/doc.pdf'
    )

    assert submission.valid?
  end

  test 'submission cannot be created with url with invalid domain' do
    submission = Submission.new(
      user: users(:not_admin),
      deliverable: deliverables(:first_deliverable),
      attachment_url: 'http://example'
    )

    assert_not submission.valid?
  end

  test 'submission cannot be created with url with invalid protocol' do
    submission = Submission.new(
      user: users(:not_admin),
      deliverable: deliverables(:first_deliverable),
      attachment_url: 'http://http://example'
    )

    assert_not submission.valid?
  end

  test 'submission cannot be created with url with only protocol' do
    submission = Submission.new(
      user: users(:not_admin),
      deliverable: deliverables(:first_deliverable),
      attachment_url: 'http://'
    )

    assert_not submission.valid?
  end

  test 'submission cannot be created with missing deliverable' do
    submission = Submission.new(
      user: users(:not_admin),
      attachment_url: 'http://example.com/'
    )

    assert_not submission.valid?
  end

  test 'submission cannot be created with missing user' do
    submission = Submission.new(
      deliverable: deliverables(:first_deliverable),
      attachment_url: 'http://example.com/'
    )

    assert_not submission.valid?
  end

  test 'submission cannot be created with url with different protocol' do
    submission = Submission.new(
      user: users(:not_admin),
      deliverable: deliverables(:first_deliverable),
      attachment_url: 'ftp://example.com'
    )

    assert_not submission.valid?
  end

  test 'submission can be created with url with directory' do
    submission = Submission.new(
      user: users(:not_admin),
      deliverable: deliverables(:first_deliverable),
      attachment_url: 'http://example.com/directory'
    )

    assert submission.valid?
  end

  test 'submission can be created with https' do
    submission = Submission.new(
      user: users(:not_admin),
      deliverable: deliverables(:first_deliverable),
      attachment_url: 'https://example.com/directory'
    )

    assert submission.valid?
  end
end
