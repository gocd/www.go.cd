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