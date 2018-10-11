import cd.go.contrib.plugins.configrepo.groovy.dsl.*

def buildStage = {
  new Stage("Build", {
    jobs {
      job("BuildWebsite") {
        elasticProfileId = 'k8s-gocd-dev-build'
        tasks {
          bash {
            commandString = "git merge origin/master"
          }

          bash {
            commandString = "bundle install --path .bundle --jobs 4"
          }

          bash {
            commandString = "bundle exec rake build"
          }
        }

        // we intentionally do not use 'publish' target because that has the possibility of leaking any environments from a PR.
        // so we instead just publish the build dir as an artifact and push it in the following stage
        artifacts {
          build {
            source = 'build'
          }
        }
      }
    }
  })
}

def pushPRToGHPages = { String repoFullName ->
  new Stage("PushPRToGHPages", {
    jobs {
      job("PushPRToGHPages") {
        elasticProfileId = 'k8s-gocd-dev-build'
        secureEnvironmentVariables = [
          SSH_KEY: 'AES:uLZVmhH+xkfhxuVbMwXsBg==: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'
        ]

        tasks {
          bash {
            commandString = 'mkdir -p ${HOME}/.ssh && echo "${SSH_KEY}" > ${HOME}/.ssh/id_rsa && chmod 700 ${HOME}/.ssh && chmod 600 ${HOME}/.ssh/id_rsa && ssh-keyscan github.com >> ${HOME}/.ssh/known_hosts'
          }

          exec {
            commandLine = ['git', 'clone', '--depth=1', "--branch=gh-pages", "git@github.com:${repoFullName}".toString(), "website"]
          }

          fetchDirectory {
            pipeline = 'www.gocd.org-PR'
            stage = 'Build'
            job = 'BuildWebsite'
            source = 'build'
            destination = 'pr-website'
          }

          bash {
            commandString = 'rm -rf website/pr-${GO_SCM_WWW_GO_CD_PR_ID} && mv pr-website/build website/pr-${GO_SCM_WWW_GO_CD_PR_ID} && cd website && git add -A . && git commit -m "Update website to ${GO_SCM_WWW_GO_CD_LABEL}" && git push'
          }
        }
      }
    }
  })
}

GoCD.script { GoCD buildScript ->
  pipelines {
    pipeline("www.gocd.org-PR") {
      group = 'gocd-website'
      materials {
        pluggable {
          scm = 'a47f0660-78c4-4141-8da4-5b8c5c54ada5'
        }
      }
      trackingTool {
        link = 'https://github.com/ketan/www.go.cd/issues/${ID}'
        regex = ~/##(\\d+)/
      }
      stages {
        add(buildStage())
        add(pushPRToGHPages('gocd/pr-review.gocd.org'))
      }
    }
  }
}
