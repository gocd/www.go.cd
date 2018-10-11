# https://www.gocd.org - website

This repository hosts code for the website at [https://www.gocd.org](https://www.gocd.org).

change

## Build instructions

To setup a live server:

```
$ bundle install
$ bundle exec middleman serve
```

You can then access the page at http://localhost:4567

If you want to build the static site locally, do this:

```
$ bundle install
$ bundle exec rake
```

Then, the site will be available at build/ and can be served locally, if you choose.

## Contributing

We encourage you to contribute to GoCD. For information on contributing to this project, please see our
[contributor's guide](http://www.gocd.org/contribute).  A lot of useful information like links to user documentation,
design documentation, mailing lists etc. can be found in the [resources](https://www.gocd.org/resources/)
section.


## License

```plain
Copyright 2018 ThoughtWorks, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```
