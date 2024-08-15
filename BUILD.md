# Building log4ngx

## Creating a release

Draft releases are created automatically via a Github workflow when a tag is pushed to the `main`
branch in [SemVer](https://semver.org/) format, with the tag's semver value being used as the
version number of the release.  Tags should consist of the major, minor and patch versions and must
be prefixed with "build#", e.g.

    build#1.0.0
    build#2.13.6

Such version numbers will, by default, create a 'standard' release.  Should you need to build a
'pre-release', the version tag should be suffixed with a hyphen and the appropriate build
descriptor, e.g.

    build#0.10.3-alpha
    build#2.3.0-beta12

> The release **must** be published manually from within Github as it is created as a _draft_,
allowing the release notes to be added, prior to publishing.

In creating the release, the "build#" prefix will be removed from the tag and the value used as the
version number. The workflow will update the `version` properties in the repo's _package.json_ files
for both the top-level project and the library, and then these updated files will be committed back
to the repo.  Because the original 'build#' tag is no longer on the commit that represents the
release, that tag will be deleted and a new tag matching the version number added to the new commit
to correctly identify it as the source of the release.

> This does mean that the release author (and anyone pulling the `main` branch after the build tag
has been added but before the release has been created) will end up with a redundant tag in their
local repo.  This can safely be ignored/deleted.
