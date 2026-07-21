package core

type AutoscrapeError struct {
	IsAutoscrapeError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewAutoscrapeError(code string, msg string, ctx *Context) *AutoscrapeError {
	return &AutoscrapeError{
		IsAutoscrapeError: true,
		Sdk:              "Autoscrape",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *AutoscrapeError) Error() string {
	return e.Msg
}
