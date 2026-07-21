# Autoscrape SDK utility: make_context

from core.context import AutoscrapeContext


def make_context_util(ctxmap, basectx):
    return AutoscrapeContext(ctxmap, basectx)
