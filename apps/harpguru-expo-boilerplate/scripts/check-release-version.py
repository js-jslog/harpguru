#!/usr/bin/env python3
"""Decide whether the commit under inspection cuts a release.

Reads expo.version out of the app's app.json, compares it against the newest
v* tag in the repository, and reports the verdict on stdout and — when running
under GitHub Actions — on $GITHUB_OUTPUT as `release` and `version`.

Exit 0 means "carry on": either there is a release to cut (release=true) or
there is nothing to do (release=false). Exit 1 means the repository is in a
state no release should be built from, and the reason is printed.
"""

import json
import os
import re
import subprocess
import sys

# Both the config and the git history are located relative to this file, so
# the answer does not depend on where the script was invoked from.
APP_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir))
APP_JSON = os.path.join(APP_DIR, "app.json")

# Releases are tagged v<version>; expo.version carries the same number without
# the prefix. Two patterns rather than one so neither has to pretend to be the
# other, and so a tag that is not a release tag is simply not matched.
VERSION_PATTERN = re.compile(r"^(\d+)\.(\d+)\.(\d+)$")
TAG_PATTERN = re.compile(r"^v(\d+)\.(\d+)\.(\d+)$")


def fail(message):
    print("FAIL: %s" % message, file=sys.stderr)
    sys.exit(1)


def parse(version):
    """'17.0.0' -> (17, 0, 0), so versions compare as numbers not as strings."""
    match = VERSION_PATTERN.match(version)
    if not match:
        fail("expo.version %r is not a three-part numeric version" % version)
    return tuple(int(part) for part in match.groups())


def emit(**outputs):
    github_output = os.environ.get("GITHUB_OUTPUT")
    if not github_output:
        return
    with open(github_output, "a") as handle:
        for key, value in outputs.items():
            handle.write("%s=%s\n" % (key, value))


def main():
    expo = json.load(open(APP_JSON))["expo"]

    # The build counters are owned by EAS under appVersionSource: remote.
    # Their reappearance here means two sources of truth for the same numbers.
    for section, field in (("ios", "buildNumber"), ("android", "versionCode")):
        if field in expo.get(section, {}):
            fail(
                "app.json has reintroduced expo.%s.%s. That counter is owned by "
                "EAS (appVersionSource: remote) and must not be set here."
                % (section, field)
            )

    version = expo["version"]
    new = parse(version)

    try:
        tags = subprocess.run(
            ["git", "tag", "--list", "v*"],
            cwd=APP_DIR, capture_output=True, text=True, check=True,
        ).stdout.split()
    except (subprocess.CalledProcessError, OSError) as error:
        fail("could not read tags from git in %s: %s" % (APP_DIR, error))
    released = sorted(
        (tuple(int(p) for p in TAG_PATTERN.match(t).groups()) for t in tags
         if TAG_PATTERN.match(t)),
    )
    previous = released[-1] if released else (0, 0, 0)

    print("previous release: v%d.%d.%d" % previous)
    print("app.json version: v%d.%d.%d" % new)

    # Unchanged since the last release. A re-run of the workflow, or a
    # force-push that did not move the version, lands here — which is what
    # makes the release idempotent.
    if new == previous:
        print("v%s is already tagged. Nothing to release." % version)
        emit(release="false", version=version)
        return

    # Anything below the newest tag is a regression, including a version whose
    # own tag exists further back in history. Never quietly rebuild the past.
    if new < previous:
        fail(
            "expo.version %s is not greater than the latest tag v%d.%d.%d. "
            "Cut a release before merging to master." % ((version,) + previous)
        )

    print("Releasing v%s." % version)
    emit(release="true", version=version)


if __name__ == "__main__":
    main()
