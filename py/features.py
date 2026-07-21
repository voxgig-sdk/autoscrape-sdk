# Autoscrape SDK feature factory

from feature.base_feature import AutoscrapeBaseFeature
from feature.test_feature import AutoscrapeTestFeature


def _make_feature(name):
    features = {
        "base": lambda: AutoscrapeBaseFeature(),
        "test": lambda: AutoscrapeTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
