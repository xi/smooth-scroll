# Do not use this!

Smooth scrolling is an important UI pattern. There are countless solutions for
this, but I found that all of them lack some features.

The code in this repository is not meant to be used on its own. I intend to
improve existing solutions instead. This is just my personal scratchpad.

# Features

| | this | [GabrielDelepine](https://github.com/GabrielDelepine/smooth-scroll) | [firstandthird](https://github.com/firstandthird/smooth-scroller) | [cferdinandi](https://github.com/cferdinandi/smooth-scroll) | [narikei](https://github.com/narikei/SmoothScrolling) | [bloodyowl](https://github.com/bloodyowl/scroll) | [iamdustan](https://github.com/iamdustan/smoothscroll) | [kswedberg](https://github.com/kswedberg/jquery-smooth-scroll) | [mathiasbynens](https://github.com/mathiasbynens/jquery-smooth-scrolling) |
| ---                                                 | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| no dependencies                                     | yes | yes | yes | yes | yes |  ~  | yes | jquery | jquery |
| packaging                                           | umd | auto exec | es6 | umd | global | es6 | umd | umd | global |
| file size                                           | 3k  | 3k  | 2k  | 18k | 2k  | 1k  | 9k  | 10k | 2k  |
| can be used from javascript                         | yes | no  |  ~  | yes | yes | yes | yes | yes | yes |
| works on jump-links with minimal config (0-5 lines) | yes | yes | yes | yes | no  | no  |  ?  | yes | yes |
| fixed header support                                | yes |  ~  | no  | yes | no  |  ~  |  ?  |  ~  | no  |
| keeps history intact                                | yes | yes | no  | no  | no  |  ~  |  ?  | no  | yes |
| uses requestAnimationFrame                          | yes | no  | yes | no  | no  | yes | yes |  ~  |  ~  |
| horizontal scrolling support                        | yes | no  | no  | no  | yes | yes |  ?  | yes | no  |
| implements [standard](https://drafts.csswg.org/cssom-view/#scrolling) | no | no | no | no | no | no | yes | no | no |
| project is active                                   |  ~  |  ~  | yes | yes | no  | no  | yes | yes | no  |
| supports containers other than full page            | no  | no  | no  | no  | no  | no  |  ?  | yes | no  |
| change direction mid-scroll                         |  ?  |  ?  |  ?  |  ?  |  ?  |  ?  |  ?  |  ?  |  ?  |

# Usage

## init(options)

Register click handlers for all elements matching `options.selector`.
Options are:

-   `selector` (string) - defaults to `[href^="#"]`
-   `headerSelector` (string) - defaults to `[data-scroll-header]`
-   `duration` (number) - defaults to 400
-   `easing` (function) - defaults to `cubicInOut()`

If the file is included directly (i.e. not via commonjs or amd module systems)
this function is **called automatically**.

## smoothScrollToSelector(selector, options)

Scroll to the first element matching `selector`.

## smoothScrollTo(endX, endY, options)

Low-level function that scrolls to the given position. The header is ignored.

## animate(apply, duration)

Low-level function that calls `apply(progress)` on each animation frame.
`progress` is a number between 0 and 1.
