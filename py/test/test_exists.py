# ProjectName SDK exists test

import pytest
from autoscrape_sdk import AutoscrapeSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = AutoscrapeSDK.test(None, None)
        assert testsdk is not None
