# www.go.cd

This repository hosts code for the website at [gocd.github.io](http://gocd.github.io) which resolves to [www.go.cd](http://www.go.cd). The URL  [go.cd](http://www.go.cd) redirects to  [www.go.cd](http://www.go.cd). We're using [Jekyll](http://jekyllrb.com/) to generate website.

## Installation
    gem install jekyll
    

_More help on installation visit [http://jekyllrb.com/docs/installation/](http://jekyllrb.com/docs/installation/)_

_For Windows, you have to set `pygments` to `false` in the `_config.yml` file_
  
## Launching website locally
    jekyll serve --watch 
    
_Local website can be accessed at http://localhost:4000_

## Configuration
`_config.yml` takes care of general configuration and navigation part.

### Navigation Structure 
```
root: 'Root Text'
├── url: 'Root Link'
├── icon: 'icon class name'
├── first-level:
    ├── - text: 'First Level Text1'
      ├── url: 'First Level Link1'
      ├── second-level:
        ├── - text: 'Second Level Text1'
        ├──   url: 'Second Level Link1'
        
```

_Note: when editing `_config.yml`, you need to restart jekyll to see the changes.__
## Contributing

We encourage you to contribute to Go. For information on contributing to this project, please see our [contributor's guide](http://www.go.cd/contribute).
A lot of useful information like links to user documentation, design documentation, mailing lists etc. can be found in the [resources](http://www.go.cd/community/resources.html) section.

## License

```plain
Copyright 2015 ThoughtWorks, Inc.

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
