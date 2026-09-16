# Autoscrape SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module AutoscrapeFeatures
  def self.make_feature(name)
    case name
    when "base"
      AutoscrapeBaseFeature.new
    when "ratelimit"
      AutoscrapeRatelimitFeature.new
    when "retry"
      AutoscrapeRetryFeature.new
    when "test"
      AutoscrapeTestFeature.new
    when "timeout"
      AutoscrapeTimeoutFeature.new
    else
      AutoscrapeBaseFeature.new
    end
  end
end
