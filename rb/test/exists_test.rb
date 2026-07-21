# Autoscrape SDK exists test

require "minitest/autorun"
require_relative "../Autoscrape_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = AutoscrapeSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
