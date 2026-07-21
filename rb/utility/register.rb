# Autoscrape SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

AutoscrapeUtility.registrar = ->(u) {
  u.clean = AutoscrapeUtilities::Clean
  u.done = AutoscrapeUtilities::Done
  u.make_error = AutoscrapeUtilities::MakeError
  u.feature_add = AutoscrapeUtilities::FeatureAdd
  u.feature_hook = AutoscrapeUtilities::FeatureHook
  u.feature_init = AutoscrapeUtilities::FeatureInit
  u.fetcher = AutoscrapeUtilities::Fetcher
  u.make_fetch_def = AutoscrapeUtilities::MakeFetchDef
  u.make_context = AutoscrapeUtilities::MakeContext
  u.make_options = AutoscrapeUtilities::MakeOptions
  u.make_request = AutoscrapeUtilities::MakeRequest
  u.make_response = AutoscrapeUtilities::MakeResponse
  u.make_result = AutoscrapeUtilities::MakeResult
  u.make_point = AutoscrapeUtilities::MakePoint
  u.make_spec = AutoscrapeUtilities::MakeSpec
  u.make_url = AutoscrapeUtilities::MakeUrl
  u.param = AutoscrapeUtilities::Param
  u.prepare_auth = AutoscrapeUtilities::PrepareAuth
  u.prepare_body = AutoscrapeUtilities::PrepareBody
  u.prepare_headers = AutoscrapeUtilities::PrepareHeaders
  u.prepare_method = AutoscrapeUtilities::PrepareMethod
  u.prepare_params = AutoscrapeUtilities::PrepareParams
  u.prepare_path = AutoscrapeUtilities::PreparePath
  u.prepare_query = AutoscrapeUtilities::PrepareQuery
  u.result_basic = AutoscrapeUtilities::ResultBasic
  u.result_body = AutoscrapeUtilities::ResultBody
  u.result_headers = AutoscrapeUtilities::ResultHeaders
  u.transform_request = AutoscrapeUtilities::TransformRequest
  u.transform_response = AutoscrapeUtilities::TransformResponse
}
