# Autoscrape SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module AutoscrapeFeatures
  def self.make_feature(name)
    case name
    when "base"
      AutoscrapeBaseFeature.new
    when "test"
      AutoscrapeTestFeature.new
    else
      AutoscrapeBaseFeature.new
    end
  end
end
